/* eslint-disable no-loop-func */
import { OPS } from '../constants';

export const getValue = (items) => {
  const values = items.map(i => i.value);
  const op1 = values[1];
  const op2 = values[3];
  const op3 = values[5];

  if (!(OPS[op1] && OPS[op2] && OPS[op3])) {
    return undefined;
  }

  let didFindMultDiv = true;
  let finalNewValues = [...values];

  while (didFindMultDiv) {
    const newValues = [];
    let ignoreUntilIdx = 0;
    didFindMultDiv = false;
    finalNewValues.forEach((val, i) => {
      const nextVal = finalNewValues[i + 1];
      if (!ignoreUntilIdx) {
        if (nextVal === '×' || nextVal === '÷') {
          newValues.push(OPS[nextVal](val, finalNewValues[i + 2]));
          ignoreUntilIdx = i + 3;
          didFindMultDiv = true;
        } else {
          newValues.push(val);
        }
      } else if (i >= ignoreUntilIdx) {
        newValues.push(val);
      }
    });
    finalNewValues = newValues;
  }

  let value;

  finalNewValues.forEach((val, i) => {
    if (i === 0) {
      value = val;
    } else if (OPS[val]) {
      value = OPS[val](value, finalNewValues[i + 1]);
    }
  });

  return value;
};

export default {
  getValue,
};
