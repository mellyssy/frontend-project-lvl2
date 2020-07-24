import _ from 'lodash';

const buildDiffTree = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2));

  const tree = keys.reduce((acc, key) => {
    if (!_.has(obj1, key)) {
      return [...acc, {
        type: 'added', key, obj1Value: null, obj2Value: obj2[key],
      }];
    }

    if (!_.has(obj2, key)) {
      return [...acc, {
        type: 'deleted', key, obj1Value: obj1[key], obj2Value: null,
      }];
    }
    // предполагаем что ключи есть в двух объектах
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return [...acc, { type: 'tree', key, children: buildDiffTree(obj1[key], obj2[key]) }];
    }

    if (obj1[key] !== obj2[key]) {
      return [...acc, {
        type: 'modified', key, obj1Value: obj1[key], obj2Value: obj2[key],
      }];
    }

    return [...acc, {
      type: 'unmodified', key, obj1Value: obj1[key], obj2Value: obj2[key],
    }];
  }, []);

  return tree;
};

export default buildDiffTree;
