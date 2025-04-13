import { load } from 'js-yaml';
import getCalcDiff from '../src/index.js';

describe('getCalcDiff', () => {
  test('different files', () => {
    const objA = { a: 1, b: 2, c: 3 };
    const objB = { b: 2, c: 4, d: 5 };
    const expected = `{
  - a: 1
    b: 2
  - c: 3
  + c: 4
  + d: 5
}`;
    expect(getCalcDiff(objA, objB)).toBe(expected);
  });

  test('equal files', () => {
    const objA = { a: 1, b: 2 };
    const objB = { a: 1, b: 2 };
    const expected = `{
    a: 1
    b: 2
}`;
    expect(getCalcDiff(objA, objB)).toBe(expected);
  });

  test('the second object is empty', () => {
    const objA = { a: 1, b: 2 };
    const objB = {};
    const expected = `{
  - a: 1
  - b: 2
}`;
    expect(getCalcDiff(objA, objB)).toBe(expected);
  });

  test('the first object is empty', () => {
    const objA = {};
    const objB = { a: 1, b: 2 };
    const expected = `{
  + a: 1
  + b: 2
}`;
    expect(getCalcDiff(objA, objB)).toBe(expected);
  });

  test('both objects are empty', () => {
    const objA = {};
    const objB = {};
    const expected = `{
}`;
    expect(getCalcDiff(objA, objB)).toBe(expected);
  });

  test('different JSON-YMAL files', () => {
    const objA = JSON.parse(JSON.stringify({ a: 1, b: 2, c: 3 }));
    const objB = load(`
    b: 2
    c: 4
    d: 5
    `);
    const expected = `{
  - a: 1
    b: 2
  - c: 3
  + c: 4
  + d: 5
}`;
    expect(getCalcDiff(objA, objB)).toBe(expected);
  });

  test('both files are empty', () => {
    const objA = '';
    const objB = 0;
    const expected = `{
}`;
    expect(getCalcDiff(objA, objB)).toBe(expected);
  });
});
