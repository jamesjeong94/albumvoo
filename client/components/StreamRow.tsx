import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

interface StreamRowProps {
  item: any;
}

const StreamRow: React.FC<StreamRowProps> = ({ item }) => {
  let imgUrl =
    item.images.length > 0 ? item.images[item.images.length - 1].url : null;
  return (
    <React.Fragment>
      <TableRow>
        <TableCell>
          <img src={imgUrl} />
        </TableCell>
        <TableCell>{item.name}</TableCell>
        <TableCell>{item.artists[0].name}</TableCell>
        <TableCell>{item.release_date}</TableCell>
      </TableRow>
      <TableRow></TableRow>
    </React.Fragment>
  );
};

export = StreamRow;
