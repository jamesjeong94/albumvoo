import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

interface StreamListProps {
  items: any[];
}

const StreamList: React.FC<StreamListProps> = ({ items }) => {
  const [paging, increasePaging] = useState(20);

  const showMorePaging = () => {
    increasePaging(paging + 10);
  };

  const streamRows = items.map((item) => {
    return (
      <div>
        <p>
          {item.name} {item.artists[0].name} {item.release_date}
        </p>
      </div>
    );
  });
  return (
    <div>
      <h4>Stream</h4>
      <InfiniteScroll
        dataLength={paging}
        next={showMorePaging}
        loader={<h6>Loading</h6>}
        hasMore={true}
        height={500}
      >
        {streamRows}
      </InfiniteScroll>
    </div>
  );
};

export = StreamList;
