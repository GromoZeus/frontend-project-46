import sortBy from 'lodash/sortBy.js';
import union from 'lodash/union.js';
import isObject from 'lodash/isObject.js';
import readFilePath from './parsers.js';
import getFormat from './formatters/index.js';

export const findDiff = (objA, objB) => {
  const keyA = Object.keys(objA);
  const keyB = Object.keys(objB);
  const allKeys = sortBy(union(keyA, keyB));
  const result = allKeys.reduce((acc, key) => {
    if (isObject(objA[key]) && isObject(objB[key])) {
      const nestedDiff = findDiff(objA[key], objB[key]);
      acc.push({ key, type: 'nested', children: nestedDiff });
    } else if (!keyB.includes(key)) {
      acc.push({ key, type: 'removed', value: objA[key] });
    } else if (!keyA.includes(key)) {
      acc.push({ key, type: 'added', value: objB[key] });
    } else if (objA[key] !== objB[key]) {
      acc.push({
        key, type: 'changed', oldValue: objA[key], newValue: objB[key],
      });
    } else {
      acc.push({ key, type: 'unchanged', value: objA[key] });
    }
    return acc;
  }, []);
  return result;
};

export const genDiff = (filepath1, filepath2, formatStyle) => {
  const diff = findDiff(readFilePath(filepath1), readFilePath(filepath2));
  const showFormat = getFormat(diff, formatStyle);
  return showFormat;
};
