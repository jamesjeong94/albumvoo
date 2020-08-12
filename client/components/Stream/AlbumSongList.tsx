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
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import AlbumSong from './AlbumSong';
import { AlbumSongType } from '../../types/player';

interface AlbumSongListProps {
  songs: any[];
  open: boolean;
  playThisSong: (
    song_id: string,
    context: string,
    index: number,
    elapsed: number
  ) => void;
  currentSong: string;
  elapsedTime: any;
  context: string;
  setCurrentAlbumTracks: (album: any[]) => void;
}

const theme = createMuiTheme({
  overrides: {
    MuiTableCell: {
      root: {
        padding: '2px 4px',
      },
    },
  },
});

const AlbumSongList: React.FC<AlbumSongListProps> = ({
  songs,
  open,
  playThisSong,
  currentSong,
  elapsedTime,
  context,
  setCurrentAlbumTracks,
}) => {
  const [isSongSaved, setSavedSong] = useState<any[]>([]);
  const songIds = songs.map((song) => song.id);

  const handleClickForAlbumTracks = () => {
    setCurrentAlbumTracks(songs);
  };

  const albumSongs = songs.map((song) => {
    return (
      <AlbumSong
        key={song.id}
        info={song}
        playThisSong={playThisSong}
        currentSong={currentSong}
        elapsedTime={elapsedTime}
        context={context}
        handleClickForAlbumTracks={handleClickForAlbumTracks}
      ></AlbumSong>
    );
  });

  return (
    <ThemeProvider theme={theme}>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align={'center'}>
                      <FavoriteBorder fontSize="small"></FavoriteBorder>
                    </TableCell>
                    <TableCell align={'center'}>No.</TableCell>
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
    </ThemeProvider>
  );
};

export = AlbumSongList;
