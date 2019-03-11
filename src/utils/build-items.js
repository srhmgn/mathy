import { OPS, TYPES } from '../constants';
import { getValue } from './calc';

const NO_OP = '';

const randomInt = () => Math.ceil(Math.random() * 8) + 1;

const shuffle = (a) => {
  const copy = [...a];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const pickRandom = items => items[Math.floor(Math.random() * items.length)];

const findAnAnswer = (ints) => {
  const ops = [
    pickRandom(Object.keys(OPS)),
    pickRandom(Object.keys(OPS)),
    pickRandom(Object.keys(OPS)),
  ];

  if (ops.every(op => ['+', '-'].includes(op))) {
    // It's no fun if everything is addition/subtraction
    return false;
  }

  const answer = getValue([
    ints[0],
    ops[0],
    ints[1],
    ops[1],
    ints[2],
    ops[2],
    ints[3],
  ]);

  // answers must be whole nums between 1 and 40
  if (answer % 1 !== 0 || answer < 1 || answer > 40) {
    return false;
  }

  console.log('===Used ', [
    ints[0],
    ops[0],
    ints[1],
    ops[1],
    ints[2],
    ops[2],
    ints[3],
  ], 'to make ', answer);

  return answer;
};

export default () => {
  const ints = [1, 2, 3, 4].map(randomInt);

  let answer = findAnAnswer(ints);
  while (!answer) {
    answer = findAnAnswer(ints);
  }

  const shuffled = shuffle(ints);

  return [
    [
      {
        value: shuffled[0],
        type: TYPES.INT,
      },
      {
        value: NO_OP,
        type: TYPES.OP,
      },
      {
        value: shuffled[1],
        type: TYPES.INT,
      },
      {
        value: NO_OP,
        type: TYPES.OP,
      },
      {
        value: shuffled[2],
        type: TYPES.INT,
      },
      {
        value: NO_OP,
        type: TYPES.OP,
      },
      {
        value: shuffled[3],
        type: TYPES.INT,
      },
    ],
    answer,
  ];
};
