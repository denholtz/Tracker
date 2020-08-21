import { SET_STATE_FROM_SERVER, SET_GAME_STATE } from "./actionTypes";

const DEFAULT_GAMESTATE = {
  pieces: [],
  round: 1
}

export default function(state, action) {
  switch (action.type) {
    case SET_GAME_STATE: {
      const gameState = action.gameState;
      return {
        ...state,
        initialLoadComplete: true,
        gameState
      };
    }

    default:
      return {
          name: '',
          color: '#000000',
          gameState: DEFAULT_GAMESTATE,
          initialLoadComplete: false,
          dragTargetState: {
              top: 0,
              left: 0,
              display: 'none',
              value: 0
          }
      }
  }
}
