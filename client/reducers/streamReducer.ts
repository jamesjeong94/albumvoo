import { PLAY_SONG, SET_CURRENT_ALBUM_TRACKS } from '../constants/streamConstants';
import { PlayerActionTypes } from '../types/player';

const initialState = {
  currentSong: { song: '', context: '', index: 0 },
  albumTracks: [],
};

const streamReducer = (state = initialState, action: PlayerActionTypes) => {
  switch (action.type) {
    case PLAY_SONG:
      return {
        ...state,
        currentSong: action.payload,
      };
    case SET_CURRENT_ALBUM_TRACKS:
      return {
        ...state,
        albumTracks: action.payload,
      };
    default:
      return state;
  }
};

export = streamReducer;
