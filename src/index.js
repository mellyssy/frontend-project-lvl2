import parseData from './parsers/parsers';
import getDiffTree from './getDiffTree';
import formatter from './formatters';

const gendiff = (pathToFile1, pathToFile2, format) => {
  const [filepath1, filepath2] = [parseData(pathToFile1), parseData(pathToFile2)];

  const tree = getDiffTree(filepath1, filepath2);
  const formattedResult = formatter(tree, format);

  return formattedResult;
};

export default gendiff;
