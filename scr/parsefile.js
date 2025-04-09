import { readFileSync } from 'fs';
import { resolve, isAbsolute } from 'path';
import { cwd } from 'process';

export default (file) => {
  let fullPath = '';
  if (isAbsolute(file)) {
    fullPath = file;
  } else {
    fullPath = resolve(cwd(), file);
  }
  try {
    return JSON.parse(readFileSync(fullPath, 'utf8'));
  } catch (error) {
    console.error(`Error reading file: ${error.message}`);
    return null;
  }
};
