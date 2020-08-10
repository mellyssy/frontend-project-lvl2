import fs from 'fs';
import path from 'path';
import parseData from './src/parsers/index.js';
import buildDiffTree from './src/diffBuilder.js';
import formatter from './src/formatters/index.js';

const getFormat = (filepath) => path.extname(filepath).slice(1);
const getContent = (filepath) => fs.readFileSync(filepath, 'utf-8');

const gendiff = (pathToFile1, pathToFile2, format) => {
  const parsedFile1 = parseData(getContent(pathToFile1), getFormat(pathToFile1));
  const parsedFile2 = parseData(getContent(pathToFile2), getFormat(pathToFile2));

  const tree = buildDiffTree(parsedFile1, parsedFile2);
  const formattedResult = formatter(tree, format);

  return formattedResult;
};

export default gendiff;
