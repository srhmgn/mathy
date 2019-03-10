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
  const defaultItems = [
    ...originalInts.map(value => ({ value, type: 'int' })),
    { value: answer, type: 'answer' },
  ];
  const [items, setItems] = useState(defaultItems);
  const [drag, setDrag] = useState({});

  const swapInts = (e, i, j) => {
    e.preventDefault();
    e.stopPropagation();
    if (drag.intIdx === undefined) return;

    const copy = [...items];
    [copy[i], copy[j]] = [copy[j], copy[i]];
    setItems(copy);
  };

  // todo better name for this func
  // todo dont allow two ops in a row
  const onListDrop = (e) => {
    e.preventDefault();

    if (drag.op) {
      const foundEl = Array.from(document.querySelectorAll('.box--int, .box--answer')).find(el => (
        el.getBoundingClientRect().right > e.clientX
      ));
      const copy = [...items];
      copy.splice(foundEl.dataset.i, 0, { value: drag.op, type: 'op' });
      setItems(copy);
    }
  };

  const renderItem = (item, i) => {
    if (item.type === 'int') {
      return (
        <div
          className="box box--int"
          data-i={i}
          onDragOver={onDragOver}
          onDrop={e => swapInts(e, drag.intIdx, i)}
          key={i}
        >
          <div
            className="box-content"
            draggable
            onDragStart={e => setDrag({ el: e.target, intIdx: i })}
          >
            {item.value}
          </div>
        </div>
      );
    } if (item.type === 'op') {
      return (
        <div className="box box--op" data-i={i} key={i}>
          <div className="box-content">{item.value}</div>
        </div>
      );
    }

    return (
      <div className="box box--answer" data-i={i} key={i}>
        <div className="box-content">{item.value}</div>
      </div>
    );
  };

  return (
    <div className="wrapper">
      <div className="list list--op">
        {Object.keys(OPS).map(op => (
          <div className="box box--op top--op-top" key={op}>
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
        {items.map(renderItem)}
      </div>
    </div>
  );
};

export default App;
