import {
  PLAY_SONG,
  SET_CURRENT_ALBUM_TRACKS,
  SET_CURRENT_ALBUM_INFO,
} from '../constants/streamConstants';
import { PlayerActionTypes } from '../types/player';

const initialState = {
  currentSong: { song: '', context: '', index: 0 },
  albumTracks: [],
  albumInfo: {},
};

const streamReducer = (state = initialState, action: PlayerActionTypes) => {
  switch (action.type) {
    case PLAY_SONG:
      return {
        ...state,
        currentSong: action.payload,
      };
    case SET_CURRENT_ALBUM_INFO:
      return {
        ...state,
        albumInfo: action.payload,
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
