import { OPS } from '../constants';

export const getValueAndAnswer = (items) => {
  let value;
  const [
    int1,
    op1,
    int2,
    op2,
    int3,
    op3,
    int4,
    answer,
  ] = items.map(i => i.value);

  if (OPS[op1] && OPS[op2] && OPS[op3]) {
    value = OPS[op1](int1, int2);
    value = OPS[op2](value, int3);
    value = OPS[op3](value, int4);
  }

  return [value, answer];
};

export default {
  getValueAndAnswer,
};
