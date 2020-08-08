import React from 'react';
import { connect } from 'react-redux';
import SpotifyPlayer from './SpotifyPlayer';

const mapStateToProps = () => {
  return {};
};

interface SpotifyPlayerWrapperProps {}

const SpotifyPlayerWrapper: React.FC<SpotifyPlayerWrapperProps> = ({}) => {
  return <SpotifyPlayer song={'something'} queue={['something']}></SpotifyPlayer>;
};

export = connect(mapStateToProps)(SpotifyPlayerWrapper);
