import _ from 'lodash';

const getObjAsTree = (obj) => Object.keys(obj).reduce((acc, key) => {
  const keyAsObj = {
    type: 'unmodified',
    key,
    obj1Value: obj[key],
  };

  return [...acc, keyAsObj];
}, []);

const getLine = (status, key, value) => {
  if (_.isUndefined(value)) {
    return `${status} ${key}: `;
  }
  return `${status} ${key}: ${value}\n`;
};

const formatToLines = (tree) => {
  const lines = tree.reduce((acc, object) => {
    if (object.type === 'tree') {
      return [...acc, getLine(' ', object.key), formatToLines(object.children)];
    }

    if (object.type === 'unmodified') {
      if (_.isObject(object.obj1Value)) {
        const objAsTree = getObjAsTree(object.obj1Value);
        return [...acc, getLine(' ', object.key), formatToLines(objAsTree)];
      }
      return [...acc, getLine(' ', object.key, object.obj1Value)];
    }

    if (object.type === 'removed') {
      if (_.isObject(object.obj1Value)) {
        const objAsTree = getObjAsTree(object.obj1Value);
        return [...acc, getLine('-', object.key), formatToLines(objAsTree)];
      }
      return [...acc, getLine('-', object.key, object.obj1Value)];
    }

    if (object.type === 'added') {
      if (_.isObject(object.obj2Value)) {
        const objAsTree = getObjAsTree(object.obj2Value);
        return [...acc, getLine('+', object.key), formatToLines(objAsTree)];
      }
      return [...acc, getLine('+', object.key, object.obj2Value)];
    }

    if (_.isObjectLike(object.obj2Value)) {
      const objAsTree = getObjAsTree(object.obj2Value);
      return [...acc, getLine('-', object.key, object.obj1Value), getLine('+', object.key), formatToLines(objAsTree)];
    }

    if (_.isObjectLike(object.obj1Value)) {
      const objAsTree = getObjAsTree(object.obj1Value);
      return [...acc, getLine('-', object.key), formatToLines(objAsTree), getLine('+', object.key, object.obj2Value)];
    }

    return [...acc, getLine('-', object.key, object.obj1Value), getLine('+', object.key, object.obj2Value)];
  }, []);

  return lines;
};

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
