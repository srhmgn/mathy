/* eslint-disable no-loop-func */
import { OPS, TYPES } from '../constants';

export const getValue = (items) => {
  const hasUndefinedOps = items.some(item => item.type === TYPES.OP && !OPS[item.value]);
  if (hasUndefinedOps) return undefined;

  let didFindParens = true;
  let didFindMultDiv = true;
  let finalItems = [...items];

  while (didFindParens) {
    const tempItems = [];
    let ignoreUntilIdx = 0;
    didFindParens = false;
    finalItems.forEach((item, i) => {
      if (!ignoreUntilIdx) {
        if (item.parenStart) {
          const parenEndIndex = i + finalItems.slice(i).findIndex(x => x.parenEnd);
          ignoreUntilIdx = parenEndIndex + 1;
          tempItems.push({
            type: TYPES.INT,
            value: getValue(finalItems.slice(i, parenEndIndex + 1).map((x) => {
              delete x.parenStart;
              delete x.parenEnd;
              return x;
            })),
          });
          didFindParens = true;
        } else {
          tempItems.push(item);
        }
      } else if (i >= ignoreUntilIdx) {
        tempItems.push(item);
      }
    });
    finalItems = tempItems;
  }

  while (didFindMultDiv) {
    const tempItems = [];
    let ignoreUntilIdx = 0;
    didFindMultDiv = false;
    finalItems.forEach((item, i) => {
      if (!ignoreUntilIdx) {
        const nextVal = finalItems[i + 1] && finalItems[i + 1].value;
        if (nextVal === '×' || nextVal === '÷') {
          tempItems.push({
            type: TYPES.INT,
            value: OPS[nextVal](item.value, finalItems[i + 2].value),
          });
          ignoreUntilIdx = i + 3;
          didFindMultDiv = true;
        } else {
          tempItems.push(item);
        }
      } else if (i >= ignoreUntilIdx) {
        tempItems.push(item);
      }
    });
    finalItems = tempItems;
  }

  let value;

  finalItems.forEach((item, i) => {
    if (i === 0) {
      value = item.value; // eslint-disable-line prefer-destructuring
    } else if (OPS[item.value]) {
      value = OPS[item.value](value, finalItems[i + 1].value);
    }
  });

  return value;
};

export default {
  getValue,
};
