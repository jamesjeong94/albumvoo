export type Song = string;

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

export interface CurrentElaspedTimeAction {
  type: string;
  payload: number;
}

export type PlayerActionTypes = PlaySongAction | QueueSongAction | DequeueSongAction;

export interface PlayerState {
  song: Song;
  queue: Song[];
}
