import { DEQUEUE_SONG } from '../constants/playerConstants';
import { PlayerActionTypes } from '../types/player';

const initialState = null;

const playerReducer = (state: any = initialState, action: PlayerActionTypes): any => {
  switch (action.type) {
    case DEQUEUE_SONG:
      state.queue.shift();
      return {
        ...state,
      };
    default:
      return state;
  }
};

export = playerReducer;
