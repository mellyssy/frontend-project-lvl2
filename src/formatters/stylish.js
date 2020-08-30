import _ from 'lodash';

const indentSymbol = ' ';
const openingBracket = '{';
const closingBracket = '}';
const step = 2;

const prefixes = {
  unmodified: '  ',
  added: '+ ',
  removed: '- ',
};


const addPrefix = (symbol, indent, prefix = prefixes.unmodified) => `${indent}${prefix}${symbol}`;

const stringify = (data, indent) => {
  if (!_.isObject(data)) {
    return data;
  }

  const currentIndent = addPrefix('', indent);
  const nestedIndent = addPrefix('', currentIndent);

  const subLines = _.entries(data)
    .flatMap(([key, value]) => `${addPrefix(key, currentIndent)}: ${stringify(value, nestedIndent)}`);

  const lines = [
    openingBracket,
    ...subLines,
    addPrefix(closingBracket, indent, ''),
  ];

  return lines.join('\n');
};

const formatStylish = (tree, level = 0) => {
  const innerLines = tree.map((obj) => {
    const currentIndent = indentSymbol.repeat(level + step);
    const processedValue1 = stringify(obj.obj1Value, addPrefix('', currentIndent));
    const processedValue2 = stringify(obj.obj2Value, addPrefix('', currentIndent));
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
        return `${addPrefix(obj.key, currentIndent)}: ${formatStylish(obj.children, level + step + step)}`;
      default:
        throw new Error(`unknown type: ${obj.type}`);
    }
  });

  return [openingBracket,
    ...(_.flattenDeep(innerLines)),
    addPrefix(closingBracket, indentSymbol.repeat(level), ''),
  ].join('\n');
};

export default formatStylish;
