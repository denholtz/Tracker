import { SET_GAME_STATE, SET_STATE_FROM_SERVER } from "./actionTypes";
import io from 'socket.io-client';
import store from './store';

let socketServer = window.location.origin === 'http://localhost:3000' ?
                   'http://localhost:3001' :
                   window.location.origin;
let socket = io(socketServer);
socket.on('update', gameState => {
    console.log('[Actions] Got new state from server');
    console.log(gameState)
    store.dispatch(setGameState(gameState));
})

export const updatePiece = (pieceID, attribute, newValue) => {
  return (dispatch, getState) => {
    if (!getState().initialLoadComplete) {
      return;
    }

    const gameState = getState().gameState;

    // Compute new newGameState
    console.log('[Actions] Updating piece with parameters');
    console.log(pieceID, attribute, newValue);
    let newPieces = gameState.pieces.map((piece, i) => {
        if (piece.id === pieceID) {
          let newPiece = { ...piece };
          newPiece[attribute] = newValue;
          return newPiece;
        } else {
          return piece;
        }
    });
    const newGameState = {
        ...gameState,
        pieces: newPieces
    };

    // Send gameState to server
    socket.emit('update', newGameState);

    // Update the local store
    dispatch(setGameState(newGameState));
  };
}

export const setGameState = (gameState) => ({
    type: SET_GAME_STATE,
    gameState
})
