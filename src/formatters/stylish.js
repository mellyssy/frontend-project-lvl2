import _ from 'lodash';

const indentSymbol = '  ';
const openingBracket = '{';
const closingBracket = '}';
const step = 2;


const stringify = (value, symbol, lvl) => {
  if (!_.isObjectLike(value)) {
    return `${value}`;
  }
  const iterStringify = (obj, currLevel) => {
    const indent = symbol.repeat(lvl + currLevel);
    const lines = _.entries(obj).flatMap(([k, v]) => {
      if (!_.isObjectLike(v)) {
        return `${indent}${k}: ${v}`;
      }

      const stingifiedObj = iterStringify(v, currLevel + lvl);
      return [`${indent}${k}: ${stingifiedObj}`];
    }).join('\n');
    const closingLine = `${symbol.repeat(currLevel)}}`;
    return ['{', lines, closingLine].join('\n');
  };

  return iterStringify(value, 0);
};

const stringifyTree = (tree, level = 1) => {
  const stringified = tree.map((obj) => {
    const indent = indentSymbol.repeat(level);
    const processedValue1 = stringify(obj.obj1Value, ' ', 2);
    const processedValue2 = stringify(obj.obj2Value, ' ', 2);

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
