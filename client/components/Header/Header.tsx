import React from 'react';
import logo from '../../../assets/logo.png';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
  return (
    <div>
      <img className="logo" src={logo}></img>
    </div>
  );
};

export = Header;
