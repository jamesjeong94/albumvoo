import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { playSong } from '../../actions/streamActions';
import AlbumSongList from './AlbumSongList';

interface StateProps {
  currentSong: string;
}

const mapStateToProps = (state: any): StateProps => {
  return { currentSong: state.stream.currentSong };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    playThisSong: (song_id: string): void => {
      dispatch(playSong(song_id));
    },
  };
};

interface PropsFromParent {
  songs: any[];
  open: boolean;
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type AlbumSongListWrapperProps = PropsFromRedux & PropsFromParent;

const AlbumSongListWrapper: React.FC<AlbumSongListWrapperProps> = ({
  songs,
  open,
  playThisSong,
  currentSong,
}) => {
  return (
    <AlbumSongList
      currentSong={currentSong}
      songs={songs}
      open={open}
      playThisSong={playThisSong}
    ></AlbumSongList>
  );
};

export = connector(AlbumSongListWrapper);
