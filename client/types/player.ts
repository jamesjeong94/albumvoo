export interface Song {
  type: string;
}

export interface PlaySongAction {
  type: string;
  payload: Song;
}

export interface QueueSongAction {
  type: string;
  payload: Song;
}

export interface DequeueSongAction {
  type: string;
  payload: null;
}

export type PlayerActionTypes = PlaySongAction | QueueSongAction | DequeueSongAction;

export interface PlayerState {
  song: Song;
  queue: Song[];
}
