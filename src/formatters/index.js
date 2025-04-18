import stylishFormatter from './stylish.js';
import plainFormatter from './plain.js';
import jsonFormatter from './json.js';

export default (diff, format = 'stylish') => {
  switch (format) {
    case 'stylish':
      return `{\n${stylishFormatter(diff)}\n}`;
    case 'plain':
      return plainFormatter(diff);
    case 'json':
      return jsonFormatter(diff);
    default:
      throw new Error(`Unknown format: ${format}`);
  }
};
