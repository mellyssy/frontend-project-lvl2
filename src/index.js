import fs from 'fs';
import _ from 'lodash';

const gendiff = (pathToFile1, pathToFile2) => {
  const before = JSON.parse(fs.readFileSync(pathToFile1));
  const after = JSON.parse(fs.readFileSync(pathToFile2));

  const keys = _.union(Object.keys(before), Object.keys(after));

  const resultingArr = keys.reduce(
    (acc, key) => {
      const beforeValue = _.get(before, key, null);
      const afterValue = _.get(after, key, null);

      if (!afterValue) {
        return [...acc, `- ${key}: ${beforeValue}`];
      }

      if (!beforeValue) {
        return [...acc, `+ ${key}: ${afterValue}`];
      }

      if (afterValue !== beforeValue) {
        return [...acc, `- ${key}: ${beforeValue}`, `+ ${key}: ${afterValue}`];
      }

      return [...acc, `  ${key}: ${beforeValue}`];
    },
    [],
  );

  return `{\n${resultingArr.join('\n')}\n}`;
};

export default gendiff;
