import React from 'react';

interface StreamRowProps {
  item: any;
}

const StreamRow: React.FC<StreamRowProps> = ({ item }) => {
  let imgUrl =
    item.images.length > 0 ? item.images[item.images.length - 1].url : null;
  return (
    <div className="StreamRow">
      <img src={imgUrl} />
      <div>{item.name}</div>
      <div>{item.artists[0].name}</div>
      <div>{item.release_date}</div>
    </div>
  );
};

export = StreamRow;
