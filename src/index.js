import fs from 'fs';
import path from 'path';
import parseData from './parsers/index.js';
import getDiffTree from './getDiffTree.js';
import formatter from './formatters/index.js';

const getFile = (filepath) => {
  const extension = path.extname(filepath);
  const file = fs.readFileSync(filepath, 'utf-8');
  return [file, extension];
};

const gendiff = (pathToFile1, pathToFile2, format) => {
  const [parsedFile1, parsedFile2] = [
    parseData(getFile(pathToFile1)),
    parseData(getFile(pathToFile2)),
  ];

  const tree = getDiffTree(parsedFile1, parsedFile2);
  const formattedResult = formatter(tree, format);

  return formattedResult;
};

export default gendiff;
