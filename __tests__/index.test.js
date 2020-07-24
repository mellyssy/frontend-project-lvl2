import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const answer = `{
    common: {
      setting1: Value 1
    - setting2: 200
    - setting3: true
      setting3: {
        key: value
    }
      setting6: {
        key: value
      + ops: vops
    }
    + follow: false
    + setting4: blah blah
    + setting5: {
        key5: value5
    }
  }
    group1: {
    - baz: bas
    + baz: bars
      foo: bar
      nest: {
        key: value
    }
    + nest: str
  }
  - group2: {
      abc: 12345
  }
  + group3: {
      fee: 100500
  }
}
`;

test.each(['json', 'yml', 'ini'])('%s check', (extension) => {
  expect(gendiff(getFixturePath(`filepath1.${extension}`), getFixturePath(`filepath2.${extension}`))).toBe(answer);
});
