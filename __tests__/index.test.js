import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { findDiff, genDiff } from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

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

describe('genDiff', () => {
  test('diff in stylish format', () => {
    const filepath1 = getFixturePath('file3.json');
    const filepath2 = getFixturePath('file4.json');
    const expected = readFile('expected_stylish.txt');
    const result = genDiff(filepath1, filepath2, 'stylish');
    expect(result).toBe(expected);
  });

  test('diff in plain format', () => {
    const filepath1 = getFixturePath('file3.yml');
    const filepath2 = getFixturePath('file4.yml');
    const expected = readFile('expected_plain.txt');
    const result = genDiff(filepath1, filepath2, 'plain');
    expect(result).toBe(expected);
  });

  test('diff in json format', () => {
    const filepath1 = getFixturePath('file3.yml');
    const filepath2 = getFixturePath('file4.yml');
    const expected = readFile('expected_json.txt');
    const result = genDiff(filepath1, filepath2, 'json');
    expect(result).toBe(expected);
  });

  test('diff with an empty file', () => {
    const filepath1 = getFixturePath('file1.yml');
    const filepath2 = getFixturePath('empty.json');
    const expected = readFile('expected_secondempty.txt');
    const result = genDiff(filepath1, filepath2);
    expect(result).toBe(expected);
  });
  test('diff with two empty files', () => {
    const filepath1 = getFixturePath('empty.yml');
    const filepath2 = getFixturePath('empty.json');
    const result = genDiff(filepath1, filepath2, 'plain');
    expect(result).toBe('');
  });
});
