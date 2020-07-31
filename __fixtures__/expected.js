const expectedStylish = `{
    common: {
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: {
            key: value
        }
        setting6: {
            key: value
            doge: {
              - wow: too much
              + wow: so much
            }
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
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        fee: 100500
        deep: {
            id: {
                number: 45
            }
        }
    }
}`;

const expectedPlain = `Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to [complex value]
Property 'common.setting6.doge.wow' was updated. From too much to so much
Property 'common.setting6.ops' was added with value: vops
Property 'common.follow' was added with value: false
Property 'common.setting4' was added with value: blah blah
Property 'common.setting5' was added with value: [complex value]
Property 'group1.baz' was updated. From bas to bars
Property 'group1.nest' was updated. From [complex value] to str
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;


const expectedJson = '[{"type":"tree","key":"common","children":[{"type":"unmodified","key":"setting1","obj1Value":"Value 1","obj2Value":"Value 1"},{"type":"removed","key":"setting2","obj1Value":200,"obj2Value":null},{"type":"modified","key":"setting3","obj1Value":true,"obj2Value":{"key":"value"}},{"type":"tree","key":"setting6","children":[{"type":"unmodified","key":"key","obj1Value":"value","obj2Value":"value"},{"type":"tree","key":"doge","children":[{"type":"modified","key":"wow","obj1Value":"too much","obj2Value":"so much"}]},{"type":"added","key":"ops","obj1Value":null,"obj2Value":"vops"}]},{"type":"added","key":"follow","obj1Value":null,"obj2Value":false},{"type":"added","key":"setting4","obj1Value":null,"obj2Value":"blah blah"},{"type":"added","key":"setting5","obj1Value":null,"obj2Value":{"key5":"value5"}}]},{"type":"tree","key":"group1","children":[{"type":"modified","key":"baz","obj1Value":"bas","obj2Value":"bars"},{"type":"unmodified","key":"foo","obj1Value":"bar","obj2Value":"bar"},{"type":"modified","key":"nest","obj1Value":{"key":"value"},"obj2Value":"str"}]},{"type":"removed","key":"group2","obj1Value":{"abc":12345,"deep":{"id":45}},"obj2Value":null},{"type":"added","key":"group3","obj1Value":null,"obj2Value":{"fee":100500,"deep":{"id":{"number":45}}}}]';

export { expectedStylish, expectedPlain, expectedJson };
