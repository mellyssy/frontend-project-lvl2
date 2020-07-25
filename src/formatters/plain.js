import _ from 'lodash';

const makeLine = (key, status, value1, value2) => {
  const printableValue1 = _.isObjectLike(value1) ? '[complex value]' : value1;
  const printableValue2 = _.isObjectLike(value2) ? '[complex value]' : value2;

  if (status === 'added') {
    return `Property '${key}' was added with value: ${printableValue2}`;
  }

  if (status === 'removed') {
    return `Property '${key}' was removed`;
  }

  if (status === 'modified') {
    return `Property '${key}' was updated. From ${printableValue1} to ${printableValue2}`;
  }

  return null;
};

const plain = (tree, propName = null) => {
  const lines = tree.reduce((acc, value) => {
    const property = !propName ? value.key : `${propName}.${value.key}`;

    if (value.type === 'tree') {
      return [...acc, plain(value.children, property)];
    }

    if (value.type === 'unmodified') {
      return acc;
    }

    const line = makeLine(property, value.type, value.obj1Value, value.obj2Value);
    return [...acc, line];
  }, []);

  return lines.join('\n');
};

export default plain;
