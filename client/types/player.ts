export type Song = string;

export type Context = string;

export interface AlbumSong {
  song: Song;
  context: Context;
}

export interface PlaySongAction {
  type: string;
  payload: AlbumSong;
}

export interface QueueSongAction {
  type: string;
  payload: Song;
}

export interface DequeueSongAction {
  type: string;
  payload: null;
}

export interface CurrentElaspedTimeAction {
  type: string;
  payload: number;
}

export type PlayerActionTypes = PlaySongAction | QueueSongAction | DequeueSongAction;

export interface PlayerState {
  song: Song;
  queue: Song[];
}
