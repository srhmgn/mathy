import React, { useEffect, useState } from 'react';
import './App.css';

import buildItems from './utils/build-items';
import { onDragOver } from './utils/drag';
import { getValue } from './utils/calc';
import { OPS, TYPES } from './constants';
import Box from './Box';

const App = () => {
  const [originalItems, originalAnswer] = buildItems();
  const [items, setItems] = useState(originalItems);
  const [answer, setAnswer] = useState(originalAnswer);
  const [drag, setDrag] = useState({});
  const [canDrag, setCanDrag] = useState(true);

  const value = getValue(items);
  const didWin = value === answer;

  useEffect(() => {
    if (didWin) {
      if (canDrag) {
        setCanDrag(false);
      } else {
        setTimeout(
          () => {
            const [newItems, newAnswer] = buildItems();
            setItems(newItems);
            setAnswer(newAnswer);
          },
          1000,
        );
      }
    } else if (!canDrag) {
      setCanDrag(true);
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
    e.preventDefault();
    const copy = [...items];
    copy[i].value = drag.op;
    setItems(copy);
  };

  const renderItem = (item, i) => {
    if (item.type === TYPES.INT) {
      return (
        <Box
          onDragOver={onDragOver}
          onDrop={e => swapInts(e, drag.intIdx, i)}
          key={i}
          draggable={canDrag}
          onDragStart={e => setDrag({ el: e.target, intIdx: i })}
          type={item.type}
        >
          {item.value}
        </Box>
      );
    }
    return (
      <Box
        onDragOver={onDragOver}
        onDrop={e => dropOp(e, i)}
        key={i}
        type={item.type}
      >
        {item.value}
      </Box>
    );
  };

  return (
    <div className="wrapper">
      <div className="list list--op">
        {Object.keys(OPS).map(op => (
          <Box
            draggable={canDrag}
            onDragStart={e => setDrag({ el: e.target, op })}
            key={op}
            type={TYPES.OP}
          >
            {op}
          </Box>
        ))}
      </div>
      <div className="list list--main">
        {items.map(renderItem)}
        <Box type={TYPES.EQUALS}>=</Box>
        <Box type={TYPES.ANSWER}>{answer}</Box>
      </div>
      <div>{didWin && 'You won!'}</div>
    </div>
  );
};

export default App;
