import { PLAY_SONG, ADD_SONG_TO_QUEUE, DEQUEUE_SONG } from '../constants/playerConstants';
import { PlayerActionTypes, PlayerState } from '../types/player';

const initialState = {
  song: '',
  queue: [],
};

const playerReducer = (state = initialState, action: PlayerActionTypes): any => {
  switch (action.type) {
    case PLAY_SONG:
      return {
        ...state,
        currentSong: action.payload,
      };
    case ADD_SONG_TO_QUEUE:
      let newQueue = [...state.queue, action.payload];
      return {
        ...state,
        queue: newQueue,
      };
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
