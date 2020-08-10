import React from 'react';
import moment from 'moment';
import { TableRow, TableCell } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import FavoriteWidget from './FavoriteWidget';
import { AlbumSongType } from '../../types/player';

interface AlbumSongProps {
  playThisSong: (song_id: string, context: string, index: number) => void;
  info: any;
  currentSong: string;
  elapsedTime: any;
  context: string;
  handleClickForAlbumTracks: () => void;
}

const theme = createMuiTheme({
  overrides: {
    MuiTableCell: {
      root: {
        backgroundColor: 'lightblue',
      },
    },
  },
});

const AlbumSong: React.FC<AlbumSongProps> = ({
  info,
  playThisSong,
  currentSong,
  elapsedTime,
  context,
  handleClickForAlbumTracks,
}) => {
  const isThisSongBeingPlayed = currentSong === info.uri;
  const percentage = isThisSongBeingPlayed ? (elapsedTime * 100) / info.duration_ms : 0;
  const progressBar = isThisSongBeingPlayed ? (
    <TableRow>
      <TableCell colSpan={6}>
        <div style={{ border: '1px solid black', height: '5px' }}>
          <div
            style={{
              backgroundColor: 'lightgrey',
              width: `${percentage}%`,
              height: '5px',
            }}
          ></div>
        </div>
      </TableCell>
    </TableRow>
  ) : null;
  const artists = info.artists
    .reduce((acc: any[], curr: any) => {
      acc.push(curr.name);
      return acc;
    }, [])
    .join(', ');

  let duration = moment.utc(info.duration_ms).format('mm:ss');

  return (
    <>
      <TableRow
        hover={true}
        onClick={() => {
          playThisSong(info.uri, context, info.track_number - 1);
          handleClickForAlbumTracks();
        }}
      >
        <TableCell>
          <FavoriteWidget isSaved={info.isSavedByUser}></FavoriteWidget>
        </TableCell>
        <TableCell>{info.track_number}</TableCell>
        <TableCell>{info.name}</TableCell>
        <TableCell>{artists}</TableCell>
        <TableCell>{duration}</TableCell>
      </TableRow>
      {progressBar}
    </>
  );
};

export = AlbumSong;
