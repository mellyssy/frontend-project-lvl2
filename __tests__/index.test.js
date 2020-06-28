import { test, expect } from '@jest/globals';
import path from 'path';
import gendiff from '../src/index.js';

const getFixturePath = (filename) => path.join('__fixtures__', filename);

const answer = `{
  host: hexlet.io
- timeout: 50
+ timeout: 20
- proxy: 123.234.53.22
- follow: false
+ verbose: true
}`;

test('plain JSON check', () => {
  expect(gendiff(getFixturePath('before.json'), getFixturePath('after.json'))).toBe(answer);
});

test('plain YAML check', () => {
  expect(gendiff(getFixturePath('before.yml'), getFixturePath('after.yml'))).toBe(answer);
});
