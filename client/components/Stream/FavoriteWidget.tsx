import React, { useState } from 'react';
import { Favorite, FavoriteBorder } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';

interface FavoriteWidgetProps {
  isSaved: boolean;
}

const FavoriteWidget: React.FC<FavoriteWidgetProps> = ({ isSaved }) => {
  const [saveState, setSaveState] = useState(isSaved);
  const shownIcon = saveState ? (
    <IconButton
      onClick={() => {
        console.log('unfavorite');
        setSaveState(false);
      }}
    >
      <Favorite fontSize="small"></Favorite>
    </IconButton>
  ) : (
    <IconButton
      onClick={() => {
        console.log('favorite');
        setSaveState(true);
      }}
    >
      <FavoriteBorder fontSize="small"></FavoriteBorder>
    </IconButton>
  );

  return <div>{shownIcon}</div>;
};

export = FavoriteWidget;
