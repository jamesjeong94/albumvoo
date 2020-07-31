import React from 'react';

interface StreamRowProps {
  item: any;
}

const StreamRow: React.FC<StreamRowProps> = ({ item }) => {
  return (
    <div>
      {item.name} {item.artists[0].name} {item.release_date}
    </div>
  );
};

export = StreamRow;
