import React from 'react';
import Slider from '@material-ui/core/Slider';

interface TestDashboardProps {
  togglePlay: () => void;
  currentTime: number;
  totalTime: number;
  currentTrack: any;
  handleClickNext: () => void;
  handleClickPrevious: () => void;
  handleVolumeChange: (volume: number | number[]) => void;
  volume: number;
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
}) => {
  return (
    <div className="SpotifyPlayer" style={{ border: '1px solid black' }}>
      <button onClick={togglePlay}>Play/Pause</button>
      <p>
        {currentTrack.name} by {currentTrack.artists}
      </p>
      <p>
        {currentTime}:{totalTime}
      </p>
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
  );
};

export = TestDashboard;
