import React, { useState } from 'react';
import StreamRow from './StreamRow';
import StreamHeader from './StreamHeader';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import { TableHead } from '@material-ui/core';
import TablePagination from '@material-ui/core/TablePagination';

import { AlbumInfoType } from '../../types/spotify';

interface StreamListProps {
  items: any[];
  albumInfo: AlbumInfoType;
}

const StreamList: React.FC<StreamListProps> = ({ items, albumInfo }) => {
  const [page, setPage] = useState(0);

  const setNewPage = (event: any, newPage: any) => {
    setPage(newPage);
  };
  const streamRows = items.slice(10 * page, 10 * (page + 1)).map((item) => {
    return <StreamRow key={item.id} item={item}></StreamRow>;
  });

  const image = albumInfo.images ? albumInfo.images[0].url : null;
  const backgroundImage = image
    ? {
        position: 'absolute' as 'absolute',
        backgroundImage: `url(${image})`,
        filter: 'blur(8px)',
        height: '100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        zIndex: -1,
        backgroundSize: '100%',
        opacity: 0.5,
        width: '100%',
      }
    : {};

  return (
    <div className="StreamList">
      <div style={backgroundImage}></div>
      <TableContainer>
        <Table stickyHeader>
          <colgroup>
            <col style={{ width: '10%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '40%' }} />
            <col style={{ width: '20%' }} />
            <col style={{ width: '20%' }} />
          </colgroup>
          <TableHead>
            <StreamHeader></StreamHeader>
          </TableHead>
          <TableBody>{streamRows}</TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={items.length}
        rowsPerPage={10}
        page={page}
        onChangePage={setNewPage}
      />
    </div>
  );
};

export = StreamList;
