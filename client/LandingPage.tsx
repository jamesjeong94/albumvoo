import React from 'react';
import { Link } from 'react-router-dom';

const HOST = `http://localhost:3000`;

interface LandingPageProps {
  rerouteLink: string;
}

const LandingPage: React.FC<LandingPageProps> = ({ rerouteLink }) => {
  return (
    <div>
      <p>Landing page pls</p>
      <div>
        <a id="login" href={`${HOST}${rerouteLink}`}>
          Login
        </a>
      </div>
    </div>
  );
};

export = LandingPage;
