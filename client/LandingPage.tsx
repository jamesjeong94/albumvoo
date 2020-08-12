import React from 'react';
import logo from '../assets/logo.png';

const HOST = `http://localhost:3000`;

interface LandingPageProps {
  rerouteLink: string;
}

const LandingPage: React.FC<LandingPageProps> = ({ rerouteLink }) => {
  return (
    <div>
      <div>
        <img className="logo" src={logo}></img>
        <h3>What is Albumvoo?</h3>
        <h3>Why?</h3>
        <h3>What technologies did you use?</h3>
        <h3>Let's try it out!</h3>
        <a id="login" href={`${HOST}${rerouteLink}`}>
          Login
        </a>
      </div>
    </div>
  );
};

export = LandingPage;
