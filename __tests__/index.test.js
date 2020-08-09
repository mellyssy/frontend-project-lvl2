import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import gendiff from '../src/index.js';
import expectedStylish from '../__fixtures__/expectedStylish.js';
import expectedPlain from '../__fixtures__/expectedPlain.js';
import expectedJson from '../__fixtures__/expectedJson.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const fileFormats = ['json', 'yml', 'ini'];

test.each(fileFormats)('stylish %s check', (extension) => {
  expect(gendiff(getFixturePath(`filepath1.${extension}`), getFixturePath(`filepath2.${extension}`), 'stylish')).toBe(expectedStylish);
});

test.each(fileFormats)('plain %s check', (extension) => {
  expect(gendiff(getFixturePath(`filepath1.${extension}`), getFixturePath(`filepath2.${extension}`), 'plain')).toBe(expectedPlain);
});

test.each(fileFormats)('json %s check', (extension) => {
  expect(gendiff(getFixturePath(`filepath1.${extension}`), getFixturePath(`filepath2.${extension}`), 'json')).toBe(expectedJson);
});
