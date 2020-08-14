import _ from 'lodash';

const stringifyObject = (obj, lvl) => _.keys(obj).map((key) => {
  const indent = '  '.repeat(lvl + 1);
  const stringifiedValue = _.isObjectLike(obj[key])
    ? `{\n${stringifyObject(obj[key], lvl + 2)}\n${indent}  }`
    : obj[key];
  return `${indent}  ${key}: ${stringifiedValue}`;
}).join('\n');

const stringifyTree = (tree, level = 0) => {
  const stringified = tree.map((obj) => {
    const indent = '  '.repeat(level + 1);
    const stringfiedValue1 = _.isObjectLike(obj.obj1Value)
      ? `{\n${stringifyObject(obj.obj1Value, level + 2)}\n${indent}  }`
      : `${obj.obj1Value}`;
    const stringfiedValue2 = _.isObjectLike(obj.obj2Value)
      ? `{\n${stringifyObject(obj.obj2Value, level + 2)}\n${indent}  }`
      : `${obj.obj2Value}`;

    switch (obj.type) {
      case 'unmodified':
        return `${indent}  ${obj.key}: ${stringfiedValue1}\n`;
      case 'removed':
        return `${indent}- ${obj.key}: ${stringfiedValue1}\n`;
      case 'added':
        return `${indent}+ ${obj.key}: ${stringfiedValue2}\n`;
      case 'modified':
        return [
          `${indent}- ${obj.key}: ${stringfiedValue1}\n`,
          `${indent}+ ${obj.key}: ${stringfiedValue2}\n`,
        ];
      case 'nested':
        return [
          `${indent}  ${obj.key}: {\n${stringifyTree(obj.children, level + 2)}`,
          `${indent}  }\n`,
        ];
      default:
        throw new Error(`unknown type: ${obj.type}`);
    }
  });

  return _.flattenDeep(stringified).join('');
};

export default (tree) => `{\n${stringifyTree(tree)}}`;
