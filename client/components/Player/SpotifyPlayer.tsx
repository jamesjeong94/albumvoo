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
  context: string;
  elapsedTime: number;
  setCurrentElapsed: (elaspedTime: number) => void;
  setCurrentSong: (song: string, context: string, index: number) => void;
  index: number;
  albumTracks: any[];
  playThisSong: (song_id: string, context: string, index: number) => void;
}

var player: any;
var playerProgressInterval: any;
var isMounted: boolean = false;

const SpotifyPlayer: React.FC<SpotifyPlayerProps> = ({
  playThisSong,
  song,
  context,
  elapsedTime,
  setCurrentElapsed,
  setCurrentSong,
  index,
  albumTracks,
}) => {
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [status, setStatus] = useState('STATUS.IDLE');
  const [track, setTrack] = useState(emptyTrack);
  const [volume, setVolumeOnDashboard] = useState(0.75);
  const [autoPlay, setAutoPlay] = useState<boolean>(false);

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
    isMounted = true;
  };

  //Load player on initial mount of component
  useEffect(() => {
    loadPlayer();
  }, []);

  //When song changes
  useEffect(() => {
    if (isMounted) {
      playNewOrReplaySong();
    }
  }, [song]);

  useEffect(() => {
    handleCheckForEndOfSong();
  }, [elapsedTime]);

  //When isPlaying is toggled
  useEffect(() => {
    handlePlaybackStatus();
  }, [isPlaying]);

  //Load player function
  const loadPlayer = async () => {
    (window as any).onSpotifyWebPlaybackSDKReady = initializePlayer;
    await loadScript({
      defer: true,
      id: 'spotify-player',
      source: 'https://sdk.scdn.co/spotify-player.js',
    });
  };

  //Toggle play function
  const togglePlay = async () => {
    //check if nothing is playing and there is a song selected
    if (!isPlaying && song !== '') {
      await play(
        {
          uris: [song],
          position_ms: elapsedTime,
          deviceId: currentDeviceId,
          context_uri: context,
        },
        access_token
      );
    } else if (isPlaying && song !== '') {
      await pause(access_token);
    } else {
    }
    setIsPlaying(!isPlaying);
  };

  //Play new song function
  const playNewOrReplaySong = async () => {
    await play({ uris: [song], position_ms: 0, deviceId: currentDeviceId }, access_token);
    setIsPlaying(true);
  };

  //Initialize all connected devices to spotify account, set current web-connection to be main device
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

  const handleCheckForEndOfSong = async () => {
    let currentState = await (player as any).getCurrentState();
    console.log(autoPlay, currentState.duration - elapsedTime);
    if (
      autoPlay === true &&
      currentState.duration - elapsedTime <= progressUpdateInterval
    ) {
      console.log('autoplaying next');
      handleClickNext();
    }
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
    if (currentState.paused) {
      setIsPlaying(false);
    }
    if (!currentState.paused) {
      setIsPlaying(true);
    }
  };

  //Update the position of time elapsed
  const updateCurrentProgress = async () => {
    if (player) {
      const state = (await player.getCurrentState()) as IWebPlaybackState;
      if (state) {
        setCurrentElapsed(state.position); //global ellapsed state
      }
    }
  };

  //Set album image for track
  const setAlbumImage = (album: IWebPlaybackAlbum): string => {
    const width = Math.max(...album.images.map((d) => d.width));
    const thumb: IWebPlaybackImage =
      album.images.find((d) => d.width === width) || ({} as IWebPlaybackImage);

    return thumb.url;
  };

  //toggle time ellapsed interval
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

  const handlePlayerErrors = (type: string, message: string) => {
    console.log(type);
    console.log(message);
  };

  const handleClickNext = async (): Promise<void> => {
    try {
      if (index + 1 < albumTracks.length) {
        playThisSong(albumTracks[index + 1].uri, context, index + 1);
      } else {
        await setCurrentElapsed(0);
        playNewOrReplaySong();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickPrevious = async (): Promise<void> => {
    try {
      if (elapsedTime / 1000 > 3) {
        await setCurrentElapsed(0);
        playNewOrReplaySong();
      } else {
        if (index - 1 >= 0) {
          playThisSong(albumTracks[index - 1].uri, context, index - 1);
        } else {
          playNewOrReplaySong();
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleVolumeChange = async (number: any): Promise<void> => {
    try {
      await setVolumeOnDashboard(number);
      await setVolume(number, access_token);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAutoPlay = () => {
    setAutoPlay(!autoPlay);
  };

  return (
    <TestDashboard
      togglePlay={togglePlay}
      currentTime={elapsedTime / 1000}
      totalTime={track.durationMs / 1000}
      currentTrack={track}
      handleClickNext={handleClickNext}
      handleClickPrevious={handleClickPrevious}
      volume={volume}
      handleVolumeChange={handleVolumeChange}
      autoPlay={autoPlay}
      handleAutoPlay={handleAutoPlay}
    ></TestDashboard>
  );
};

export = SpotifyPlayer;
