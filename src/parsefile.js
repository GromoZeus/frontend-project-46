import { readFileSync } from 'fs';
import { resolve, isAbsolute } from 'path';
import { cwd } from 'process';

export default (file) => {
  try {
    return isAbsolute(file) ? JSON.parse(readFileSync(file, 'utf8'))
      : JSON.parse(readFileSync(resolve(cwd(), file), 'utf8'));
  } catch (error) {
    console.error(`Error reading file: ${error.message}`);
    return null;
  }
};
