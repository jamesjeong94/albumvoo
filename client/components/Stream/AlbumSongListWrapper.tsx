import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { playSong } from '../../actions/streamActions';
import AlbumSongList from './AlbumSongList';
import { AlbumSongType } from '../../types/player';

interface StateProps {
  currentSong: string;
  elapsedTime: any;
}

const mapStateToProps = (state: any): StateProps => {
  return {
    currentSong: state.stream.currentSong.song,
    elapsedTime: state.player.elapsedTime,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    playThisSong: (song_id: string, context: string): void => {
      dispatch(playSong(song_id, context));
    },
  };
};

interface PropsFromParent {
  songs: any[];
  open: boolean;
  context: string;
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type AlbumSongListWrapperProps = PropsFromRedux & PropsFromParent;

const AlbumSongListWrapper: React.FC<AlbumSongListWrapperProps> = ({
  songs,
  open,
  playThisSong,
  currentSong,
  elapsedTime,
  context,
}) => {
  return (
    <AlbumSongList
      elapsedTime={elapsedTime}
      currentSong={currentSong}
      context={context}
      songs={songs}
      open={open}
      playThisSong={playThisSong}
    ></AlbumSongList>
  );
};

export = connector(AlbumSongListWrapper);
