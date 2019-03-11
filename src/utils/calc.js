/* eslint-disable no-loop-func */
import { OPS } from '../constants';

export const getValue = (values) => {
  const op1 = values[1];
  const op2 = values[3];
  const op3 = values[5];

  if (!(OPS[op1] && OPS[op2] && OPS[op3])) {
    return undefined;
  }

  let didFindMultDiv = true;
  let finalValues = [...values];

  while (didFindMultDiv) {
    const tmpValues = [];
    let ignoreUntilIdx = 0;
    didFindMultDiv = false;
    finalValues.forEach((val, i) => {
      const nextVal = finalValues[i + 1];
      if (!ignoreUntilIdx) {
        if (nextVal === '×' || nextVal === '÷') {
          tmpValues.push(OPS[nextVal](val, finalValues[i + 2]));
          ignoreUntilIdx = i + 3;
          didFindMultDiv = true;
        } else {
          tmpValues.push(val);
        }
      } else if (i >= ignoreUntilIdx) {
        tmpValues.push(val);
      }
    });
    finalValues = tmpValues;
  }

  let value;

  finalValues.forEach((val, i) => {
    if (i === 0) {
      value = val;
    } else if (OPS[val]) {
      value = OPS[val](value, finalValues[i + 1]);
    }
  });

  return value;
};

export default {
  getValue,
};
