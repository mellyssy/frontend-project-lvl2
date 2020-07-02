import _ from 'lodash';

const getDiffTree = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2));

  const tree = keys.reduce((acc, key) => {
    if (!_.has(obj1, key)) {
      return [...acc, {
        type: 'added', key, beforeValue: null, afterValue: obj2[key],
      }];
    }

    if (!_.has(obj2, key)) {
      return [...acc, {
        type: 'deleted', key, beforeValue: obj1[key], afterValue: null,
      }];
    }
    // предполагаем что ключи есть в двух объектах
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return [...acc, { type: 'object', key, children: getDiffTree(obj1[key], obj2[key]) }];
    }

    if (obj1[key] !== obj2[key]) {
      return [...acc, {
        type: 'modified', key, beforeValue: obj1[key], afterValue: obj2[key],
      }];
    }

    return [...acc, {
      type: 'unmodified', key, beforeValue: obj1[key], afterValue: obj2[key],
    }];
  }, []);

  return tree;
};

export default getDiffTree;
