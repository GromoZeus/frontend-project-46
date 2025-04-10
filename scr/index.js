import _ from 'lodash';

export default (objA, objB) => {
  const keyA = Object.keys(objA);
  const keyB = Object.keys(objB);
  const allKeys = _.sortBy(_.union(keyA, keyB));
  const result = allKeys.reduce((acc, key) => {
    if (!keyB.includes(key)) {
      acc.push(`  - ${key}: ${objA[key]}`);
    } else if (!keyA.includes(key)) {
      acc.push(`  + ${key}: ${objB[key]}`);
    } else if (objA[key] !== objB[key]) {
      acc.push(`  - ${key}: ${objA[key]}`, `  + ${key}: ${objB[key]}`);
    } else if (objA[key] === objB[key]) {
      acc.push(`    ${key}: ${objA[key]}`);
    }
    return acc;
  }, []);
  return `{\n${result.join('\n')}\n}`;
};
