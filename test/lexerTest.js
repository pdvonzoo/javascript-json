const {test} = require('./test.js');
const {expect} = require('./test.js');
const {lexer} = require('../src/lexer.js');

test('number Type Test ', () => {
    const result = lexer('10').typeCheck();
    return expect('number').toBe(result);
})

test('string Type Test ', () => {
    const result = lexer("'crong'").typeCheck();
    return expect('string').toBe(result);
})

test('null Type Test ', () => {
    const result = lexer('null').typeCheck();
    return expect('null').toBe(result);
})

test('boolean Type Test ', () => {
    const result = lexer('true').typeCheck();
    return expect('boolean').toBe(result);
})

test('boolean Type Test ', () => {
    const result = lexer('false').typeCheck();
    return expect('boolean').toBe(result);
})

test('undefined Type Test ', () => {
    const result = lexer('undefined').typeCheck();
    return expect('undefined').toBe(result);
})

test('array Type Value ', () => {
    const result = lexer('[]').valueCheck();
    return expect('object Array').toBe(result);
})

test('object Type Value ', () => {
    const result = lexer('{}').valueCheck();
    return expect('object Object').toBe(result);
})

test('Another Type Value ', () => {
    const result = lexer('123').valueCheck();
    return expect('123').toBe(result);
})

test('Another Type Value ', () => {
    const result = lexer("'crong'").valueCheck();
    return expect("'crong'").toBe(result);
})

test('Another Type Value ', () => {
    const result = lexer('null').valueCheck();
    return expect('null').toBe(result);
})

test('Another Type Value ', () => {
    const result = lexer('undefined').valueCheck();
    return expect('undefined').toBe(result);
})

test('Another Type Value ', () => {
    const result = lexer('true').valueCheck();
    return expect('true').toBe(result);
})

test('isKey Test', () => {
    const result = lexer('123', 'a').keyCheck();
    return expect('a').toBe(result);
})

test('숫자일 때 lexer Test', () => {
    const result = lexer('123').getLexer;
    const answer = { type: 'number', value: '123', child: [] };
    return expect(answer).toBe(result);
})

test('문자일 때 lexer Test', () => {
    const result = lexer("'crong'").getLexer;
    const answer = { type: 'string', value: "'crong'", child: [] };
    return expect(answer).toBe(result);
})

test('배열일 때 lexer Test', () => {
    const result = lexer("[]").getLexer;
    const answer = { type: 'array', value: "object Array", child: [] };
    return expect(answer).toBe(result);
})

test('객체일 때 lexer Test', () => {
    const result = lexer("[]").getLexer;
    const answer = { type: 'object', value: "object Object", child: [] };
    return expect(answer).toBe(result);
})

test('키값이 있는 배열일 때 lexer Test', () => {
    const result = lexer("[]", 'crong').getLexer;
    const answer = { type: 'array', value: "object Array",key : 'crong', child: [] };
    return expect(answer).toBe(result);
})