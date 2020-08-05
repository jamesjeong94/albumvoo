import React, { useState } from 'react';
import {
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Collapse,
  Box,
} from '@material-ui/core';
import { Favorite, FavoriteBorder } from '@material-ui/icons';
import AlbumSong from './AlbumSong';

interface AlbumSongListProps {
  songs: any[];
  open: boolean;
}

const AlbumSongList: React.FC<AlbumSongListProps> = ({ songs, open }) => {
  const [isSongSaved, setSavedSong] = useState<any[]>([]);
  const songIds = songs.map((song) => song.id);

  const albumSongs = songs.map((song) => {
    return <AlbumSong key={song.id} info={song}></AlbumSong>;
  });

  return (
    <TableRow>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box margin={1}>
            <Table size="small" aria-label="purchases">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <FavoriteBorder fontSize="small"></FavoriteBorder>
                  </TableCell>
                  <TableCell>No.</TableCell>
                  <TableCell>Song</TableCell>
                  <TableCell>Artist</TableCell>
                  <TableCell>Duration</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{albumSongs}</TableBody>
            </Table>
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  );
};

export = AlbumSongList;
