import { TYPES } from '../constants';
import { getValue } from './calc';

describe('getValue', () => {
  it('respects pemdas - 1 + 2 * 3 + 4', () => {
    expect(getValue([
      {
        value: 1,
        type: TYPES.INT,
      },
      {
        value: '+',
        type: TYPES.OP,
      },
      {
        value: 2,
        type: TYPES.INT,
      },
      {
        value: '×',
        type: TYPES.OP,
      },
      {
        value: 3,
        type: TYPES.INT,
      },
      {
        value: '+',
        type: TYPES.OP,
      },
      {
        value: 4,
        type: TYPES.INT,
      },
    ])).toBe(11);
  });

  it('respects pemdas - 3 * 3 + 4 / 4', () => {
    expect(getValue([
      {
        value: 3,
        type: TYPES.INT,
      },
      {
        value: '×',
        type: TYPES.OP,
      },
      {
        value: 3,
        type: TYPES.INT,
      },
      {
        value: '+',
        type: TYPES.OP,
      },
      {
        value: 4,
        type: TYPES.INT,
      },
      {
        value: '÷',
        type: TYPES.OP,
      },
      {
        value: 4,
        type: TYPES.INT,
      },
    ])).toBe(10);
  });

  it('respects pemdas - 5 * 5 - 4 * 4', () => {
    expect(getValue([
      {
        value: 5,
        type: TYPES.INT,
      },
      {
        value: '×',
        type: TYPES.OP,
      },
      {
        value: 5,
        type: TYPES.INT,
      },
      {
        value: '-',
        type: TYPES.OP,
      },
      {
        value: 4,
        type: TYPES.INT,
      },
      {
        value: '×',
        type: TYPES.OP,
      },
      {
        value: 4,
        type: TYPES.INT,
      },
    ])).toBe(9);
  });

  it('respects pemdas - 2 * 2 * 2 * 2', () => {
    expect(getValue([
      {
        value: 2,
        type: TYPES.INT,
      },
      {
        value: '×',
        type: TYPES.OP,
      },
      {
        value: 2,
        type: TYPES.INT,
      },
      {
        value: '×',
        type: TYPES.OP,
      },
      {
        value: 2,
        type: TYPES.INT,
      },
      {
        value: '×',
        type: TYPES.OP,
      },
      {
        value: 2,
        type: TYPES.INT,
      },
    ])).toBe(16);
  });

  it('respects pemdas - 4 * 4 / 2 * 2', () => {
    expect(getValue([
      {
        value: 4,
        type: TYPES.INT,
      },
      {
        value: '×',
        type: TYPES.OP,
      },
      {
        value: 4,
        type: TYPES.INT,
      },
      {
        value: '÷',
        type: TYPES.OP,
      },
      {
        value: 2,
        type: TYPES.INT,
      },
      {
        value: '×',
        type: TYPES.OP,
      },
      {
        value: 2,
        type: TYPES.INT,
      },
    ])).toBe(16);
  });
});
