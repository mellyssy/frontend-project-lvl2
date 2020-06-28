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

test.each`
  before           | after           | format
  ${'before.json'} | ${'after.json'} | ${'json'}
  ${'before.yml'}  | ${'after.yml'}  | ${'yaml'}
  ${'before.ini'}  | ${'after.ini'}  | ${'ini'}
`('plain $format check', ({ before, after }) => {
  expect(gendiff(getFixturePath(before), getFixturePath(after))).toBe(answer);
});
