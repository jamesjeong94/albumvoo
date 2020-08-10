import React from 'react';
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
}) => {
  return (
    <div className="SpotifyPlayer" style={{ border: '1px solid black' }}>
      <button onClick={togglePlay}>Play/Pause</button>
      <div>
        <p>
          {currentTrack.name} by {currentTrack.artists}
        </p>
        <p>
          {currentTime}:{totalTime}
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
    </div>
  );
};

export = TestDashboard;
