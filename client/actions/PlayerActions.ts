import { DEQUEUE_SONG, CURRENT_ELAPSED_TIME } from '../constants/playerConstants';
import { PlayerActionTypes } from '../types/player';

export const dequeueSong = (): PlayerActionTypes => {
  return {
    type: DEQUEUE_SONG,
    payload: null,
  };
};

export const setCurrentElapsed = (elapsedTime: number) => {
  return {
    type: CURRENT_ELAPSED_TIME,
    payload: elapsedTime,
  };
};
