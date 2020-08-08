import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import SpotifyPlayer from './SpotifyPlayer';
import { setCurrentElapsed } from '../../actions/playerActions';

const mapStateToProps = (state: any) => {
  return { song: state.stream.currentSong };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    currentElapsed: (elaspedTime: number) => {
      dispatch(setCurrentElapsed(elaspedTime));
    },
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type SpotifyPlayerWrapperProps = PropsFromRedux;

const SpotifyPlayerWrapper: React.FC<SpotifyPlayerWrapperProps> = ({
  song,
  currentElapsed,
}) => {
  return <SpotifyPlayer song={song} currentElapsed={currentElapsed}></SpotifyPlayer>;
};

export = connector(SpotifyPlayerWrapper);
