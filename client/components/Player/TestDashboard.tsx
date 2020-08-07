import React from 'react';

interface TestDashboardProps {
  togglePlay: () => void;
  currentTime: number;
  totalTime: number;
}

const TestDashboard: React.FC<TestDashboardProps> = ({
  togglePlay,
  currentTime,
  totalTime,
}) => {
  return (
    <div>
      <button onClick={togglePlay}>Play/Pause</button>
      <p>
        {currentTime}:{totalTime}
      </p>
    </div>
  );
};

export = TestDashboard;
