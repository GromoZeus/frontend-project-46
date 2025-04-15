#!/usr/bin/env node
import { Command } from 'commander';
import readFilePath from '../src/parsers.js';
import { findDiff, formatDiff } from '../src/index.js';

const program = new Command();
program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0', '-V, --version', 'output the version number')
  .option('-f, --format [type]', 'output format', 'stylish')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => {
    const [fileData1, fileData2] = [readFilePath(filepath1), readFilePath(filepath2)];
    console.log(formatDiff(findDiff(fileData1, fileData2)));
  });

program.parse();
