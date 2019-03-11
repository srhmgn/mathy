import { TYPES } from '../constants';
import { getValue } from './calc';

describe('getValue', () => {
  it('respects pemdas - 1 + 2 * 3 + 4', () => {
    expect(getValue([
      1,
      '+',
      2,
      '×',
      3,
      '+',
      4,
    ])).toBe(11);
  });

  it('respects pemdas - 3 * 3 + 4 / 4', () => {
    expect(getValue([
      3,
      '×',
      3,
      '+',
      4,
      '÷',
      4,
    ])).toBe(10);
  });

  it('respects pemdas - 5 * 5 - 4 * 4', () => {
    expect(getValue([
      5,
      '×',
      5,
      '-',
      4,
      '×',
      4,
    ])).toBe(9);
  });

  it('respects pemdas - 2 * 2 * 2 * 2', () => {
    expect(getValue([
      2,
      '×',
      2,
      '×',
      2,
      '×',
      2,
    ])).toBe(16);
  });

  it('respects pemdas - 4 * 4 / 2 * 2', () => {
    expect(getValue([
      4,
      '×',
      4,
      '÷',
      2,
      '×',
      2,
    ])).toBe(16);
  });
});
