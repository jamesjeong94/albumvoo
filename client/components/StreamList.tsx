import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import StreamRow from './StreamRow';

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
      <h4>Stream</h4>
      <InfiniteScroll
        dataLength={paging}
        next={showMorePaging}
        loader={<h6>Loading</h6>}
        hasMore={true}
        height={600}
      >
        {streamRows}
      </InfiniteScroll>
    </div>
  );
};

export = StreamList;
