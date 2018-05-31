const {test} = require('../utility/test.js');
const {expect} = require('../utility/test.js');
const {lexer} = require('../src/lexer.js');
const {errorMessage} = require('../src/error.js');
test('number Type Test ', () => {
    const data ='10'
    const result = lexer(data).typeCheck();
    return expect('number').toBe(result);
})

test('string Type Test ', () => {
    const data = "'crong'";
    const result = lexer(data).typeCheck();
    return expect('string').toBe(result);
})

test('null Type Test ', () => {
    const data = 'null';
    const result = lexer(data).typeCheck();
    return expect('null').toBe(result);
})

test('boolean Type Test ', () => {
    const data = 'true';
    const result = lexer(data).typeCheck();
    return expect('boolean').toBe(result);
})

test('boolean Type Test ', () => {
    const data = 'false';
    const result = lexer(data).typeCheck();
    return expect('boolean').toBe(result);
})

test('undefined Type Test ', () => {
    const data = 'undefined';
    const result = lexer(data).typeCheck();
    return expect('undefined').toBe(result);
})

test('array Type Value ', () => {
    const data = '[]';
    const result = lexer(data).valueCheck();
    return expect('object Array').toBe(result);
})

test('object Type Value ', () => {
    const data = '{}';
    const result = lexer(data).valueCheck();
    return expect('object Object').toBe(result);
})

test('Another Type Value ', () => {
    const data = '123'
    const result = lexer(data).valueCheck();
    return expect('123').toBe(result);
})

test('Another Type Value ', () => {
    const data = "'crong'";
    const result = lexer(data).valueCheck();
    return expect("'crong'").toBe(result);
})

test('Another Type Value ', () => {
    const data = 'null';
    const result = lexer(data).valueCheck();
    return expect('null').toBe(result);
})

test('Another Type Value ', () => {
    const data = 'undefined';
    const result = lexer(data).valueCheck();
    return expect('undefined').toBe(result);
})

test('Another Type Value ', () => {
    const data = 'true';
    const result = lexer(data).valueCheck();
    return expect('true').toBe(result);
})

test('isKey Test', () => {
    const data = ['123', 'a'];
    const result = lexer(...data).keyCheck();
    return expect('a').toBe(result);
})

test('숫자일 때 lexer Test', () => {
    const data = '123';
    const result = lexer(data).lexer;
    const answer = { type: 'number', value: '123', child: [] };
    return expect(answer).toBe(result);
})

test('문자일 때 lexer Test', () => {
    const data = "'crong'";
    const result = lexer(data).lexer;
    const answer = { type: 'string', value: "'crong'", child: [] };
    return expect(answer).toBe(result);
})

test('배열일 때 lexer Test', () => {
    const data = "[]";
    const result = lexer(data).lexer;
    const answer = { type: 'array', value: "object Array", child: [] };
    return expect(answer).toBe(result);
})

test('객체일 때 lexer Test', () => {
    const data = "{}";
    const result = lexer(data).lexer;
    const answer = { type: 'object', value: "object Object", child: [] };
    return expect(answer).toBe(result);
})

test('키값이 있는 배열일 때 lexer Test', () => {
    const data = ["[]", 'crong']
    const result = lexer(...data).lexer;
    const answer = { type: 'array', value: "object Array",key : 'crong', child: [] };
    return expect(answer).toBe(result);
})

test('stringError Test ', () => {
    const data = "cro'ng"
    try{
        lexer(data).lexer;
    }catch{
        const result = data + errorMessage.stringError;
        const answer = data + "는 올바른 문자열이 아닙니다.";
        return expect(answer).toBe(result);
    }
})

test('typeError Test ', () => {
    const data = "A"
    try{
        lexer(data).lexer;
    }catch{
        const result = data + errorMessage.typeError;
        const answer = data + "는 알 수 없는 타입입니다.";
        return expect(answer).toBe(result);
    }
})
