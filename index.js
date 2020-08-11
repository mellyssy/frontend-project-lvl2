import fs from 'fs';
import path from 'path';
import parseData from './src/parsers.js';
import buildDiffTree from './src/diffBuilder.js';
import formatTree from './src/formatters/index.js';

const getFileFormat = (filepath) => path.extname(filepath).slice(1);
const readFile = (filepath) => fs.readFileSync(filepath, 'utf-8');

const gendiff = (pathToFile1, pathToFile2, format) => {
  const parsedFile1 = parseData(readFile(pathToFile1), getFileFormat(pathToFile1));
  const parsedFile2 = parseData(readFile(pathToFile2), getFileFormat(pathToFile2));

  const tree = buildDiffTree(parsedFile1, parsedFile2);
  const formattedResult = formatTree(tree, format);

  return formattedResult;
};

export default gendiff;
