import _ from 'lodash';
import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const sortTree = (tree) => [...tree].map((node) => {
  if (_.has(node, 'children')) {
    const newChildren = sortTree(node.children);
    return { ...node, children: newChildren };
  }
  return node;
}).sort((node1, node2) => (node1.key > node2.key ? 1 : -1));

export default (tree, format) => {
  const sortedTree = sortTree(tree);

  if (format === 'plain') {
    return plain(sortedTree);
  }

  if (format === 'json') {
    return json(sortedTree);
  }

  return stylish(sortedTree);
};
