import React, { useState } from 'react';
import axios from 'axios';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import AlbumSongListWrapper from './AlbumSongListWrapper';

import { getRelativeTime } from '../../util';

interface StreamRowProps {
  item: any;
}

const StreamRow: React.FC<StreamRowProps> = ({ item }) => {
  const [open, setCollapse] = useState<boolean>(false);
  const [albumSongs, setAlbumSongs] = useState<[]>([]);
  const getAllSongsFromAlbum = (id: string) => {
    axios({
      method: 'get',
      url: 'http://localhost:3000/spotify/albumsongs',
      params: { album_id: id },
    }).then(({ data }) => {
      setAlbumSongs(data);
    });
  };

  const imgUrl = item.images.length > 0 ? item.images[item.images.length - 1].url : null;
  const relativeTime = getRelativeTime(item.release_date);
  return (
    <React.Fragment>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => {
              setCollapse(!open);
              getAllSongsFromAlbum(item.id);
            }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          <img src={imgUrl} />
        </TableCell>
        <TableCell>{item.name}</TableCell>
        <TableCell>{item.artists[0].name}</TableCell>
        <TableCell>{relativeTime}</TableCell>
      </TableRow>
      <AlbumSongListWrapper
        albumInfo={item}
        context={item.uri}
        songs={albumSongs}
        open={open}
      ></AlbumSongListWrapper>
    </React.Fragment>
  );
};

export = StreamRow;
