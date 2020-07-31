import React from 'react';

interface ItemProps {
  external_urls: Object;
  followers: Object;
  genres: string[];
  images: any[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

interface Props {
  info: ItemProps;
}

const ItemRow: React.FC<Props> = ({ info }) => {
  return (
    <div>
      <p>{info.name}</p>
    </div>
  );
};

export = ItemRow;
