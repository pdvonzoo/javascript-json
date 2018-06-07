const { DataStructure } = require('../src/structure');
const { Syntax } = require('../src/checker');
const { ErrorMessage } = require('../src/checker')
const { test } = require('./test');
const { expect } = require('./test');
const { ArrayParser } = require('../src/parser');
const { JsonParser } = require('../src/parser');
const { Tokenizer } = require('../src/tokenizer');

const syntax = new Syntax();
test("숫자타입 토크나이즈", function () {
  const tokenizer = new Tokenizer(new Syntax());
  const testCode = tokenizer.getObjectByType(1);
  const expectCode = {
    type: 'number',
    value: 1,
    child: []
  };
  return expect(expectCode).toBe(testCode);
});

test("문자열타입 토크나이즈", function () {
  const tokenizer = new Tokenizer(new Syntax());
  const testCode = tokenizer.getObjectByType('whale');
  const expectCode = {
    type: 'string',
    value: 'whale',
    child: []
  };
  return expect(expectCode).toBe(testCode);
});

test("배열타입 토크나이즈", function () {
  const tokenizer = new Tokenizer(new Syntax());
  const testCode = tokenizer.getObjectByType([1, 2, 3]);
  const expectCode = {
    type: 'array',
    value: 'ArrayObject',
    child: [{ type: 'number', value: 1, child: [] },
    { type: 'number', value: 2, child: [] },
    { type: 'number', value: 3, child: [] }]
  };
  return expect(expectCode).toBe(testCode);
});

test("객체타입 토크나이즈", function () {
  const tokenizer = new Tokenizer(new Syntax());
  const testCode = tokenizer.getObjectByType({ a: 'b' });
  const expectCode = {
    type: 'object',
    value: 'Object',
    child: { a: { type: 'string', value: 'b', child: [] } }
  };
  return expect(expectCode).toBe(testCode);
});