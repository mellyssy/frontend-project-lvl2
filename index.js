import fs from 'fs';
import path from 'path';
import parse from './src/parsers.js';
import buildDiffTree from './src/diffBuilder.js';
import format from './src/formatters/index.js';

const getFileFormat = (filepath) => path.extname(filepath).slice(1);
const readFile = (filepath) => fs.readFileSync(filepath, 'utf-8');

const gendiff = (pathToFile1, pathToFile2, outputFormat = 'stylish') => {
  const parsedFile1 = parse(readFile(pathToFile1), getFileFormat(pathToFile1));
  const parsedFile2 = parse(readFile(pathToFile2), getFileFormat(pathToFile2));

  const tree = buildDiffTree(parsedFile1, parsedFile2);
  const formattedResult = format(tree, outputFormat);

  return formattedResult;
};

export default gendiff;
