import React, { useState } from 'react';
import './App.css';

import math from './utils/math';

const [originalInts, answer] = math();

const onDragOver = e => e.preventDefault();

const App = () => {
  const [ints, setInts] = useState(originalInts);
  const [dragIdx, setDragIdx] = useState();

  const swapInts = (i, j) => {
    const copy = [...ints];
    [copy[i], copy[j]] = [copy[j], copy[i]];
    setInts(copy);
  };

  return (
    <div className="wrapper">
      {ints.map((int, i) => (
        <div
          className="box box--int"
          onDragOver={onDragOver}
          onDrop={() => swapInts(dragIdx, i)}
          key={i}
        >
          <div
            className="box-inner"
            draggable
            onDragStart={() => setDragIdx(i)}
          >
            {int}
          </div>
        </div>
      ))}
      <div className="box box--answer">
        <div className="box-inner">{answer}</div>
      </div>
    </div>
  );
};

export default App;
