import { readFileSync } from 'fs';
import { resolve, isAbsolute, extname } from 'path';
import { cwd } from 'process';
import { load } from 'js-yaml';

export default (file) => {
  try {
    const path = isAbsolute(file) ? file : resolve(cwd(), file);
    const context = readFileSync(path, 'utf8');
    const ext = extname(file);
    if (ext === '.json') {
      return isAbsolute(file) ? JSON.parse(context)
        : JSON.parse(context);
    }
    if (ext === '.yaml' || ext === '.yml') {
      return (isAbsolute(file) ? load(context)
        : load(context)) ?? '';
    }
  } catch (error) {
    console.error(`Error reading file: ${error.message}`);
    return 0;
  }
  return null;
};
