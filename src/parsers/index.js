import yaml from 'js-yaml';
import ini from 'ini';

const parseData = ([content, extension]) => {
  switch (extension) {
    case '.json':
      return JSON.parse(content);
    case '.yml':
      return yaml.safeLoad(content);
    case '.ini':
      return ini.parse(content);
    default:
      throw new Error(`Unknown extension: ${extension}`);
  }
};

export default parseData;
