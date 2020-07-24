import parseData from './parsers/parsers';
import getDiffTree from './getDiffTree';
import stylish from './formatters/stylish';

const gendiff = (pathToFile1, pathToFile2) => {
  const [filepath1, filepath2] = [parseData(pathToFile1), parseData(pathToFile2)];

  const tree = getDiffTree(filepath1, filepath2);
  const formattedResult = stylish(tree);

  return formattedResult;
};

export default gendiff;
