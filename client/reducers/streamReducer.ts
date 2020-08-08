import { PLAY_SONG, ADD_SONG_TO_QUEUE } from '../constants/streamConstants';
import { PlayerActionTypes } from '../types/player';

const initialState = {
  song: '',
  queue: [],
};

const streamReducer = (state = initialState, action: PlayerActionTypes) => {
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
    default:
      return state;
  }
};

export = streamReducer;
