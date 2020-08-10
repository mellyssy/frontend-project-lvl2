import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const objValuesToNumber = (obj) => _.keys(obj).reduce((acc, key) => {
  if (_.isObjectLike(obj[key])) {
    const nested = objValuesToNumber(obj[key]);
    return { ...acc, [key]: nested };
  }
  const newValue = Number.isNaN(parseInt(obj[key], 10)) ? obj[key] : parseInt(obj[key], 10);
  return { ...acc, [key]: newValue };
}, {});

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
