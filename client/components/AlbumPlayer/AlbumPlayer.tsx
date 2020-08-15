import Draggable from 'react-draggable';
import React, { useState } from 'react';

interface AlbumPlayerProps {}

const AlbumPlayer: React.FC<AlbumPlayerProps> = ({}) => {
  const [deltaPosition, setDeltaPosition] = useState({ x: 0, y: 0 });

  const handleDrag = (e: any, ui: any) => {
    const { x, y } = deltaPosition;
    setDeltaPosition({
      x: x + ui.deltaX,
      y: y + ui.deltaY,
    });
  };

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
          <div>This readme is really dragging on...</div>
        </div>
      </Draggable>
    </div>
  );
};

export = AlbumPlayer;
