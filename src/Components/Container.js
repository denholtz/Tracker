import React from 'react';

import ControlPanel from './ControlPanel';
import PositiveTrack from './PositiveTrack.js';
import CrashedTracked from './CrashedTrack';
import { v4 as uuidv4 } from 'uuid';
import io from 'socket.io-client';

class Container extends React.Component {
    state = {
        name: '',
        color: '#000000',
        gameState: {
            pieces: [],
            round: 1
        }
    }

    componentDidMount = () => {
        // fetch initial game state
        let socketServer = window.location.origin === 'http://localhost:3000' ?
                           'http://localhost:3001' :
                           window.location.origin;
        let socket = io(socketServer);
        socket.on('update', gameState => {
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
        // emit state.gameState
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
                gameState: {
                    pieces: []
                }
            }

            this.setStateAndEmit(nextState);
        }
    }

    topOfTheRound = () => {
        this.setStateAndEmit({
          ...this.state,
          gameState: {
            ...this.state.gameState,
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

    render = (props) => {
        return (
            <React.Fragment>
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
