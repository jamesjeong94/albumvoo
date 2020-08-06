export interface IWebPlaybackError {
  message: WebPlaybackErrors;
}

export type WebPlaybackErrors =
  | 'initialization_error'
  | 'authentication_error'
  | 'account_error'
  | 'playback_error';
