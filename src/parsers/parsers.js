import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const parseData = (filePath) => {
  const extension = path.extname(filePath);
  const file = fs.readFileSync(filePath);
  switch (extension) {
    case '.json':
      return JSON.parse(file);
    case '.yml':
      return yaml.safeLoad(file);
    default:
      return 'unsupported file type';
  }
};

export default parseData;
