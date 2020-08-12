import React from 'react';
import { timeToReadable } from '../../util';
import { Slider, Checkbox, FormControlLabel } from '@material-ui/core';

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
  return (
    <div className="SpotifyPlayer" style={{ border: '1px solid black' }}>
      <button onClick={togglePlay}>Play/Pause</button>
      <div>
        <p>
          {currentTrack.name} by {currentTrack.artists}
        </p>
      </div>
      <button
        onClick={() => {
          handleClickPrevious();
        }}
      >
        {'<'}
      </button>
      <button
        onClick={() => {
          handleClickNext();
        }}
      >
        {'>'}
      </button>
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
      {timeToReadable(currentTime)}
      <Slider
        value={(currentTime * 100) / totalTime}
        onChangeCommitted={(event, newValue: any) => {
          handlePlaybackSliderChange(newValue);
          setCurrentElapsed((newValue * totalTime) / 100);
        }}
      />
      {timeToReadable(totalTime)}
    </div>
  );
};

export = TestDashboard;
