import React, { useState } from 'react';
import StreamRow from './StreamRow';
import StreamHeader from './StreamHeader';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import { TableHead } from '@material-ui/core';
import TablePagination from '@material-ui/core/TablePagination';

interface StreamListProps {
  items: any[];
}

const StreamList: React.FC<StreamListProps> = ({ items }) => {
  const [page, setPage] = useState(0);

  const setNewPage = (event: any, newPage: any) => {
    setPage(newPage);
  };
  const streamRows = items.slice(10 * page, 10 * (page + 1)).map((item) => {
    return <StreamRow key={item.id} item={item}></StreamRow>;
  });
  return (
    <div className="StreamList">
      <TableContainer>
        <Table stickyHeader>
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
