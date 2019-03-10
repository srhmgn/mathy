import { OPS } from '../constants';

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
  let answer = ints[0];

  ints.forEach((int, i) => {
    if (i !== 0) {
      answer = pickRandom(OP_FUNCS)(answer, int);
    }
  });

  return answer;
};

export default () => {
  const ints = [1, 2, 3, 4].map(randomInt);

  let answer = findAnAnswer(ints);
  while (answer % 1 !== 0 || answer < 1 || answer > 40) {
    answer = findAnAnswer(ints);
  }

  const shuffled = shuffle(ints);

  return [
    {
      value: shuffled[0],
      type: 'int',
    },
    {
      value: NO_OP,
      type: 'op',
    },
    {
      value: shuffled[1],
      type: 'int',
    },
    {
      value: NO_OP,
      type: 'op',
    },
    {
      value: shuffled[2],
      type: 'int',
    },
    {
      value: NO_OP,
      type: 'op',
    },
    {
      value: shuffled[3],
      type: 'int',
    },
    {
      value: answer,
      type: 'answer',
    },
  ];
};
