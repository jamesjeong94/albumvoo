import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import StreamRow from './StreamRow';
import StreamHeader from './StreamHeader';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import { TableHead } from '@material-ui/core';

interface StreamListProps {
  items: any[];
}

const StreamList: React.FC<StreamListProps> = ({ items }) => {
  const [paging, increasePaging] = useState(20);

  const showMorePaging = () => {
    increasePaging(paging + 10);
  };

  const streamRows = items.map((item) => {
    return <StreamRow item={item}></StreamRow>;
  });
  return (
    <div>
      <TableContainer>
        <Table stickyHeader>
          <StreamHeader></StreamHeader>
          <TableBody>
            <InfiniteScroll
              dataLength={paging}
              next={showMorePaging}
              loader={<h6>Loading</h6>}
              hasMore={true}
              height={600}
            >
              {streamRows}
            </InfiniteScroll>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export = StreamList;
