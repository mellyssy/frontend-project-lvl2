import _ from 'lodash';


const objToTree = (obj) => Object.keys(obj).reduce((acc, objKey) => {
  const keyAsObj = {
    type: 'unmodified',
    key: objKey,
    obj1Value: obj[objKey],
  };

  return [...acc, keyAsObj];
}, []);

const getLine = (status, key, val) => {
  if (_.isUndefined(val)) {
    return `${status} ${key}: `;
  }
  return `${status} ${key}: ${val}\n`;
};

const formatter = (tree) => {
  const list = tree.reduce((acc, object) => {
    if (object.type === 'tree') {
      return [...acc, getLine(' ', object.key), formatter(object.children)];
    }

    if (object.type === 'unmodified') {
      if (_.isObject(object.obj1Value)) {
        const objAsTree = objToTree(object.obj1Value);
        return [...acc, getLine(' ', object.key), formatter(objAsTree)];
      }
      return [...acc, getLine(' ', object.key, object.obj1Value)];
    }

    if (object.type === 'removed') {
      if (_.isObject(object.obj1Value)) {
        const objAsTree = objToTree(object.obj1Value);
        return [...acc, getLine('-', object.key), formatter(objAsTree)];
      }
      return [...acc, getLine('-', object.key, object.obj1Value)];
    }

    if (object.type === 'added') {
      if (_.isObject(object.obj2Value)) {
        const objAsTree = objToTree(object.obj2Value);
        return [...acc, getLine('+', object.key), formatter(objAsTree)];
      }
      return [...acc, getLine('+', object.key, object.obj2Value)];
    }

    if (_.isObjectLike(object.obj2Value)) {
      const objAsTree = objToTree(object.obj2Value);
      return [...acc, getLine('-', object.key, object.obj1Value), getLine(' ', object.key), formatter(objAsTree)];
    }

    if (_.isObjectLike(object.obj1Value)) {
      const objAsTree = objToTree(object.obj1Value);
      return [...acc, getLine(' ', object.key), formatter(objAsTree), getLine('+', object.key, object.obj2Value)];
    }

    return [...acc, getLine('-', object.key, object.obj1Value), getLine('+', object.key, object.obj2Value)];
  }, []);

  return list;
};

const formatterWithIndents = (list, lvl = 0) => {
  const stringified = list.reduce((acc, line) => {
    if (Array.isArray(line)) {
      const innerLine = formatterWithIndents(line, lvl + 2);
      return `${acc}${innerLine}`;
    }
    return `${acc}${' '.repeat(lvl + 2)}${line}`;
  }, '{\n');
  const statusIndent = 2;
  const end = !lvl ? `${' '.repeat(lvl)}}\n` : `${' '.repeat(lvl + statusIndent)}}\n`;
  return stringified + end;
};


const stylish = (tree) => formatterWithIndents(formatter(tree)).trim();

export default stylish;
