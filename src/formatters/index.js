import stylish from './stylish.js';
import plain from './plain.js';

export default (tree, format) => {
  switch (format) {
    case 'plain':
      return plain(tree);
    case 'json':
      return JSON.stringify(tree);
    case 'stylish':
      return stylish(tree);
    default:
      throw new Error(`Unknown format: ${format}`);
  }
};
