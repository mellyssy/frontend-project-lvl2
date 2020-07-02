import parseData from './parsers/parsers';
import getDiffTree from './getDiffTree';
import stylish from './formatters/stylish';

const gendiff = (pathToFile1, pathToFile2) => {
  const [before, after] = [parseData(pathToFile1), parseData(pathToFile2)];

  const tree = getDiffTree(before, after);
  const formattedResult = stylish(tree);

  return `{\n${formattedResult.join('\n')}\n}`;
};

export default gendiff;
