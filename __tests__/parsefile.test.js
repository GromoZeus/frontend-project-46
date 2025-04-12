import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import parseFile from '../src/parsefile.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

describe('parseFile', () => {
  test('parse absolute path', () => {
    const filePath = getFixturePath('file1.json');
    const expected = JSON.parse(readFile('file1.json'));
    const result = parseFile(filePath);
    expect(result).toEqual(expected);
  });

  test('parse relative path', () => {
    const relativePath = '__fixtures__/file2.json';
    const expected = JSON.parse(readFile('file2.json'));
    const result = parseFile(relativePath);
    expect(result).toEqual(expected);
  });

  test('parse a non-existing file', () => {
    const invalidFilePath = getFixturePath('invalid.json');
    const result = parseFile(invalidFilePath);
    expect(result).toBeNull();
  });
});
