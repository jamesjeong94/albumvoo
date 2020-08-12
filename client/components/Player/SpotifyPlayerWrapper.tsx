import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import SpotifyPlayer from './SpotifyPlayer';
import { setCurrentElapsed } from '../../actions/playerActions';
import { playSong } from '../../actions/streamActions';

const mapStateToProps = (state: any) => {
  return {
    song: state.stream.currentSong.song,
    context: state.stream.currentSong.context,
    index: state.stream.currentSong.index,
    albumTracks: state.stream.albumTracks,
    elapsedTime: state.player.elapsedTime,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setCurrentElapsed: (elaspedTime: number) => {
      dispatch(setCurrentElapsed(elaspedTime));
    },
    playThisSong: (
      song_id: string,
      context: string,
      index: number,
      elapsed: number
    ): void => {
      dispatch(playSong(song_id, context, index, elapsed));
    },
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type SpotifyPlayerWrapperProps = PropsFromRedux;

const SpotifyPlayerWrapper: React.FC<SpotifyPlayerWrapperProps> = ({
  song,
  elapsedTime,
  setCurrentElapsed,
  context,
  index,
  albumTracks,
  playThisSong,
}) => {
  return (
    <SpotifyPlayer
      song={song}
      context={context}
      setCurrentElapsed={setCurrentElapsed}
      index={index}
      albumTracks={albumTracks}
      playThisSong={playThisSong}
      elapsedTime={elapsedTime}
    ></SpotifyPlayer>
  );
};

export = connector(SpotifyPlayerWrapper);
