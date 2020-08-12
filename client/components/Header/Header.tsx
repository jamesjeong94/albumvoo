import React from 'react';
import logo from '../../../assets/logo.png';
import NavBar from './NavBar';

interface HeaderProps {
  getRecentByTopArtists: () => void;
}

const Header: React.FC<HeaderProps> = ({ getRecentByTopArtists }) => {
  return (
    <div className="Header">
      <div>
        <img className="logo" src={logo}></img>
      </div>
      <NavBar getRecentByTopArtists={getRecentByTopArtists}></NavBar>
    </div>
  );
};

export = Header;
