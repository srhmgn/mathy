const add = (x, y) => x + y;
const subtract = (x, y) => x - y;
const multiply = (x, y) => x * y;
const divide = (x, y) => x / y;

export const OPS = {
  '+': add,
  '-': subtract,
  '×': multiply,
  '÷': divide,
};

export const TYPES = {
  INT: 'int',
  OP: 'op',
  ANSWER: 'answer',
};
