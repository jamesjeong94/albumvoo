import React from 'react';
import { Link } from 'react-router-dom';

interface LandingPageProps {}

const LandingPage: React.FC<LandingPageProps> = ({}) => {
  return (
    <div>
      <p>Landing page pls</p>
      <div>
        <Link to="/main">Login</Link>
      </div>
    </div>
  );
};

export = LandingPage;
