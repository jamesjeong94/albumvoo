import Draggable from 'react-draggable';
import React, { useState } from 'react';

interface AlbumPlayerProps {}

const AlbumPlayer: React.FC<AlbumPlayerProps> = ({}) => {
  const [deltaPosition, setDeltaPosition] = useState();

  const handleDrag = (e, ui) => {};

  return (
    <Draggable
      axis="x"
      handle=".handle"
      defaultPosition={{ x: 0, y: 0 }}
      position={null}
      grid={[25, 25]}
      scale={1}
      onDrag={handleDrag}
    >
      <div>
        <div className="handle">Drag from here</div>
        <div>This readme is really dragging on...</div>
      </div>
    </Draggable>
  );
};

export = AlbumPlayer;
