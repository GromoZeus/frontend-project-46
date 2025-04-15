import { findDiff, formatDiff } from '../src/index.js';

describe('findDiff', () => {
  test('should find differences between two flat objects', () => {
    const objA = { a: 1, b: 2, c: 3 };
    const objB = { b: 2, c: 4, d: 5 };
    const expected = [
      { key: 'a', type: 'removed', value: 1 },
      { key: 'b', type: 'unchanged', value: 2 },
      {
        key: 'c', type: 'changed', oldValue: 3, newValue: 4,
      },
      { key: 'd', type: 'added', value: 5 },
    ];
    expect(findDiff(objA, objB)).toEqual(expected);
  });

  test('should handle nested objects', () => {
    const objA = { a: { x: 1, y: 2 }, b: 2 };
    const objB = { a: { x: 1, z: 3 }, b: 3 };
    const expected = [
      {
        key: 'a',
        type: 'nested',
        children: [
          { key: 'x', type: 'unchanged', value: 1 },
          { key: 'y', type: 'removed', value: 2 },
          { key: 'z', type: 'added', value: 3 },
        ],
      },
      {
        key: 'b', type: 'changed', oldValue: 2, newValue: 3,
      },
    ];
    expect(findDiff(objA, objB)).toEqual(expected);
  });

  test('should return empty array for identical objects', () => {
    const objA = { a: 1, b: 2 };
    const objB = { a: 1, b: 2 };
    expect(findDiff(objA, objB)).toEqual([
      { key: 'a', type: 'unchanged', value: 1 },
      { key: 'b', type: 'unchanged', value: 2 },
    ]);
  });
});

describe('formatDiff', () => {
  test('should format differences in stylish format', () => {
    const diff = [
      { key: 'a', type: 'removed', value: 1 },
      { key: 'b', type: 'unchanged', value: 2 },
      {
        key: 'c', type: 'changed', oldValue: 3, newValue: 4,
      },
      { key: 'd', type: 'added', value: 5 },
    ];
    const expected = `{
  - a: 1
    b: 2
  - c: 3
  + c: 4
  + d: 5
}`;
    expect(formatDiff(diff)).toBe(expected);
  });

  test('should format nested differences in stylish format', () => {
    const diff = [
      {
        key: 'a',
        type: 'nested',
        children: [
          { key: 'x', type: 'unchanged', value: 1 },
          { key: 'y', type: 'removed', value: 2 },
          { key: 'z', type: 'added', value: 3 },
        ],
      },
      {
        key: 'b', type: 'changed', oldValue: 2, newValue: 3,
      },
    ];
    const expected = `{
    a: {
        x: 1
      - y: 2
      + z: 3
    }
  - b: 2
  + b: 3
}`;
    expect(formatDiff(diff)).toBe(expected);
  });
});
