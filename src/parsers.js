import { readFileSync } from 'fs';
import { resolve, isAbsolute, extname } from 'path';
import { cwd } from 'process';
import { load } from 'js-yaml';

export default (file) => {
  try {
    const absPath = readFileSync(file, 'utf8');
    const relPath = readFileSync(resolve(cwd(), file), 'utf8');
    const ext = extname(file);
    if (ext === '.json') {
    return isAbsolute(file) ? JSON.parse(absPath)
      : JSON.parse(relPath);
    } else if (ext === '.yaml' || ext === '.yml') {
      return isAbsolute(file) ? load(absPath)
      : load(relPath);
    }
  } catch (error) {
    console.error(`Error reading file: ${error.message}`);
    return null;
  }
};
