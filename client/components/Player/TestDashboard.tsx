import React from 'react';
import { Slider, Checkbox, FormControlLabel, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  PlayCircleOutlineRounded,
  NavigateBeforeRounded,
  NavigateNextRounded,
  LoopRounded,
  PauseCircleOutlineRounded,
} from '@material-ui/icons';
import { AlbumInfoType } from '../../types/spotify';

import CurrentlyPlayingPanel from './CurrentlyPlayingPanel';
import { timeToReadable } from '../../util';

interface TestDashboardProps {
  togglePlay: () => void;
  currentTime: number;
  totalTime: number;
  currentTrack: any;
  handleClickNext: () => void;
  handleClickPrevious: () => void;
  handleVolumeChange: (volume: number | number[]) => void;
  volume: number;
  autoPlay: boolean;
  handleAutoPlay: () => void;
  setCurrentElapsed: (elaspedTime: number) => void;
  handlePlaybackSliderChange: (position: number) => void;
  albumInfo: AlbumInfoType;
  isPlaying: boolean;
}

const useStyles = makeStyles({
  playback: {
    minWidth: '200px',
    maxWidth: '40vh',
  },
  iconFill: {
    fill: '#0048ff',
  },
  noFill: {},
});

const TestDashboard: React.FC<TestDashboardProps> = ({
  togglePlay,
  currentTime,
  totalTime,
  currentTrack,
  handleClickNext,
  handleClickPrevious,
  handleVolumeChange,
  volume,
  autoPlay,
  handleAutoPlay,
  setCurrentElapsed,
  handlePlaybackSliderChange,
  albumInfo,
  isPlaying,
}) => {
  const classes = useStyles();

  const showPlayOrPauseBtn = isPlaying ? (
    <PauseCircleOutlineRounded></PauseCircleOutlineRounded>
  ) : (
    <PlayCircleOutlineRounded></PlayCircleOutlineRounded>
  );

  const autoPlayStyle = autoPlay ? classes.iconFill : classes.noFill;
  return (
    <div className="SpotifyPlayer" style={{ border: '1px solid black' }}>
      <div className="leftOfPlayer">
        <CurrentlyPlayingPanel
          name={currentTrack.name}
          artists={currentTrack.artists}
          albumInfo={albumInfo}
        ></CurrentlyPlayingPanel>
      </div>
      <div className="middleOfPlayer">
        <div className="topOfMiddle">
          <div style={{ padding: '24px' }}></div>
          <IconButton
            onClick={() => {
              handleClickPrevious();
            }}
          >
            <NavigateBeforeRounded></NavigateBeforeRounded>
          </IconButton>
          <IconButton onClick={togglePlay}>{showPlayOrPauseBtn}</IconButton>
          <IconButton
            onClick={() => {
              handleClickNext();
            }}
          >
            <NavigateNextRounded></NavigateNextRounded>
          </IconButton>
          <IconButton onClick={handleAutoPlay}>
            <LoopRounded className={autoPlayStyle}></LoopRounded>
          </IconButton>
        </div>
        <div className="bottomOfMiddle">
          <div className="centerText">
            <p>{timeToReadable(currentTime)}</p>
          </div>
          <div className="centerText">
            <Slider
              className={classes.playback}
              value={(currentTime * 100) / totalTime}
              onChangeCommitted={(event, newValue: any) => {
                handlePlaybackSliderChange(newValue);
                setCurrentElapsed((newValue * totalTime) / 100);
              }}
            />
          </div>
          <div className="centerText">
            <p>{timeToReadable(totalTime)}</p>
          </div>
        </div>
      </div>
      <div className="rightOfPlayer">
        <div className="dashboard-volume">
          <div className="VolumeSlider">
            <Slider
              defaultValue={volume}
              value={volume}
              onChange={() => {}}
              onChangeCommitted={(event, newValue) => {
                handleVolumeChange(newValue);
              }}
              aria-labelledby="continuous-slider"
            ></Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export = TestDashboard;
