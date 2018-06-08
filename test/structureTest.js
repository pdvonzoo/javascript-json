const { DataStructure } = require('../src/structure');
const { Syntax } = require('../src/checker');
const { ErrorMessage } = require('../src/checker')
const { test } = require('./test');
const { expect } = require('./test');
const { ArrayParser } = require('../src/parser');
const { JsonParser } = require('../src/parser');
const { Tokenizer } = require('../src/tokenizer');

const syntax = new Syntax();

test('문자열을 배열로 파싱', function () {
  const structure = new DataStructure(new Syntax(), ArrayParser, JsonParser);
  const testCode = structure.parser("[[1,2,2,4],'b',{a:null,b:true,c:false}]");
  const expectCode = [[1, 2, 2, 4], 'b', { a: null, b: true, c: false }];
  return expect(expectCode).toBe(testCode);
});