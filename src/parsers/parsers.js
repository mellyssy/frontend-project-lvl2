import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const parseData = (filePath) => {
  const extension = path.extname(filePath);
  const file = fs.readFileSync(filePath, 'utf-8');
  switch (extension) {
    case '.json':
      return JSON.parse(file);
    case '.yml':
      return yaml.safeLoad(file);
    case '.ini':
      return ini.parse(file);
    default:
      return 'unsupported file type';
  }
};

export default parseData;
