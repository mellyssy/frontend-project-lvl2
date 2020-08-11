import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const objValuesToNumber = (obj) => _.mapValues(obj, (value) => (
  _.isObjectLike(value) ? objValuesToNumber(value) : (parseFloat(value) || value)));

const parseIni = (content) => objValuesToNumber(ini.parse(content));

const parseData = (content, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(content);
    case 'yml':
      return yaml.safeLoad(content);
    case 'ini':
      return parseIni(content);
    default:
      throw new Error(`Unknown format: ${format}`);
  }
};

export default parseData;
