import { DEQUEUE_SONG } from '../constants/playerConstants';
import { PlayerActionTypes } from '../types/player';

export const dequeueSong = (): PlayerActionTypes => {
  return {
    type: DEQUEUE_SONG,
    payload: null,
  };
};
