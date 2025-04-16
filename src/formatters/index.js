import stylishFormatter from './stylish.js';
import plainFormatter from './plain.js';

export default (diff, format = 'stylish') => {
  switch (format) {
    case 'stylish':
      return `{\n${stylishFormatter(diff)}\n}`;
    case 'plain':
      return plainFormatter(diff);
    // case 'json':
    //   return jsonFormatter(diff);
    default:
      throw new Error(`Unknown format: ${format}`);
  }
};

// export default getFormat;
