import React from 'react';
import './Box.css';

const Box = ({
  children,
  draggable,
  onDragOver,
  onDragStart,
  onDrop,
  type,
}) => (
  <div
    className={`box box--${type}`}
    onDragOver={onDragOver}
    onDrop={onDrop}
  >
    <div
      className="box-content"
      draggable={draggable}
      onDragStart={onDragStart}
    >
      {children}
    </div>
  </div>
);

export default Box;
