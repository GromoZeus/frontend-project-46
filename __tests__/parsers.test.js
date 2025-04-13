import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { load } from 'js-yaml';
import parseFile from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

describe('parseFile', () => {
  test('parse absolute JSON path', () => {
    const filePath = getFixturePath('file1.json');
    const expected = JSON.parse(readFile('file1.json'));
    const result = parseFile(filePath);
    expect(result).toEqual(expected);
  });

  test('parse relative JSON path', () => {
    const relativePath = '__fixtures__/file2.json';
    const expected = JSON.parse(readFile('file2.json'));
    const result = parseFile(relativePath);
    expect(result).toEqual(expected);
  });

  test('parse absolute YAML path', () => {
    const filePath = getFixturePath('file1.yml');
    const expected = load(readFile('file1.yml'));
    const result = parseFile(filePath);
    expect(result).toEqual(expected);
  });

  test('parse relative YAML path', () => {
    const relativePath = '__fixtures__/file2.yml';
    const expected = load(readFile('file2.yml'));
    const result = parseFile(relativePath);
    expect(result).toEqual(expected);
  });

  test('parse empty JSON file', () => {
    const filePath = getFixturePath('empty.json');
    const result = parseFile(filePath);
    expect(result).toBe(0);
  });

  test('parse empty YAML file', () => {
    const filePath = getFixturePath('empty.yml');
    const result = parseFile(filePath);
    expect(result).toBe('');
  });

  test('parse invalid JSON file', () => {
    const filePath = getFixturePath('invalid.json');
    const result = parseFile(filePath);
    expect(result).toBe(0);
  });

  test('parse invalid YAML file', () => {
    const filePath = getFixturePath('invalid.yaml');
    const result = parseFile(filePath);
    expect(result).toBe(0);
  });

  test('parse unsupported file extension', () => {
    const filePath = getFixturePath('file3.txt');
    const result = parseFile(filePath);
    expect(result).toBe(0);
  });
});
