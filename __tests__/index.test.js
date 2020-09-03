import { test, expect, beforeAll } from '@jest/globals';
import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import gendiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const fileFormats = ['json', 'yml', 'ini'];

const expected = {};
beforeAll(() => {
  ['Json', 'Plain', 'Stylish'].forEach((format) => {
    const filepath = getFixturePath(`expected${format}`);
    const content = fs.readFileSync(filepath, 'utf8');
    expected[format] = content;
  });
});

test.each(fileFormats)('%s check', (format) => {
  const path1 = getFixturePath(`filepath1.${format}`);
  const path2 = getFixturePath(`filepath2.${format}`);

  expect(gendiff(path1, path2)).toBe(expected.Stylish);
  expect(gendiff(path1, path2, 'stylish')).toBe(expected.Stylish);
  expect(gendiff(path1, path2, 'plain')).toBe(expected.Plain);
  expect(gendiff(path1, path2, 'json')).toBe(expected.Json);
});
