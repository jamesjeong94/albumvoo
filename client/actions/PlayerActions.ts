import { CURRENT_ELAPSED_TIME } from '../constants/playerConstants';
import { PlayerActionTypes } from '../types/player';

export const setCurrentElapsed = (elapsedTime: number) => {
  return {
    type: CURRENT_ELAPSED_TIME,
    payload: elapsedTime,
  };
};
