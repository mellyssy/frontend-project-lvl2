import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import gendiff from '../src/index.js';
import { expectedStylish, expectedPlain } from '../__fixtures__/expected';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test.each(['json', 'yml', 'ini'])('stylish %s check', (extension) => {
  expect(gendiff(getFixturePath(`filepath1.${extension}`), getFixturePath(`filepath2.${extension}`), 'stylish')).toBe(expectedStylish);
});

test.each(['json', 'yml', 'ini'])('plain %s check', (extension) => {
  expect(gendiff(getFixturePath(`filepath1.${extension}`), getFixturePath(`filepath2.${extension}`), 'plain')).toBe(expectedPlain);
});
