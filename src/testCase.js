const { DataStructure } = require('./structure');
const { Syntax } = require('./checker');
const { ErrorMessage } = require('./checker')
const { test } = require('./test');
const { expect } = require('./test');
const { ArrayParser } = require('./parser');
const { JsonParser } = require('./parser');
const { Tokenizer } = require('./tokenizer');

const syntax = new Syntax();
test("Check Pair SquareBracket", function () {
  const testCode = syntax.isPairBracket('[]]');
  const expectCode = true;
  return expect(expectCode).toBe(testCode);
});

test("Check Pair CurlyBracket", function () {
  const testCode = syntax.isPairBracket('{{{}}}');
  const expectCode = true;
  return expect(expectCode).toBe(testCode);
});

test("Null이나 Boolean 문자열을 Null Boolean Type으로 변경", function () {
  const testCode = syntax.changeToNullAndBoolean('null');
  const expectCode = null;
  return expect(expectCode).toBe(testCode);
});

test("Check Pair Quote", function () {
  const testCode = syntax.checkPairQuote("''");
  const expectCode = true;
  return expect(expectCode).toBe(testCode);
});

test('Array structure.parser', function () {
  const structure = new DataStructure(new Syntax(Syntax.errorMessage), ArrayParser, JsonParser);
  const testCode = structure.parser("[[1,2,2,4],'b',{a:null,b:true,c:false}]");
  const expectCode = [[1, 2, 2, 4], 'b', { a: null, b: true, c: false }];
  return expect(expectCode).toBe(testCode);
});

test("Tokenize과정을 거친 배열", function () {
  const tokenizer = new Tokenizer(new Syntax(Syntax.errorMessage));
  const testCode = tokenizer.tokenize(['whale', 123, false]);
  const expectCode = {
    type: 'array',
    value: 'ArrayObject',
    child:
      [{ type: 'string', value: 'whale', child: [] },
      { type: 'number', value: 123, child: [] },
      { type: 'string', value: false, child: [] }]
  }
  return expect(expectCode).toBe(testCode);
});