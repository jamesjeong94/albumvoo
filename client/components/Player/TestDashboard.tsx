import React from 'react';

interface TestDashboardProps {
  togglePlay: () => void;
}

const TestDashboard: React.FC<TestDashboardProps> = ({ togglePlay }) => {
  return (
    <div>
      <button onClick={togglePlay}>Play/Pause</button>
    </div>
  );
};

export = TestDashboard;
