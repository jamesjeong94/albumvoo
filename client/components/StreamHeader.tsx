import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { TableHead } from '@material-ui/core';

interface StreamHeaderProps {}

const StreamHeader: React.FC<StreamHeaderProps> = ({}) => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>Album</TableCell>
        <TableCell>Album</TableCell>
        <TableCell>Artist</TableCell>
        <TableCell>Release Date</TableCell>
      </TableRow>
    </TableHead>
  );
};

export = StreamHeader;
