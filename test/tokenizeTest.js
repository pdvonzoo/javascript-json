const { DataStructure } = require('../src/structure');
const { Syntax } = require('../src/checker');
const { ErrorMessage } = require('../src/checker')
const { test } = require('./test');
const { expect } = require('./test');
const { ArrayParser } = require('../src/parser');
const { JsonParser } = require('../src/parser');
const { Tokenizer } = require('../src/tokenizer');

const syntax = new Syntax();
test("숫자타입을 expectCode와 같이 객체화한다", function () {
  const tokenizer = new Tokenizer(new Syntax());
  const testCode = tokenizer.getObjectByType(1);
  const expectCode = {
    type: 'number',
    value: 1,
    child: []
  };
  return expect(expectCode).toBe(testCode);
});

test("문자열타입을 expectCode와 같이 객체화한다", function () {
  const tokenizer = new Tokenizer(new Syntax());
  const testCode = tokenizer.getObjectByType('whale');
  const expectCode = {
    type: 'string',
    value: 'whale',
    child: []
  };
  return expect(expectCode).toBe(testCode);
});

test("배열타입을 expectCode와 같이 객체화한다", function () {
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

test("객체타입을 expectCode와 같이 객체화한다", function () {
  const tokenizer = new Tokenizer(new Syntax());
  const testCode = tokenizer.getObjectByType({ a: 'b' });
  const expectCode = {
    type: 'object',
    value: 'Object',
    child: { a: { type: 'string', value: 'b', child: [] } }
  };
  return expect(expectCode).toBe(testCode);
});

test("String타입의 Type을 올바르게 체크한다", function () {
  const tokenizer = new Tokenizer(new Syntax());
  const testCode = tokenizer.getType('a');
  const expectCode = 'string';
  return expect(expectCode).toBe(testCode);
});

test("Number타입의 Type을 올바르게 체크한다", function () {
  const tokenizer = new Tokenizer(new Syntax());
  const testCode = tokenizer.getType(1);
  const expectCode = 'number';
  return expect(expectCode).toBe(testCode);
});

test("Null타입의 Type을 올바르게 체크한다", function () {
  const tokenizer = new Tokenizer(new Syntax());
  const testCode = tokenizer.getType(null);
  const expectCode = null;
  return expect(expectCode).toBe(testCode);
});

test("Boolean타입의 Type을 올바르게 체크한다", function () {
  const tokenizer = new Tokenizer(new Syntax());
  const testCode = tokenizer.getType(true);
  const expectCode = true;
  return expect(expectCode).toBe(testCode);
});

test("Object타입의 Type을 올바르게 체크한다", function () {
  const tokenizer = new Tokenizer(new Syntax());
  const testCode = tokenizer.getType({ name: 'whale' });
  const expectCode = 'object';
  return expect(expectCode).toBe(testCode);
});

test("Array타입의 Type을 올바르게 체크한다", function () {
  const tokenizer = new Tokenizer(new Syntax());
  const testCode = tokenizer.getType([1, 2, 3]);
  const expectCode = 'array';
  return expect(expectCode).toBe(testCode);
});