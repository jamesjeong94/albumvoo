import Draggable from 'react-draggable';
import { AlbumInfoType } from '../../types/spotify';
import React, { useState } from 'react';

interface AlbumPlayerProps {
  albumInfo: AlbumInfoType;
}

const AlbumPlayer: React.FC<AlbumPlayerProps> = ({ albumInfo }) => {
  const [deltaPosition, setDeltaPosition] = useState({ x: 0, y: 0 });

  const handleDrag = (e: any, ui: any) => {
    const { x, y } = deltaPosition;
    setDeltaPosition({
      x: x + ui.deltaX,
      y: y + ui.deltaY,
    });
  };

  const albumImage = albumInfo.images ? albumInfo.images[0].url : null;
  return (
    <div className="pullTab">
      <Draggable
        axis="y"
        handle=".handle"
        defaultPosition={{ x: 0, y: 0 }}
        scale={1}
        onDrag={handleDrag}
      >
        <div>
          <div className="handle">Drag from here</div>
          <img src={albumImage}></img>
        </div>
      </Draggable>
    </div>
  );
};

export = AlbumPlayer;
