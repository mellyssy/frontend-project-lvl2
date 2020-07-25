import stylish from './stylish';
import plain from './plain';

export default (tree, format) => {
  if (format === 'plain') {
    return plain(tree);
  }

  return stylish(tree);
};
