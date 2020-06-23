#!/usr/bin/env node
import command from 'commander';
import fs from 'fs';
import _ from 'lodash';

const { program } = command;
let beforeFilePath;
let afterFilePath;
program
  .name('gendiff')
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    beforeFilePath = filepath1;
    afterFilePath = filepath2;
  })
  .option('-f, --format <type>', 'output format')
  .parse(process.argv);

const beforeFile = JSON.parse(fs.readFileSync(beforeFilePath));
const afterFile = JSON.parse(fs.readFileSync(afterFilePath));

const keys = _.union(Object.keys(beforeFile), Object.keys(afterFile));

const resultingArr = keys.reduce(
  (acc, key) => {
    const beforeValue = _.get(beforeFile, key, null);
    const afterValue = _.get(afterFile, key, null);

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

const result = `{\n${resultingArr.join('\n')}\n}`;
console.log(result);
