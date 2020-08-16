export type WebPlaybackErrors =
  | 'initialization_error'
  | 'authentication_error'
  | 'account_error'
  | 'playback_error';

export interface IWebPlaybackError {
  message: WebPlaybackErrors;
}

export interface IPlayOptions {
  context_uri?: string;
  deviceId: string;
  offset?: number;
  uris?: string[];
  position_ms: number;
}
export interface IWebPlaybackImage {
  height: number;
  url: string;
  width: number;
}

export interface IWebPlaybackAlbum {
  uri: string;
  name: string;
  images: IWebPlaybackImage[];
}

export interface IWebPlaybackState {
  context: {
    uri: null;
    metadata: object;
  };
  bitrate: number;
  position: number;
  duration: number;
  paused: boolean;
  shuffle: boolean;
  repeat_mode: number;
  track_window: {
    current_track: IWebPlaybackTrack;
    next_tracks: IWebPlaybackTrack[];
    previous_tracks: IWebPlaybackTrack[];
  };
  timestamp: number;
  restrictions: {
    disallow_resuming_reasons: [];
    disallow_skipping_prev_reasons: [];
  };
  disallows: {
    resuming: boolean;
    skipping_prev: boolean;
  };
}

export interface IWebPlaybackTrack {
  id: string;
  uri: string;
  type: string;
  linked_from_uri: null | string;
  linked_from: {
    uri: null | string;
    id: null | string;
  };
  media_type: string;
  name: string;
  duration_ms: number;
  artists: IWebPlaybackArtist[];
  album: IWebPlaybackAlbum;
  is_playable: boolean;
}

export interface IWebPlaybackArtist {
  name: string;
  uri: string;
}

export interface AlbumInfoType {
  album_group: string;
  album_type: string;
  artists: any[];
  available_markets: any[];
  external_urls: any;
  href: string;
  id: string;
  images: any[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}
