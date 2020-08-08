import React from 'react';
import moment from 'moment';
import {
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Collapse,
  Box,
} from '@material-ui/core';
import FavoriteWidget from './FavoriteWidget';

interface AlbumSongProps {
  playThisSong: (song_id: string) => void;
  info: any;
  currentSong: string;
  elapsedTime: any;
}

const AlbumSong: React.FC<AlbumSongProps> = ({
  info,
  playThisSong,
  currentSong,
  elapsedTime,
}) => {
  const isThisSongBeingPlayed = currentSong === info.uri;

  const percentage = isThisSongBeingPlayed ? (elapsedTime * 100) / info.duration_ms : 0;
  console.log(percentage);
  const artists = info.artists
    .reduce((acc: any[], curr: any) => {
      acc.push(curr.name);
      return acc;
    }, [])
    .join(', ');

  let duration = moment.utc(info.duration_ms).format('mm:ss');
  return (
    <TableRow
      hover={true}
      onClick={() => {
        playThisSong(info.uri);
      }}
      style={{ backgroundColor: 'lightgrey', width: `${percentage}%` }}
    >
      <TableCell>
        <FavoriteWidget isSaved={info.isSavedByUser}></FavoriteWidget>
      </TableCell>
      <TableCell>{info.track_number}</TableCell>
      <TableCell>{info.name}</TableCell>
      <TableCell>{artists}</TableCell>
      <TableCell>{duration}</TableCell>
    </TableRow>
  );
};

export = AlbumSong;
