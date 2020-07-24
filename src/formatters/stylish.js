import _ from 'lodash';


const objToTree = (obj) => Object.keys(obj).reduce((acc, objKey) => {
  const keyAsObj = {
    type: 'unmodified',
    key: objKey,
    obj1Value: obj[objKey],
  };

  return [...acc, keyAsObj];
}, []);

const formatter = (tree) => {
  const list = tree.reduce((acc, object) => {
    if (object.type === 'tree') {
      const str = `  ${object.key}: `;
      return [...acc, str, formatter(object.children)];
    }

    if (object.type === 'unmodified') {
      if (_.isObject(object.obj1Value)) {
        const objAsTree = objToTree(object.obj1Value);
        const str = `  ${object.key}: `;
        return [...acc, str, formatter(objAsTree)];
      }
      const str = `  ${object.key}: ${object.obj1Value}\n`;
      return [...acc, str];
    }

    if (object.type === 'deleted') {
      if (_.isObject(object.obj1Value)) {
        const objAsTree = objToTree(object.obj1Value);
        const str = `- ${object.key}: `;
        return [...acc, str, formatter(objAsTree)];
      }
      const str = `- ${object.key}: ${object.obj1Value}\n`;
      return [...acc, str];
    }

    if (object.type === 'added') {
      if (_.isObject(object.obj2Value)) {
        const objAsTree = objToTree(object.obj2Value);
        const str = `+ ${object.key}: `;
        return [...acc, str, formatter(objAsTree)];
      }
      const str = `+ ${object.key}: ${object.obj2Value}\n`;
      return [...acc, str];
    }

    if (_.isObjectLike(object.obj2Value)) {
      const objAsTree = objToTree(object.obj2Value);
      const str1 = `- ${object.key}: ${object.obj1Value}\n`;
      const str = `  ${object.key}: `;
      return [...acc, str1, str, formatter(objAsTree)];
    }

    if (_.isObjectLike(object.obj1Value)) {
      const objAsTree = objToTree(object.obj1Value);
      const str2 = `+ ${object.key}: ${object.obj2Value}\n`;
      const str = `  ${object.key}: `;
      return [...acc, str, formatter(objAsTree), str2];
    }

    const str1 = `- ${object.key}: ${object.obj1Value}\n`;
    const str2 = `+ ${object.key}: ${object.obj2Value}\n`;
    return [...acc, str1, str2];
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
  const end = `${' '.repeat(lvl)}}\n`;
  return stringified + end;
};


const stylish = (tree) => formatterWithIndents(formatter(tree));

export default stylish;
