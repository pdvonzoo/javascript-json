const { DataStructure } = require('../src/structure');
const { Syntax } = require('../src/checker');
const { ErrorMessage } = require('../src/checker')
const { test } = require('./test');
const { expect } = require('./test');
const { ArrayParser } = require('../src/parser');
const { JsonParser } = require('../src/parser');
const { Tokenizer } = require('../src/tokenizer');

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