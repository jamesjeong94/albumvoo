import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

interface StreamHeaderProps {}

const StreamHeader: React.FC<StreamHeaderProps> = ({}) => {
  return (
    <TableRow>
      <TableCell></TableCell>
      <TableCell>Cover</TableCell>
      <TableCell>Album</TableCell>
      <TableCell>Artist</TableCell>
      <TableCell>Released</TableCell>
    </TableRow>
  );
};

export = StreamHeader;
