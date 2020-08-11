import _ from 'lodash';

const getObjAsTree = (obj) => _.keys(obj).map((key) => ({
  type: 'unmodified',
  key,
  obj1Value: obj[key],
}));

const getLine = (status, key, value) => (
  _.isUndefined(value) ? `${status} ${key}: ` : `${status} ${key}: ${value}\n`);

const formatToLines = (tree) => tree.flatMap((object) => {
  switch (object.type) {
    case 'nested':
      return [getLine(' ', object.key), formatToLines(object.children)];
    case 'unmodified':
      if (_.isObject(object.obj1Value)) {
        const objAsTree = getObjAsTree(object.obj1Value);
        return [getLine(' ', object.key), formatToLines(objAsTree)];
      }
      return [getLine(' ', object.key, object.obj1Value)];
    case 'removed':
      if (_.isObject(object.obj1Value)) {
        const objAsTree = getObjAsTree(object.obj1Value);
        return [getLine('-', object.key), formatToLines(objAsTree)];
      }
      return [getLine('-', object.key, object.obj1Value)];
    case 'added':
      if (_.isObject(object.obj2Value)) {
        const objAsTree = getObjAsTree(object.obj2Value);
        return [getLine('+', object.key), formatToLines(objAsTree)];
      }
      return [getLine('+', object.key, object.obj2Value)];
    default:
      if (_.isObjectLike(object.obj2Value)) {
        const objAsTree = getObjAsTree(object.obj2Value);
        return [getLine('-', object.key, object.obj1Value), getLine('+', object.key), formatToLines(objAsTree)];
      }
      if (_.isObjectLike(object.obj1Value)) {
        const objAsTree = getObjAsTree(object.obj1Value);
        return [getLine('-', object.key), formatToLines(objAsTree), getLine('+', object.key, object.obj2Value)];
      }
      return [getLine('-', object.key, object.obj1Value), getLine('+', object.key, object.obj2Value)];
  }
});

const formatWithIndents = (lines, lvl = 0) => {
  const stringified = lines.reduce((acc, line) => {
    if (Array.isArray(line)) {
      const innerLine = formatWithIndents(line, lvl + 2);
      return `${acc}${innerLine}`;
    }
    return `${acc}${'  '.repeat(lvl + 1)}${line}`;
  }, '{\n');
  const closingBracket = `${'  '.repeat(lvl)}}\n`;
  return stringified + closingBracket;
};


const stylish = (tree) => formatWithIndents(formatToLines(tree)).trim();

export default stylish;
