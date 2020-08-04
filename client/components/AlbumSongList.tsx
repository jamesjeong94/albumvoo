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
import AlbumSong from './AlbumSong';

interface IndividualSongRowProps {
  songs: any[];
  open: boolean;
}

const IndividualSongRow: React.FC<IndividualSongRowProps> = ({
  songs,
  open,
}) => {
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
                  <TableCell>Album</TableCell>
                  <TableCell>Album</TableCell>
                  <TableCell>Artist</TableCell>
                  <TableCell>Release Date</TableCell>
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

export = IndividualSongRow;
