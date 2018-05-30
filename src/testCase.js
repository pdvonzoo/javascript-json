const { DataStructure } = require('./structure');
const { Syntax } = require('./checker');
const { test } = require('./test');
const { expect } = require('./test');
const { ArrayParser } = require('./parser');
const { JsonParser } = require('./parser');

test('배열화 과정을 거친 값과 값이 같다', function () {
  const structure = new DataStructure(new Syntax(Syntax.errorMessage), ArrayParser, JsonParser);
  const testCode = structure.parser("[[1,2,2,4],'b',{a:null,b:true,c:false}]");
  const expectCode = [[1, 2, 2, 4], 'b', { a: null, b: true, c: false }];
  return expect(expectCode).toBe(testCode);
});