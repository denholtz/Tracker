import { SET_GAME_STATE, SET_NAME, SET_COLOR, SET_NUMBER_SELECT_MODAL_TARGET } from "./actionTypes";

export const DEFAULT_GAMESTATE = {
  pieces: [],
  round: 1
}

export const DEFAULT_STATE = {
    name: '',
    color: '#000000',
    gameState: DEFAULT_GAMESTATE,
    initialLoadComplete: false,
    dragTargetState: {
      top: 0,
      left: 0,
      display: 'none',
      value: 0
    },
    numberSelectModalTarget: null // {pieceID, attribute} when set
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

    case SET_NAME: {
      const name = action.name;
      return {
        ...state,
        name: name
      };
    }

    case SET_COLOR: {
      const color = action.color;
      return {
        ...state,
        color: color
      };
    }

    case SET_NUMBER_SELECT_MODAL_TARGET: {
      const target = action.target;
      return {...state, numberSelectModalTarget: target}
    }

    default: {
      return DEFAULT_STATE
    }
  }
}
