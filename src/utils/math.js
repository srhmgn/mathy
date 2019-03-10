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

const add = (x, y) => x + y;
const subtract = (x, y) => x - y;
const multiply = (x, y) => x * y;
const divide = (x, y) => x / y;

export const OPS = {
  add,
  subtract,
  multiply,
  divide,
};

const OP_FUNCS = Object.values(OPS);

const findAnAnswer = (ints) => {
  let answer = ints[0];

  ints.forEach((int, i) => {
    if (i !== 0) {
      answer = pickRandom(OP_FUNCS)(answer, int);
    }
  });

  return answer;
};

const math = () => {
  const ints = [1, 2, 3, 4].map(randomInt);

  let answer = findAnAnswer(ints);
  while (answer % 1 !== 0 || answer < 1 || answer > 40) {
    answer = findAnAnswer(ints);
  }

  return [shuffle(ints), answer];
};

export default math;
