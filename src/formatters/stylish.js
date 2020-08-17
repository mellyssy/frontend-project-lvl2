import _ from 'lodash';

const indentSymbol = '  ';
const openingBracket = '{';
const closingBracket = '}';
const step = 2;


const stringifyObject = (obj, space, lvl) => {
  const stringified = _.keys(obj).map((key) => {
    const indent = space.repeat(lvl);

    if (_.isObjectLike(obj[key])) {
      const recursiveValue = stringifyObject(obj[key], ' ', lvl + step);
      return `${indent}${key}: ${recursiveValue}`;
    }

    return `${indent}${key}: ${obj[key]}`;
  }).join('\n');

  const bracketIndent = (lvl - step) < 0 ? space.repeat(0) : space.repeat(lvl - step);
  const closingBracketLine = `${bracketIndent}${closingBracket}`;

  return [openingBracket, stringified, closingBracketLine].join('\n');
};

const stringifyTree = (tree, level = 1) => {
  const stringified = tree.map((obj) => {
    const indent = indentSymbol.repeat(level);
    const processedValue1 = _.isObjectLike(obj.obj1Value)
      ? `${openingBracket}\n${stringifyObject(obj.obj1Value, level + step)}\n${indent}  ${closingBracket}`
      : `${obj.obj1Value}`;
    const processedValue2 = _.isObjectLike(obj.obj2Value)
      ? `${openingBracket}\n${stringifyObject(obj.obj2Value, level + step)}\n${indent}  ${closingBracket}`
      : `${obj.obj2Value}`;

    switch (obj.type) {
      case 'unmodified':
        return `${indent}  ${obj.key}: ${processedValue1}\n`;
      case 'removed':
        return `${indent}- ${obj.key}: ${processedValue1}\n`;
      case 'added':
        return `${indent}+ ${obj.key}: ${processedValue2}\n`;
      case 'modified':
        return [
          `${indent}- ${obj.key}: ${processedValue1}\n`,
          `${indent}+ ${obj.key}: ${processedValue2}\n`,
        ];
      case 'nested':
        return [
          `${indent}  ${obj.key}: {\n${stringifyTree(obj.children, level + step)}`,
          `${indent}  }\n`,
        ];
      default:
        throw new Error(`unknown type: ${obj.type}`);
    }
  });

  return _.flattenDeep(stringified).join('');
};

export default (tree) => `{\n${stringifyTree(tree)}}`;
