import React, { useEffect, useState } from 'react';
import { getCookieValue, loadScript } from '../../util';
import { IWebPlaybackError } from '../../types/spotify';
import {
  getDevices,
  getPlaybackState,
  next,
  pause,
  play,
  previous,
  seek,
  setDevice,
  setVolume,
} from '../../spotifyPlayerAPI';
import TestDashboard from './TestDashboard';

interface SpotifyPlayerProps {}

const SpotifyPlayer: React.FC<SpotifyPlayerProps> = ({}) => {
  const [currentDeviceId, setCurrentDeviceId] = useState<string>('');
  const [devices, setDevices] = useState([]);
  const [error, setError] = useState('');
  const [errorType, setErrorType] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [isMagnified, setIsMagnified] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isUnsupported, setIsUnsupported] = useState(false);
  const [needsUpdate, setNeedsUpdate] = useState(false);
  const [nextTracks, setNextTracks] = useState([]);
  const [position, setPosition] = useState(0);
  const [previousTracks, setPreviousTracks] = useState([]);
  const [status, setStatus] = useState('STATUS.IDLE');
  const [track, setTrack] = useState('spotify:track:1ZvBVbsaNqHEP6ymXaPGlj');
  const [volume, setVolume] = useState(1);

  let player;
  const access_token = getCookieValue('access_token');
  const loadPlayer = async () => {
    await loadScript({
      defer: true,
      id: 'spotify-player',
      source: 'https://sdk.scdn.co/spotify-player.js',
    });
  };

  const togglePlay = async () => {
    console.log(devices);
  };
  const initializeDevices = async (deviceId: string) => {
    let { devices } = await getDevices(access_token);
    let currentDevice = deviceId;
    return { currentDevice, allDevices: devices };
  };

  const handlePlayerStatus = async ({ device_id }: any) => {
    const { currentDevice, allDevices } = await initializeDevices(device_id);
    console.log(allDevices);
    setDevices(allDevices);
    setCurrentDeviceId(currentDevice);
  };

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

  //player state change
  useEffect(() => {}, [
    currentDeviceId,
    error,
    isInitializing,
    isPlaying,
    status,
    track,
  ]);

  //initial mount
  useEffect(() => {
    (window as any).onSpotifyWebPlaybackSDKReady = initializePlayer;
    loadPlayer();
  }, []);

  return (
    <div>
      <TestDashboard togglePlay={togglePlay}></TestDashboard>
    </div>
  );
};

export = SpotifyPlayer;
