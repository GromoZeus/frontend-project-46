import _ from 'lodash';

const findDiff = (objA, objB) => {
  const keyA = Object.keys(objA);
  const keyB = Object.keys(objB);
  const allKeys = _.sortBy(_.union(keyA, keyB));
  const result = allKeys.reduce((acc, key) => {
    if (_.isObject(objA[key]) && _.isObject(objB[key])) {
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

const formatDiff = (diff, format = 'stylish') => {
  const stylishFormatter = (data, depth = 1) => {
    const indentSize = '  '.repeat(depth);
    const formatValue = (value, valdepth = depth) => {
      if (_.isObject(value)) {
        const nestedIndent = '  '.repeat(valdepth + 3);
        const bracketIndent = '  '.repeat(valdepth);
        const entries = Object.entries(value)
          .map(([key, val]) => `${nestedIndent}${key}: ${formatValue(val, valdepth + 2)}`);
        return `{\n${entries.join('\n')}\n${bracketIndent}  }`;
      }
      return value;
    };

    const lines = data.map((item) => {
      switch (item.type) {
        case 'nested':
          return `${indentSize}  ${item.key}: {\n${stylishFormatter(item.children, depth + 2)}\n${indentSize}  }`;
        case 'removed':
          return `${indentSize}- ${item.key}: ${formatValue(item.value)}`;
        case 'added':
          return `${indentSize}+ ${item.key}: ${formatValue(item.value)}`;
        case 'changed':
          return `${indentSize}- ${item.key}: ${formatValue(item.oldValue)}\n${indentSize}+ ${item.key}: ${formatValue(item.newValue)}`;
        case 'unchanged':
          return `${indentSize}  ${item.key}: ${formatValue(item.value)}`;
        default:
          return '';
      }
    });

    return lines.join('\n');
  };
  switch (format) {
    case 'stylish':
      return `{\n${stylishFormatter(diff)}\n}`;
    // case 'plain':
    //   return plainFormatter(diff);
    // case 'json':
    //   return jsonFormatter(diff);
    default:
      throw new Error(`Unknown format: ${format}`);
  }
};

export { findDiff, formatDiff };
