import React from 'react';

interface CurrentlyPlayingPanelProps {
  name: string;
  artists: string;
}

const CurrentlyPlayingPanel: React.FC<CurrentlyPlayingPanelProps> = ({
  name,
  artists,
}) => {
  return (
    <div className="dashboard-info">
      <p>
        {name} by {artists}
      </p>
    </div>
  );
};

export = CurrentlyPlayingPanel;
