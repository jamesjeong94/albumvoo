import React from 'react';
import { AlbumInfoType } from '../../types/spotify';

interface CurrentlyPlayingPanelProps {
  name: string;
  artists: string;
  albumInfo: AlbumInfoType;
}

const CurrentlyPlayingPanel: React.FC<CurrentlyPlayingPanelProps> = ({
  name,
  artists,
  albumInfo,
}) => {
  let imgUrl = albumInfo.images
    ? albumInfo.images[albumInfo.images.length - 1].url
    : null;
  return (
    <div className="dashboard-info">
      <div>
        <img src={imgUrl}></img>
      </div>
      <div>
        <div>
          <p>{name}</p>
        </div>
        <div>
          <p>{artists}</p>
        </div>
      </div>
    </div>
  );
};

export = CurrentlyPlayingPanel;
