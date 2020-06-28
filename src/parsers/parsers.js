import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const parseData = (pathToFile1, pathToFile2) => {
  const extension = path.extname(pathToFile1);
  let before;
  let after;
  switch (extension) {
    case '.json':
      before = JSON.parse(fs.readFileSync(pathToFile1));
      after = JSON.parse(fs.readFileSync(pathToFile2));
      return [before, after];
    case '.yml':
      before = yaml.safeLoad(fs.readFileSync(pathToFile1));
      after = yaml.safeLoad(fs.readFileSync(pathToFile2));
      return [before, after];
    default:
      console.log('unsupported file type');
      return null;
  }
};

export default parseData;
