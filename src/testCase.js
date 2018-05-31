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
  const testCode = syntax.isPairBracket('[]');
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

test("Check String Without Quote", function () {
  const testCode = syntax.isStringWithoutQuote("'a'");
  const expectCode = true;
  return expect(expectCode).toBe(testCode);
});

test("Check Mixed Type", function () {
  const testCode = syntax.isMixedType("a3");
  const expectCode = true;
  return expect(expectCode).toBe(testCode);
})

test('Array structure.parser', function () {
  const structure = new DataStructure(new Syntax(), ArrayParser, JsonParser);
  const testCode = structure.parser("[[1,2,2,4],'b',{a:null,b:true,c:false}]");
  const expectCode = [[1, 2, 2, 4], 'b', { a: null, b: true, c: false }];
  return expect(expectCode).toBe(testCode);
});

test("Tokenized Array", function () {
  const tokenizer = new Tokenizer(new Syntax());
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

test("Get Object By Number Type", function () {
  const tokenizer = new Tokenizer(new Syntax());
  const testCode = tokenizer.getObjectByType(1);
  const expectCode = {
    type: 'number',
    value: 1,
    child: []
  };
  return expect(expectCode).toBe(testCode);
});

test("Get Object By String Type", function () {
  const tokenizer = new Tokenizer(new Syntax());
  const testCode = tokenizer.getObjectByType('whale');
  const expectCode = {
    type: 'string',
    value: 'whale',
    child: []
  };
  return expect(expectCode).toBe(testCode);
});

test("Get Object By Array Type", function () {
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

test("Get Object By Object Type", function () {
  const tokenizer = new Tokenizer(new Syntax());
  const testCode = tokenizer.getObjectByType({ a: 'b' });
  const expectCode = {
    type: 'object',
    value: 'Object',
    child: { a: { type: 'string', value: 'b', child: [] } }
  };
  return expect(expectCode).toBe(testCode);
});