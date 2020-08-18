import React from 'react';

import ControlPanel from './ControlPanel';
import Track from './Track';
import DragTarget from './DragTarget';
import { v4 as uuidv4 } from 'uuid';
import io from 'socket.io-client';

const DEFAULT_GAMESTATE = {
  pieces: [],
  round: 1
}

let dragTargetRef = React.createRef();
const mapStateToProps = (state, ownProps) => ({

});

const mapDispatchToProps = ({

});

class Container extends React.Component {
    state = {
        name: '',
        color: '#000000',
        gameState: DEFAULT_GAMESTATE,
        dragTargetState: {
            top: 0,
            left: 0,
            display: 'none',
            value: 0
        }
    }

    componentDidMount = () => {
        // fetch initial game state
        let socketServer = window.location.origin === 'http://localhost:3000' ?
                           'http://localhost:3001' :
                           window.location.origin;
        let socket = io(socketServer);
        socket.on('update', gameState => {
            console.log('Got new state from server');
            console.log(gameState)
            this.setState({...this.state, gameState});
        })
        this.setState({...this.state, socket})
    }

    handleDragTargetUpdate = (e, value) => {
        console.log('update');
        this.setState({...this.state, dragTargetState: {
            top: e.pageY,
            left: e.pageX,
            display: 'block',
            value
        }})
    }

    handleDragTargetHide = () => {
        console.log('hide')
        this.setState({...this.state, dragTargetState: {...this.state.dragTargetState, display: 'none'}});
    }

    handleChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    setStateAndEmit = (state) => {
        this.setState(state);
        this.state.socket.emit('update', state.gameState);
    }

    addPiece = (piece) => {
        if(!this.state.name || !this.state.color) return;
        let newPiece = {
            ...piece,
            id: uuidv4(),
            color: this.state.color,
            name: this.state.name
        };

        let nextState = {
            ...this.state,
            gameState: {
                ...this.state.gameState,
                pieces: [
                    ...this.state.gameState.pieces,
                    newPiece
                ]
            }
        }
        this.setStateAndEmit(nextState);
    }

    movePiece = (piece) => {
        let pieces = [...this.state.gameState.pieces];

        pieces.forEach((e, i) => {
            if(e.id === piece.id){
                console.log(`Moved piece from ${e.initiative} to ${piece.initiative} `)
                if (e.initiative <= 0 && piece.initiative > 0) {
                    console.log(`Piece ${e.name} has recovered from crash`)
                    piece.mostRecentCrashRecovery = this.state.gameState.round;
                }
                if (e.initiative > 0 && piece.initiative <= 0) {
                    console.log(`Piece ${e.name} gets crashed`)
                    piece.mostRecentCrash = this.state.gameState.round;
                    piece.hadActedAtCrash = piece.acted;
                }
                pieces[i] = piece;
            }
        })

        let nextState = {
            ...this.state,
            gameState: {
                ...this.state.gameState,
                pieces
            }
        }

        this.setStateAndEmit(nextState);
    }

    deletePiece = (piece) => {
        let pieces = this.state.gameState.pieces.filter(e => e.id !== piece.id);

        let nextState = {
            ...this.state,
            gameState: {
                ...this.state.gameState,
                pieces
            }
        }

        this.setStateAndEmit(nextState);
    }

    clearGameState = () => {
        if(window.confirm('Really clear the game state? There\'s no going back.')){
            let nextState = {
                ...this.state,
                gameState: DEFAULT_GAMESTATE
            }

            this.setStateAndEmit(nextState);
        }
    }

    topOfTheRound = () => {
        let newPieces = this.state.gameState.pieces.map((piece) => {
            return {
               ...piece,
               acted: false
            }
        })
        this.setStateAndEmit({
          ...this.state,
          gameState: {
            ...this.state.gameState,
            pieces: newPieces,
            round: this.state.gameState.round + 1
          }

        });
    }

    decrementRound = () => {
        if (this.state.gameState.round <= 1) {
            return;
        }
        this.setStateAndEmit({
            ...this.state,
            gameState: {
              ...this.state.gameState,
              round: this.state.gameState.round - 1
            }
        });
    }
    // handleChange = (e) => {
    //     this.setState({
    //         ...this.state,
    //         [e.target.name]: e.target.value
    //     })
    // }
    handleNotesChange = (e) => {
        let newNote = e.target.value;
        let changedPieceID = e.target.name.split('$')[0];
        let newPieces = [...this.state.gameState.pieces];
        newPieces.forEach((piece, i) => {
          if (piece.id === changedPieceID) {
              piece.notes = newNote;
          }
        });

        this.setStateAndEmit({
            ...this.state,
            gameState: {
                ...this.state.gameState,
                pieces: newPieces
            }
        })
    }

    render = (props) => {
        return (
            <React.Fragment>
                <DragTarget dragTargetState={this.state.dragTargetState}/>
                <div id='control-panel'>
                    <ControlPanel
                        name={this.state.name}
                        color={this.state.color}
                        handleChange={this.handleChange}
                        clearGameState={this.clearGameState}
                        deletePiece={this.deletePiece}
                        round={this.state.gameState.round}
                        topOfTheRound={this.topOfTheRound}
                        decrementRound={this.decrementRound}
                        gameState={this.state.gameState}
                        handleNotesChange={this.handleNotesChange}
                    />
                </div>

                <Track 
                    start={30} 
                    end={1} 
                    innerProps={{gridContainerClassName: 'positive-track'}}
                    addPiece={this.addPiece}
                    gameState={this.state.gameState}
                    movePiece={this.movePiece}
                    dragTargetRef={dragTargetRef}
                    handleDragTargetUpdate={this.handleDragTargetUpdate}
                    handleDragTargetHide={this.handleDragTargetHide}
                />

                <Track
                    start={0}
                    end={-20}
                    innerProps={{gridContainerClassName: 'positive-track'}}
                    addPiece={this.addPiece}
                    gameState={this.state.gameState}
                    movePiece={this.movePiece}
                    dragTargetRef={dragTargetRef}
                    handleDragTargetUpdate={this.handleDragTargetUpdate}
                    handleDragTargetHide={this.handleDragTargetHide}
                />
            </React.Fragment>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToprops)(Container);