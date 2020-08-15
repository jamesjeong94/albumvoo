import React from 'react';
import { timeToReadable } from '../../util';
import { Slider, Checkbox, FormControlLabel, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  PlayCircleOutlineRounded,
  NavigateBeforeRounded,
  NavigateNextRounded,
} from '@material-ui/icons';

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
}

const useStyles = makeStyles({
  playback: {
    minWidth: '200px',
    maxWidth: '40vh',
  },
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
}) => {
  const classes = useStyles();
  return (
    <div className="SpotifyPlayer" style={{ border: '1px solid black' }}>
      3
      <div className="leftOfPlayer">
        <p>
          {currentTrack.name} by {currentTrack.artists}
        </p>
      </div>
      <div className="middleOfPlayer">
        <div className="topOfMiddle">
          <IconButton
            onClick={() => {
              handleClickPrevious();
            }}
          >
            <NavigateBeforeRounded></NavigateBeforeRounded>
          </IconButton>
          <IconButton onClick={togglePlay}>
            <PlayCircleOutlineRounded></PlayCircleOutlineRounded>
          </IconButton>
          <IconButton
            onClick={() => {
              handleClickNext();
            }}
          >
            <NavigateNextRounded></NavigateNextRounded>
          </IconButton>
          <FormControlLabel
            value="end"
            control={
              <Checkbox
                checked={autoPlay}
                onChange={handleAutoPlay}
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            }
            label="Autoplay"
            labelPlacement="end"
          />
        </div>{' '}
        <div className="bottomOfMiddle">
          <div>{timeToReadable(currentTime)}</div>
          <div>
            <Slider
              className={classes.playback}
              value={(currentTime * 100) / totalTime}
              onChangeCommitted={(event, newValue: any) => {
                handlePlaybackSliderChange(newValue);
                setCurrentElapsed((newValue * totalTime) / 100);
              }}
            />
          </div>
          <div>{timeToReadable(totalTime)}</div>
        </div>
      </div>
      <div className="leftOfPlayer">
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
  );
};

export = TestDashboard;
