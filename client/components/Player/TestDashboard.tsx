import React from 'react';

interface TestDashboardProps {
  togglePlay: () => void;
  currentTime: number;
  totalTime: number;
  currentTrack: any;
}

const TestDashboard: React.FC<TestDashboardProps> = ({
  togglePlay,
  currentTime,
  totalTime,
  currentTrack,
}) => {
  return (
    <div style={{ border: '1px solid black' }}>
      <button onClick={togglePlay}>Play/Pause</button>
      <p>
        {currentTrack.name} by {currentTrack.artists}
      </p>
      <p>
        {currentTime}:{totalTime}
      </p>
    </div>
  );
};

export = TestDashboard;
