import React, { useEffect, useState } from 'react';
import './App.css';

import math, { OPS } from './utils/math';


const App = () => {
  const [items, setItems] = useState(math());
  const [drag, setDrag] = useState({});
  const [canDrag, setCanDrag] = useState(true);

  const onDragOver = (e) => {
    e.preventDefault();
  };

  let value;
  const [
    int1,
    op1,
    int2,
    op2,
    int3,
    op3,
    int4,
    _equals,
    answer,
  ] = items.map(i => i.value);

  if (OPS[op1] && OPS[op2] && OPS[op3]) {
    value = OPS[op1](int1, int2);
    value = OPS[op2](value, int3);
    value = OPS[op3](value, int4);
  }

  const didWin = value === answer;

  useEffect(() => {
    if (didWin && canDrag) {
      setCanDrag(false);
      setTimeout(
        () => {
          setCanDrag(true);
          setItems(math());
        },
        1000,
      );
    }
  });

  const swapInts = (e, i, j) => {
    e.preventDefault();
    e.stopPropagation();
    if (drag.intIdx === undefined) return;

    const copy = [...items];
    [copy[i], copy[j]] = [copy[j], copy[i]];
    setItems(copy);
  };

  const dropOp = (e, i) => {
    const copy = [...items];
    copy[i].value = drag.op;
    setItems(copy);
  };

  const renderItem = (item, i) => {
    if (item.type === 'int') {
      return (
        <div
          className="box box--int"
          onDragOver={onDragOver}
          onDrop={e => swapInts(e, drag.intIdx, i)}
          key={i}
        >
          <div
            className="box-content"
            draggable={canDrag}
            onDragStart={e => setDrag({ el: e.target, intIdx: i })}
          >
            {item.value}
          </div>
        </div>
      );
    } if (item.type === 'op') {
      return (
        <div
          onDragOver={onDragOver}
          onDrop={e => dropOp(e, i)}
          className="box box--op"
          key={i}
        >
          <div className="box-content">{item.value}</div>
        </div>
      );
    } if (item.type === 'equals') {
      return (
        <div
          className="box box--op box--equals"
          key={i}
        >
          <div className="box-content">=</div>
        </div>
      );
    }

    return (
      <div className="box box--answer" key={i}>
        <div className="box-content">{item.value}</div>
      </div>
    );
  };

  return (
    <div className="wrapper">
      <div className="list list--op">
        {Object.keys(OPS).map(op => (
          <div className="box box--op-top" key={op}>
            <div
              className="box-content"
              draggable={canDrag}
              onDragStart={e => setDrag({ el: e.target, op })}
            >
              {op}
            </div>
          </div>
        ))}
      </div>
      <div className="list list--main">
        {items.map(renderItem)}
      </div>
      <div>{didWin && 'You won!'}</div>
    </div>
  );
};

export default App;
