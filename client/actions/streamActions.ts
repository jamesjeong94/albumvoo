import { PLAY_SONG, ADD_SONG_TO_QUEUE } from '../constants/streamConstants';
import { PlayerActionTypes, Song } from '../types/player';

export const playSong = (song: Song): PlayerActionTypes => {
  return {
    type: PLAY_SONG,
    payload: song,
  };
};

export const queueSong = (song: Song): PlayerActionTypes => {
  return {
    type: ADD_SONG_TO_QUEUE,
    payload: song,
  };
};
