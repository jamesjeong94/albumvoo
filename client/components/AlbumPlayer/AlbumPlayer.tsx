import Draggable from 'react-draggable';
import { AlbumInfoType } from '../../types/spotify';
import React, { useState } from 'react';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

interface AlbumPlayerProps {
  albumInfo: AlbumInfoType;
}

const AlbumPlayer: React.FC<AlbumPlayerProps> = ({ albumInfo }) => {
  const [deltaPosition, setDeltaPosition] = useState({ x: 0, y: 0 });

  const handleDrag = (e: any, ui: any) => {
    const { x, y } = deltaPosition;
    console.log(x, y);
    setDeltaPosition({
      x: 0,
      y: y + ui.deltaY,
    });
  };

  const handleDragEnd = () => {
    const { x, y } = deltaPosition;
    // if (y > -200) {
    //   setDeltaPosition({
    //     x: 0,
    //     y: -300,
    //   });
    // } else {
    //   setDeltaPosition({
    //     x: 0,
    //     y: 0,
    //   });
    // }
    console.log('hello', x, y);
  };

  const albumImage = albumInfo.images ? albumInfo.images[0].url : null;
  return (
    <div className="pullTab">
      <Draggable
        axis="y"
        handle=".handle"
        scale={1}
        position={{ x: deltaPosition.x, y: deltaPosition.y }}
        onDrag={handleDrag}
        onStop={handleDragEnd}
      >
        <div>
          <div className="handle">
            <ArrowDropUpIcon></ArrowDropUpIcon>
          </div>
          <img src={albumImage}></img>
        </div>
      </Draggable>
    </div>
  );
};

export = AlbumPlayer;
