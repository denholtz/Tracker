import React from 'react';

import ControlPanel from './ControlPanel';
import PositiveTrack from './PositiveTrack.js';
import CrashedTracked from './CrashedTrack';
import { v4 as uuidv4 } from 'uuid';
import io from 'socket.io-client';

const DEFAULT_GAMESTATE = {
  pieces: [],
  round: 1
}

class Container extends React.Component {
    state = {
        name: '',
        color: '#000000',
        gameState: DEFAULT_GAMESTATE
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
            name: this.state.name,
            wp: 5,
            motes: 0,
            notes: ''
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

    updatePiece = (changedPieceID, attribute, value) => {
      let newPieces = [...this.state.gameState.pieces];
      newPieces.forEach((piece, i) => {
        if (piece.id === changedPieceID) {
            piece[attribute] = value;
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
                <div id='control-panel'>
                    <ControlPanel
                        name={this.state.name}
                        color={this.state.color}
                        handleChange={this.handleChange}
                        updatePiece={this.updatePiece}
                        clearGameState={this.clearGameState}
                        deletePiece={this.deletePiece}
                        round={this.state.gameState.round}
                        topOfTheRound={this.topOfTheRound}
                        decrementRound={this.decrementRound}
                        gameState={this.state.gameState}
                        handleNotesChange={this.handleNotesChange}
                    />
                </div>



                <div id='positive-track'>
                    <PositiveTrack
                        addPiece={this.addPiece}
                        gameState={this.state.gameState}
                        movePiece={this.movePiece}
                    />
                </div>

                <div id='crashed-track'>
                    <CrashedTracked
                        addPiece={this.addPiece}
                        gameState={this.state.gameState}
                        movePiece={this.movePiece}
                    />
                </div>

            </React.Fragment>
        )
    }
}

export default Container;
