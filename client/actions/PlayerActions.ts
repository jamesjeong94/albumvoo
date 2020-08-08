import { PLAY_SONG, ADD_SONG_TO_QUEUE, DEQUEUE_SONG } from '../constants/playerConstants';
import {
  PlayerActionTypes,
  Song,
  QueueSongAction,
  DequeueSongAction,
} from '../types/player';

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

export const dequeueSong = (): PlayerActionTypes => {
  return {
    type: DEQUEUE_SONG,
    payload: null,
  };
};
