import getCalcDiff from '../src/index.js';

describe('getCalcDiff', () => {
  test('different JSON files', () => {
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

  test('equal JSON files', () => {
    const objA = { a: 1, b: 2 };
    const objB = { a: 1, b: 2 };
    const expected = `{
    a: 1
    b: 2
}`;
    expect(getCalcDiff(objA, objB)).toBe(expected);
  });

  test('the second JSON file is empty', () => {
    const objA = { a: 1, b: 2 };
    const objB = {};
    const expected = `{
  - a: 1
  - b: 2
}`;
    expect(getCalcDiff(objA, objB)).toBe(expected);
  });

  test('the first JSON file is empty', () => {
    const objA = {};
    const objB = { a: 1, b: 2 };
    const expected = `{
  + a: 1
  + b: 2
}`;
    expect(getCalcDiff(objA, objB)).toBe(expected);
  });

  test('both JSON files are empty', () => {
    const objA = {};
    const objB = {};
    const expected = `{
}`;
    expect(getCalcDiff(objA, objB)).toBe(expected);
  });
});
