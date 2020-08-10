import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { playSong, setCurrentAlbumTracks } from '../../actions/streamActions';
import AlbumSongList from './AlbumSongList';

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
    playThisSong: (song_id: string, context: string, index: number): void => {
      dispatch(playSong(song_id, context, index));
    },
    setCurrentAlbumTracks: (currentAlbum: any[]) => {
      dispatch(setCurrentAlbumTracks(currentAlbum));
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
  setCurrentAlbumTracks,
}) => {
  return (
    <AlbumSongList
      elapsedTime={elapsedTime}
      currentSong={currentSong}
      context={context}
      songs={songs}
      open={open}
      playThisSong={playThisSong}
      setCurrentAlbumTracks={setCurrentAlbumTracks}
    ></AlbumSongList>
  );
};

export = connector(AlbumSongListWrapper);
