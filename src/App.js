import React, { useState } from 'react';
import './App.css';

import math, { OPS } from './utils/math';

const [originalInts, answer] = math();

const onDragOver = (e) => {
  // console.log(e.currentTarget.dataset);
  // return false;
  e.preventDefault();
};

const App = () => {
  const [ints, setInts] = useState(originalInts);
  const [drag, setDrag] = useState({});

  const swapInts = (e, i, j) => {
    e.preventDefault();
    if (drag.intIdx === undefined) return;

    e.stopPropagation();
    console.log('swapInts');
    const copy = [...ints];
    [copy[i], copy[j]] = [copy[j], copy[i]];
    setInts(copy);
  };

  const onListDrop = (e) => {
    e.preventDefault();
    console.log('onListDrop');
  };

  return (
    <div className="wrapper">
      <div className="list list--op">
        {Object.keys(OPS).map(op => (
          <div className="box box--op" key={op}>
            <div
              className="box-content"
              draggable
              onDragStart={e => setDrag({ el: e.target, op })}
            >
              {op}

            </div>
          </div>
        ))}
      </div>
      <div
        className="list"
        onDragOver={onDragOver}
        onDrop={onListDrop}
      >
        {ints.map((int, i) => (
          <div
            className="box box--int"
            onDragOver={onDragOver}
            onDrop={e => swapInts(e, drag.intIdx, i)}
            key={i}
          >
            <div
              className="box-content"
              data-int
              draggable
              onDragStart={e => setDrag({ el: e.target, intIdx: i })}
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
