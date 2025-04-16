import isObject from 'lodash/isObject.js';

const formatValue = (value, depth = 1) => {
  if (isObject(value)) {
    const nestedIndent = '  '.repeat(depth + 3);
    const bracketIndent = '  '.repeat(depth);
    const entries = Object.entries(value)
      .map(([key, val]) => `${nestedIndent}${key}: ${formatValue(val, depth + 2)}`);
    return `{\n${entries.join('\n')}\n${bracketIndent}  }`;
  }
  return value;
};

const stylishFormatter = (diff, depth = 1) => {
  const nestedIndent = '  '.repeat(depth);
  const lines = diff.map((item) => {
    switch (item.type) {
      case 'nested':
        return `${nestedIndent}  ${item.key}: {\n${stylishFormatter(item.children, depth + 2)}\n${nestedIndent}  }`;
      case 'removed':
        return `${nestedIndent}- ${item.key}: ${formatValue(item.value)}`;
      case 'added':
        return `${nestedIndent}+ ${item.key}: ${formatValue(item.value)}`;
      case 'changed':
        return `${nestedIndent}- ${item.key}: ${formatValue(item.oldValue)}\n${nestedIndent}+ ${item.key}: ${formatValue(item.newValue)}`;
      case 'unchanged':
        return `${nestedIndent}  ${item.key}: ${formatValue(item.value)}`;
      default:
        return '';
    }
  });

  return lines.join('\n');
};

export default stylishFormatter;
