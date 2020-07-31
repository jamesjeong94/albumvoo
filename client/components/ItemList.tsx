import ItemRow from './ItemRow';
import React from 'react';

interface ItemProps {
  external_urls: Object;
  followers: Object;
  genres: string[];
  images: Object[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

interface ItemListProps {
  items: ItemProps[];
}

const ItemList: React.FC<ItemListProps> = ({ items }) => {
  const itemsList = items.map((item: any, index: number) => {
    return <ItemRow key={index} info={item} />;
  });
  return <div>{itemsList}</div>;
};

export = ItemList;
