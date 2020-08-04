import React from 'react';
import {
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Collapse,
  Box,
} from '@material-ui/core';

interface AlbumSongProps {
  info: any[];
}

const AlbumSong: React.FC<AlbumSongProps> = ({ info }) => {
  return (
    <TableRow>
      <TableCell>Placeholder</TableCell>
      <TableCell>2</TableCell>
      <TableCell>3</TableCell>
      <TableCell>4</TableCell>
    </TableRow>
  );
};

export = AlbumSong;
