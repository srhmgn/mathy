import { OPS, TYPES } from '../constants';

const NO_OP = '';
const OP_FUNCS = Object.values(OPS);

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
  let answer;
  // let isLame = false;

  const ops = [
    pickRandom(OP_FUNCS),
    pickRandom(OP_FUNCS),
    pickRandom(OP_FUNCS),
  ];

  if (ops.every(op => [OPS['+'], OPS['-'].includes(op)])) {
    // It's no fun if everything is addition/subtraction
    return 0;
  }

  // mult/division
  ints.forEach((int, i) => {
    if (i !== 0) {

    }
  });

  return answer;
};

export default () => {
  const ints = [1, 2, 3, 4].map(randomInt);

  let [answer, ops] = findAnAnswer(ints);
  while (
    answer % 1 !== 0 || answer < 1 || answer > 40
    || ops.every(op => [OPS['+'], OPS['-']].includes(op))
  ) {
    [answer, ops] = findAnAnswer(ints);
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
