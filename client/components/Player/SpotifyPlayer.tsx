import React, { useEffect, useState } from 'react';
import { getCookieValue, loadScript } from '../../util';
//prettier-ignore
import {
  IWebPlaybackError,IWebPlaybackImage,IWebPlaybackAlbum,IWebPlaybackArtist,IWebPlaybackState
} from '../../types/spotify';
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

interface SpotifyPlayerProps {
  song: string;
  currentElapsed: (elaspedTime: number) => void;
}

var player: any;
var playerProgressInterval: any;

const SpotifyPlayer: React.FC<SpotifyPlayerProps> = ({ song, currentElapsed }) => {
  //initialize constants
  const progressUpdateInterval = 100;
  const emptyTrack = {
    artists: '',
    durationMs: 0,
    id: '',
    image: '',
    name: '',
    uri: '',
  };
  const access_token = getCookieValue('access_token');

  //initialize state
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
  const [elapsed, setElapsed] = useState(0);
  const [previousTracks, setPreviousTracks] = useState([]);
  const [status, setStatus] = useState('STATUS.IDLE');
  const [track, setTrack] = useState(emptyTrack);
  const [volume, setVolume] = useState(1);

  const initializePlayer = () => {
    player = new (window as any).Spotify.Player({
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
    console.log('Player initialized');
  };

  //player state change

  //initial mount
  useEffect(() => {
    loadPlayer();
  }, []);

  useEffect(() => {
    playNewSong();
  }, [song]);

  const loadPlayer = async () => {
    await loadScript({
      defer: true,
      id: 'spotify-player',
      source: 'https://sdk.scdn.co/spotify-player.js',
    });
    (window as any).onSpotifyWebPlaybackSDKReady = initializePlayer;
  };

  const togglePlay = async () => {
    if (!isPlaying) {
      await play(
        { uris: [song], position_ms: elapsed, deviceId: currentDeviceId },
        access_token
      );
    } else {
      await pause(access_token);
    }
    setIsPlaying(!isPlaying);
  };

  const playNewSong = async () => {
    console.log('Play new song');
    await play({ uris: [song], position_ms: 0, deviceId: currentDeviceId }, access_token);
    setIsPlaying(true);
  };

  const initializeDevices = async (deviceId: string) => {
    let { devices } = await getDevices(access_token);
    let currentDevice = deviceId;
    let savedDeviceId = sessionStorage.getItem('avdeviceitem');
    if (!savedDeviceId) {
      sessionStorage.setItem('avdeviceitem', currentDevice);
    } else {
      currentDevice = savedDeviceId;
    }
    return { currentDevice, allDevices: devices };
  };

  //set state for current device and devices
  const handlePlayerStatus = async ({ device_id }: any) => {
    const { allDevices } = await initializeDevices(device_id);
    setCurrentDeviceId(device_id);
    setDevices(allDevices);
  };

  //set state for current player state
  const handlePlayerStateChanges = async () => {
    let currentState = await (player as any).getCurrentState();
    const {
      album,
      artists,
      duration_ms,
      id,
      name,
      uri,
    } = currentState.track_window.current_track;
    let current_track = {
      artists: artists.map((d: any) => d.name).join(', '),
      durationMs: duration_ms,
      id,
      image: setAlbumImage(album),
      name,
      uri,
    };
    setTrack(current_track);
  };

  //set state for current playback position
  const handlePlaybackStatus = () => {
    if (isPlaying) {
      if (!playerProgressInterval) {
        playerProgressInterval = window.setInterval(
          updateCurrentProgress,
          progressUpdateInterval
        );
      }
    } else {
      if (playerProgressInterval) {
        clearInterval(playerProgressInterval);
        playerProgressInterval = undefined;
      }
    }
  };

  const updateCurrentProgress = async () => {
    if (player) {
      const state = (await player.getCurrentState()) as IWebPlaybackState;
      if (state) {
        const position = state.position / state.track_window.current_track.duration_ms;
        setElapsed(state.position);
        currentElapsed(state.position);
        setPosition(Number((position * 100).toFixed(1)));
      }
    }
  };

  const setAlbumImage = (album: IWebPlaybackAlbum): string => {
    const width = Math.max(...album.images.map((d) => d.width));
    const thumb: IWebPlaybackImage =
      album.images.find((d) => d.width === width) || ({} as IWebPlaybackImage);

    return thumb.url;
  };

  const handlePlayerErrors = (type: string, message: string) => {};

  useEffect(() => {
    handlePlaybackStatus();
  }, [isPlaying]);

  return (
    <div>
      <TestDashboard
        togglePlay={togglePlay}
        currentTime={elapsed / 1000}
        totalTime={track.durationMs / 1000}
        currentTrack={track}
      ></TestDashboard>
    </div>
  );
};

export = SpotifyPlayer;
