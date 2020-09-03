import _ from 'lodash';

const indentSymbol = ' ';
const openingBracket = '{';
const closingBracket = '}';
const step = 2;

const prefixes = {
  unmodified: ' ',
  added: '+',
  removed: '-',
};

const addPrefix = (symbol, indent, prefix = prefixes.unmodified) => `${indent}${prefix} ${symbol}`;

const stringify = (data, currentIndent) => {
  if (!_.isObject(data)) {
    return data;
  }

  const nestedIndent = addPrefix(indentSymbol.repeat(step), currentIndent);
  const subLines = _.entries(data)
    .flatMap(([key, value]) => `${addPrefix(key, nestedIndent)}: ${stringify(value, nestedIndent)}`);

  const lines = [
    openingBracket,
    ...subLines,
    addPrefix(closingBracket, currentIndent),
  ];

  return lines.join('\n');
};

const formatStylish = (tree) => {
  const iter = (data, depth) => {
    const innerLines = data.map((obj) => {
      const currentIndent = indentSymbol.repeat(depth);
      const processedValue1 = stringify(obj.obj1Value, currentIndent);
      const processedValue2 = stringify(obj.obj2Value, currentIndent);
      switch (obj.type) {
        case 'unmodified':
          return `${addPrefix(obj.key, currentIndent)}: ${processedValue1}`;
        case 'removed':
          return `${addPrefix(obj.key, currentIndent, prefixes[obj.type])}: ${processedValue1}`;
        case 'added':
          return `${addPrefix(obj.key, currentIndent, prefixes[obj.type])}: ${processedValue2}`;
        case 'modified':
          return [
            `${addPrefix(obj.key, currentIndent, prefixes.removed)}: ${processedValue1}`,
            `${addPrefix(obj.key, currentIndent, prefixes.added)}: ${processedValue2}`,
          ];
        case 'nested':
          return [
            `${addPrefix(obj.key, currentIndent, prefixes.unmodified)}: ${openingBracket}`,
            ...(iter(obj.children, depth + step + step)),
            `${addPrefix(closingBracket, currentIndent)}`,
          ];
        default:
          throw new Error(`unknown type: ${obj.type}`);
      }
    });

    return innerLines;
  };
  const lines = _.flattenDeep(iter(tree, step));
  return [openingBracket,
    ...lines,
    closingBracket,
  ];
};

export default (tree) => formatStylish(tree).join('\n');
