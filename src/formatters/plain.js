import _ from 'lodash';

const valueToString = (value) => {
  if (_.isObjectLike(value)) {
    return '[complex value]';
  }
  return _.isString(value) ? `'${value}'` : value;
};

const makeLine = (key, status, value1, value2) => {
  const stingifiedValue1 = valueToString(value1);
  const stingifiedValue2 = valueToString(value2);

  switch (status) {
    case 'added':
      return `Property '${key}' was added with value: ${stingifiedValue2}`;
    case 'removed':
      return `Property '${key}' was removed`;
    case 'modified':
      return `Property '${key}' was updated. From ${stingifiedValue1} to ${stingifiedValue2}`;
    default:
      throw new Error(`Unknown status: ${status}`);
  }
};

const plain = (tree, propName = null) => tree.flatMap((value) => {
  const property = !propName ? value.key : `${propName}.${value.key}`;

  switch (value.type) {
    case 'nested':
      return [plain(value.children, property)];
    case 'unmodified':
      return [];
    default:
      return [makeLine(property, value.type, value.obj1Value, value.obj2Value)];
  }
}).join('\n');

export default plain;
