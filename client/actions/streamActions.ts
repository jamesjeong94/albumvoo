import { PLAY_SONG, SET_CURRENT_ALBUM_TRACKS } from '../constants/streamConstants';
import { PlayerActionTypes, Song, Context } from '../types/player';

export const playSong = (
  song: Song,
  context: Context,
  index: number
): PlayerActionTypes => {
  return {
    type: PLAY_SONG,
    payload: { song, context, index },
  };
};

export const setCurrentAlbumTracks = (album: any[]): PlayerActionTypes => {
  return {
    type: SET_CURRENT_ALBUM_TRACKS,
    payload: album,
  };
};
