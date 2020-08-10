export type Song = string;

export type Context = string;

export interface AlbumTracksAction {
  type: string;
  albumTracks: string[];
}

export interface AlbumSongType {
  song: Song;
  context: Context;
  index: number;
}

export interface PlaySongAction {
  type: string;
  payload: AlbumSongType;
}

export interface CurrentElaspedTimeAction {
  type: string;
  payload: number;
}

export interface PlayNextSongAction {
  type: string;
  payload: string;
}

export interface SetCurrentAlbumTracksAction {
  type: string;
  payload: any[];
}

export type PlayerActionTypes =
  | PlaySongAction
  | PlayNextSongAction
  | SetCurrentAlbumTracksAction;

export interface PlayerState {
  song: Song;
  queue: Song[];
}
