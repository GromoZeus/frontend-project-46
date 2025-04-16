import isObject from 'lodash/isObject.js';

const formatValue = (value) => {
  if (isObject(value)) {
    return '[complex value]';
  }
  return typeof value === 'string' ? `'${value}'` : value;
};

const plainFormatter = (diff, path = '') => {
  const lines = diff.map((item) => {
    const currentPath = path ? `${path}.${item.key}` : item.key;
    switch (item.type) {
      case 'nested':
        return plainFormatter(item.children, currentPath);
      case 'removed':
        return `Property '${currentPath}' was removed`;
      case 'added':
        return `Property '${currentPath}' was added with value: ${formatValue(item.value)}`;
      case 'changed':
        return `Property '${currentPath}' was updated. From ${formatValue(item.oldValue)} to ${formatValue(item.newValue)}`;
      case 'unchanged':
        return null;
      default:
        return '';
    }
  });

  return lines.filter(Boolean).join('\n');
};

export default plainFormatter;
