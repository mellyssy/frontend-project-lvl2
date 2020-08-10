import _ from 'lodash';

const buildDiffTree = (obj1, obj2) => (_.union(_.keys(obj1), _.keys(obj2))
  .sort()
  .map((key) => {
    if (!_.has(obj1, key)) {
      return {
        type: 'added', key, obj1Value: null, obj2Value: obj2[key],
      };
    }

    if (!_.has(obj2, key)) {
      return {
        type: 'removed', key, obj1Value: obj1[key], obj2Value: null,
      };
    }

    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return { type: 'nested', key, children: buildDiffTree(obj1[key], obj2[key]) };
    }

    if (obj1[key] !== obj2[key]) {
      return {
        type: 'modified', key, obj1Value: obj1[key], obj2Value: obj2[key],
      };
    }

    return {
      type: 'unmodified', key, obj1Value: obj1[key], obj2Value: obj2[key],
    };
  })
);

export default buildDiffTree;
