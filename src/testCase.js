const { DataStructure } = require('./structure');
const { Syntax } = require('./checker');
const { ErrorMessage } = require('./checker')
const { test } = require('./test');
const { expect } = require('./test');
const { ArrayParser } = require('./parser');
const { JsonParser } = require('./parser');
const { Tokenizer } = require('./tokenizer');

const syntax = new Syntax();
test("대괄호 개수 체크", function () {
  const testCode = syntax.isPairBracket('[]');
  const expectCode = true;
  return expect(expectCode).toBe(testCode);
});

test("중괄호 개수 체크", function () {
  const testCode = syntax.isPairBracket('{{{}}}');
  const expectCode = true;
  return expect(expectCode).toBe(testCode);
});

test("Null이나 Boolean 문자열을 Null Boolean Type으로 변경", function () {
  const testCode = syntax.changeToNullAndBoolean('null');
  const expectCode = null;
  return expect(expectCode).toBe(testCode);
});

test("따옴표 개수가 정상인지 체크", function () {
  const testCode = syntax.checkPairQuote("''");
  const expectCode = true;
  return expect(expectCode).toBe(testCode);
});

test("따옴표 없는 문자열 체크", function () {
  const testCode = syntax.isStringWithoutQuote("'a'");
  const expectCode = true;
  return expect(expectCode).toBe(testCode);
});

test("숫자와 문자가 섞여 있는 문자열 체크", function () {
  const testCode = syntax.isMixedType("a3");
  const expectCode = true;
  return expect(expectCode).toBe(testCode);
})

test('문자열을 배열로 파싱', function () {
  const structure = new DataStructure(new Syntax(), ArrayParser, JsonParser);
  const testCode = structure.parser("[[1,2,2,4],'b',{a:null,b:true,c:false}]");
  const expectCode = [[1, 2, 2, 4], 'b', { a: null, b: true, c: false }];
  return expect(expectCode).toBe(testCode);
});

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