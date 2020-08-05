import React from 'react';
import { getCookieValue } from '../../util';

interface SpotifyPlayerProps {}

const SpotifyPlayer: React.FC<SpotifyPlayerProps> = ({}) => {
  const access_token = getCookieValue('access_token');

  return (
    <div>
      <p>player</p>
    </div>
  );
};

export = SpotifyPlayer;
