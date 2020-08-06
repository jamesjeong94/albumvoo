import React, { useEffect, useState } from 'react';
import { getCookieValue, loadScript } from '../../util';
import { IWebPlaybackError } from '../../types/spotfy';

interface SpotifyPlayerProps {}

const SpotifyPlayer: React.FC<SpotifyPlayerProps> = ({}) => {
  let player;
  const access_token = getCookieValue('access_token');
  const loadPlayer = async () => {
    await loadScript({
      defer: true,
      id: 'spotify-player',
      source: 'https://sdk.scdn.co/spotify-player.js',
    });
  };

  const handlePlayerStatus = () => {};

  const handlePlayerStateChanges = () => {};

  const handlePlayerErrors = (type: string, message: string) => {};

  const initializePlayer = () => {
    //@ts-ignore
    player = new window.Spotify.Player({
      getOAuthToken: (cb: (access_token: string) => void) => {
        cb(access_token);
      },
      name,
    });
    player.addListener('ready', handlePlayerStatus);
    player.addListener('not_ready', handlePlayerStatus);
    player.addListener('player_state_changed', handlePlayerStateChanges);
    player.addListener('initialization_error', (error: IWebPlaybackError) =>
      handlePlayerErrors('initialization_error', error.message)
    );
    player.addListener('authentication_error', (error: IWebPlaybackError) =>
      handlePlayerErrors('authentication_error', error.message)
    );
    player.addListener('account_error', (error: IWebPlaybackError) =>
      handlePlayerErrors('account_error', error.message)
    );
    player.addListener('playback_error', (error: IWebPlaybackError) =>
      handlePlayerErrors('playback_error', error.message)
    );

    player.connect();
  };

  useEffect(() => {
    (window as any).onSpotifyWebPlaybackSDKReady = initializePlayer();
    loadPlayer();
  }, []);

  return <div></div>;
};

export = SpotifyPlayer;
