import React from 'react';
import Button from '@material-ui/core/Button';

interface NavBarProps {
  getRecentByTopArtists: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ getRecentByTopArtists }) => {
  return (
    <div>
      <Button color="inherit" onClick={getRecentByTopArtists}>
        Get Recent Albums
      </Button>
    </div>
  );
};

export = NavBar;
