import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import gendiff from '../src/index.js';
import { expectedStylish, expectedPlain, expectedJson } from '../__fixtures__/expected';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test.each(
  [
    ['json', 'stylish', expectedStylish], ['yml', 'stylish', expectedStylish], ['ini', 'stylish', expectedStylish],
    ['json', 'plain', expectedPlain], ['yml', 'plain', expectedPlain], ['ini', 'plain', expectedPlain],
    ['json', 'json', expectedJson], ['yml', 'json', expectedJson], ['ini', 'json', expectedJson],
  ],
)('%s %s check', (extension, format, expected) => {
  expect(gendiff(getFixturePath(`filepath1.${extension}`), getFixturePath(`filepath2.${extension}`), format)).toBe(expected);
});
