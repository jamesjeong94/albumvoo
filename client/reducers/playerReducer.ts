import { DEQUEUE_SONG, CURRENT_ELAPSED_TIME } from '../constants/playerConstants';
import { PlayerActionTypes } from '../types/player';

const initialState = null;

const playerReducer = (state: any = initialState, action: PlayerActionTypes): any => {
  switch (action.type) {
    case DEQUEUE_SONG:
      state.queue.shift();
      return {
        ...state,
      };
    case CURRENT_ELAPSED_TIME:
      return {
        elapsedTime: action.payload,
      };
    default:
      return state;
  }
};

export = playerReducer;
