import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {
  playSong,
  setCurrentAlbumTracks,
  setCurrentAlbumInfo,
} from '../../actions/streamActions';
import AlbumSongList from './AlbumSongList';
import { batch } from 'react-redux';

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
    playThisSong: (
      song_id: string,
      context: string,
      index: number,
      elapsed: number
    ): void => {
      dispatch(playSong(song_id, context, index, elapsed));
    },
    setCurrentAlbumTracks: (currentAlbum: any[], albumInfo: any) => {
      batch(() => {
        dispatch(setCurrentAlbumTracks(currentAlbum));
        dispatch(setCurrentAlbumInfo(albumInfo));
      });
    },
  };
};

interface PropsFromParent {
  songs: any[];
  open: boolean;
  context: string;
  albumInfo: any;
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
  albumInfo,
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
      albumInfo={albumInfo}
    ></AlbumSongList>
  );
};

export = connector(AlbumSongListWrapper);
