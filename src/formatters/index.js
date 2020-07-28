import stylish from './stylish';
import plain from './plain';
import json from './json';

export default (tree, format) => {
  if (format === 'plain') {
    return plain(tree);
  }

  if (format === 'json') {
    return json(tree);
  }

  return stylish(tree);
};
