import _ from 'lodash';

const getObjWithNums = (obj) => _.keys(obj).reduce(
  (acc, key) => {
    if (_.isObjectLike(obj[key])) {
      const newValue = getObjWithNums(obj[key]);
      return { ...acc, [key]: newValue };
    }

    const newValue = Number.isNaN(parseInt(obj[key], 10)) ? obj[key] : parseInt(obj[key], 10);
    return { ...acc, [key]: newValue };
  }, {},
);

const makeJsonReady = (tree) => tree.reduce((acc, obj) => {
  if (obj.type === 'tree') {
    return [...acc, { ...obj, children: makeJsonReady(obj.children) }];
  }

  return [...acc, getObjWithNums(obj)];
}, []);

const json = (tree) => {
  const jsonReadyTree = makeJsonReady(tree);
  return JSON.stringify(jsonReadyTree);
};
export default json;
