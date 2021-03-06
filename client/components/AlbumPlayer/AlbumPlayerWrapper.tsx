import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import AlbumPlayer from './AlbumPlayer';
import { AlbumInfoType } from '../../types/spotify';

interface StateProps {
  albumInfo: AlbumInfoType;
}

const mapStateToProps = (state: any): StateProps => {
  return {
    albumInfo: state.stream.albumInfo,
  };
};

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface PropsFromParent {}

type AlbumPlayerWrapperProps = PropsFromRedux & PropsFromParent;

const AlbumPlayerWrapper: React.FC<AlbumPlayerWrapperProps> = ({ albumInfo }) => {
  return <AlbumPlayer albumInfo={albumInfo}></AlbumPlayer>;
};

export = connector(AlbumPlayerWrapper);
