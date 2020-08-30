import _ from 'lodash';

const stringify = (value) => {
  if (_.isObjectLike(value)) {
    return '[complex value]';
  }
  return _.isString(value) ? `'${value}'` : value;
};

const formatPlain = (tree, propName = null) => tree.map((value) => {
  const property = !propName ? value.key : `${propName}.${value.key}`;

  const processedValue1 = stringify(value.obj1Value);
  const processedValue2 = stringify(value.obj2Value);

  switch (value.type) {
    case 'nested':
      return formatPlain(value.children, property);
    case 'unmodified':
      return null;
    case 'added':
      return `Property '${property}' was added with value: ${processedValue2}`;
    case 'removed':
      return `Property '${property}' was removed`;
    case 'modified':
      return `Property '${property}' was updated. From ${processedValue1} to ${processedValue2}`;
    default:
      throw new Error(`Unknown status: ${value.type}`);
  }
}).filter((value) => value).join('\n');

export default formatPlain;
