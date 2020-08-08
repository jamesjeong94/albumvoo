import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import SpotifyPlayer from './SpotifyPlayer';

const mapStateToProps = (state: any) => {
  return { song: state.stream.currentSong };
};

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type SpotifyPlayerWrapperProps = PropsFromRedux;

const SpotifyPlayerWrapper: React.FC<SpotifyPlayerWrapperProps> = ({ song }) => {
  return <SpotifyPlayer song={song}></SpotifyPlayer>;
};

export = connector(SpotifyPlayerWrapper);
