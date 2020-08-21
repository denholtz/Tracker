import { SET_GAME_STATE, SET_NAME, SET_COLOR } from "./actionTypes";
import { DEFAULT_GAMESTATE } from "./reducer"
import io from 'socket.io-client';
import store from './store';
import { v4 as uuidv4 } from 'uuid';

let socketServer = window.location.origin === 'http://localhost:3000' ?
                   'http://localhost:3001' :
                   window.location.origin;
let socket = io(socketServer);
socket.on('update', gameState => {
    store.dispatch(setGameState(gameState));
});

export const setName = (name) => ({
  type: SET_NAME,
  name: name
})
export const setColor = (color) => ({
  type: SET_COLOR,
  color: color
})

export const deletePiece = (pieceToDelete) => {
  return (dispatch, getState) => {
    if (!getState().initialLoadComplete) {
      return;
    }
    const gameState = getState().gameState;

    // Compute new newGameState
    let newPieces = gameState.pieces.filter((p) => p.id !== pieceToDelete.id)
    const newGameState = {
        ...gameState,
        pieces: newPieces
    };

    // Send gameState to server
    socket.emit('update', newGameState);

    // Update the local store
    dispatch(setGameState(newGameState));
  }
}

export const addPiece = (piece) => {
  return (dispatch, getState) => {
    if (!getState().initialLoadComplete) {
      return;
    }

    const gameState = getState().gameState;

    // Compute new newGameState
    console.log('[Actions] Adding new piece');
    let newPiece = {
        ...piece,
        id: uuidv4(),
    };

    const newGameState = {
        ...gameState,
        pieces: [newPiece, ...gameState.pieces]
    };

    // Send gameState to server
    socket.emit('update', newGameState);

    // Update the local store
    dispatch(setGameState(newGameState));
  }
}

export const updatePiece = (pieceID, attribute, newValue) => {
  return (dispatch, getState) => {
    if (!getState().initialLoadComplete) {
      return;
    }

    const gameState = getState().gameState;

    // Compute new newGameState
    console.log('[Actions] Updating piece with parameters');
    console.log(pieceID, attribute, newValue);
    let newPieces = gameState.pieces.map((oldPiece, i) => {
        if (oldPiece.id === pieceID) {
          let newPiece = { ...oldPiece };
          newPiece[attribute] = newValue;

          if (attribute === 'initiative') {
            console.log(`Moved piece from ${oldPiece.initiative} to ${newPiece.initiative} `)
            if (oldPiece.initiative <= 0 && newPiece.initiative > 0) {
              console.log(`Piece ${newPiece.name} has recovered from crash`)
              newPiece.mostRecentCrashRecovery = gameState.round;
            } else if (oldPiece.initiative > 0 && newPiece.initiative <= 0) {
              console.log(`Piece ${newPiece.name} gets crashed`)
              newPiece.mostRecentCrash = gameState.round;
              newPiece.hadActedAtCrash = newPiece.acted;
            }
          }
          return newPiece;
        } else {
          return oldPiece;
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

export const newRound = () => {
  return (dispatch, getState) => {
    const state = getState();
    let newPieces = state.gameState.pieces.map((piece) => {
      return {
        ...piece,
        acted: false
      }
    });
    let newGameState = {
        ...state.gameState,
        pieces: newPieces,
        round: state.gameState.round + 1,
    };
    socket.emit('update', newGameState);
    dispatch(setGameState(newGameState));
  }
};

export const prevRound = () => {
  return (dispatch, getState) => {
    const state = getState();
    let newGameState = {
        ...state.gameState,
        round: Math.max(1, state.gameState.round - 1),
    };
    socket.emit('update', newGameState);
    dispatch(setGameState(newGameState));
  }
}

export const clearGameState = () => {
  return (dispatch, getState) => {
    let newGameState = DEFAULT_GAMESTATE;
    socket.emit('update', newGameState);
    dispatch(setGameState(newGameState));
  }
}
