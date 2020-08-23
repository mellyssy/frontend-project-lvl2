import _ from 'lodash';

const indentSymbol = ' ';
const openingBracket = '{';
const closingBracket = '}';
const step = 2;

const statDict = {
  unmodified: '  ',
  added: '+ ',
  removed: '- ',
};

const processKey = (lvl, status, key) => {
  const indent = indentSymbol.repeat(lvl);
  return `${indent}${statDict[status]}${key}`;
};

const stringify = (value, symbol, lvl) => {
  if (!_.isObjectLike(value)) {
    return `${value}`;
  }
  const iterStringify = (obj, currLevel) => {
    const lines = _.entries(obj).flatMap(([k, v]) => {
      const processedKey = processKey(currLevel + step, 'unmodified', k);
      if (!_.isObjectLike(v)) {
        return `${processedKey}: ${v}`;
      }

      const stingifiedObj = iterStringify(v, currLevel + lvl);
      return [`${processedKey}: ${stingifiedObj}`];
    }).join('\n');
    const closingLine = `${symbol.repeat(currLevel)}${closingBracket}`;
    return [openingBracket, lines, closingLine].join('\n');
  };

  return iterStringify(value, lvl);
};

const stylish = (tree, level = 0) => {
  const indentLvl = level + step;
  const closingLine = `${indentSymbol.repeat(level)}${closingBracket}`;

  const stringified = tree.map((obj) => {
    const processedValue1 = stringify(obj.obj1Value, indentSymbol, indentLvl + step);
    const processedValue2 = stringify(obj.obj2Value, indentSymbol, indentLvl + step);
    switch (obj.type) {
      case 'unmodified':
        return `${processKey(indentLvl, obj.type, obj.key)}: ${processedValue1}`;
      case 'removed':
        return `${processKey(indentLvl, obj.type, obj.key)}: ${processedValue1}`;
      case 'added':
        return `${processKey(indentLvl, obj.type, obj.key)}: ${processedValue2}`;
      case 'modified':
        return [
          `${processKey(indentLvl, 'removed', obj.key)}: ${processedValue1}`,
          `${processKey(indentLvl, 'added', obj.key)}: ${processedValue2}`,
        ];
      case 'nested':
        return `${processKey(indentLvl, 'unmodified', obj.key)}: ${stylish(obj.children, indentLvl + step)}`;
      default:
        throw new Error(`unknown type: ${obj.type}`);
    }
  });

  return [openingBracket,
    ...(_.flattenDeep(stringified)),
    closingLine,
  ].join('\n');
};

export default stylish;
