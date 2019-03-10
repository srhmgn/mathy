import React, { useState } from 'react';
import './App.css';

import math, { OPS } from './utils/math';

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
      <div className="list list--op">
        {Object.keys(OPS).map(op => (
          <div className="box box--op" key={op}>
            <div className="box-content">{op}</div>
          </div>
        ))}
      </div>
      <div className="list">
        {ints.map((int, i) => (
          <div
            className="box box--int"
            onDragOver={onDragOver}
            onDrop={() => swapInts(dragIdx, i)}
            key={i}
          >
            <div
              className="box-content"
              draggable
              onDragStart={() => setDragIdx(i)}
            >
              {int}
            </div>
          </div>
        ))}
        <div className="box box--answer">
          <div className="box-content">{answer}</div>
        </div>
      </div>
    </div>
  );
};

export default App;
