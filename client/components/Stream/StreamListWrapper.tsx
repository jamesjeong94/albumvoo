import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import StreamList from './StreamList';
import { AlbumInfoType } from '../../types/spotify';

interface StateProps {
  albumInfo: AlbumInfoType;
}

const mapStateToProps = (state: any): StateProps => {
  return {
    albumInfo: state.stream.albumInfo,
  };
};

interface PropsFromParent {
  items: any[];
}
const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type StreamListWrapperProps = PropsFromRedux & PropsFromParent;

const StreamListWrapper: React.FC<StreamListWrapperProps> = ({ items, albumInfo }) => {
  return <StreamList items={items} albumInfo={albumInfo}></StreamList>;
};

export = connector(StreamListWrapper);
