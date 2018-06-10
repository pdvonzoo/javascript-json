const {test} = require('./test');
const {expect} = require('./expect');
const Lexer = require('../function/lexer');
const lexer = new Lexer();

console.log("lexer.js 테스트를 시작합니다");
console.log("--------------------------------------------");

test("타입을 올바르게 결정하는지 확인한다", () => {
    const testData1 = "[123, [22], 33]";
    const testResult = lexer.decisionType(testData1);
    const answer = {
        "type": "Array",
        "value": "123, [22], 33]",
        "child": []
    };
    expect(answer).toBe(testResult);
});

test("올바른 문자열인지 확인한다", () => {
    const testData1 = "[123, [22], 33]";
    const testData2 = "'1a'3'";
    const testResult = lexer.checkCorrectData(testData1);
    const answer = testData1;
    expect(answer).toBe(testResult);
});

test("Boolean Type을 확인한다", () => {
    const testData = "true";
    const testResult = lexer.checkType(testData);
    const answer = 'Boolean';
    expect(answer).toBe(testResult);
});

test("Object Type을 확인한다", () => {
    const testData = {};
    const testResult = lexer.checkType(testData);
    const answer = 'Object';
    expect(answer).toBe(testResult);
});

test("Array Type을 확인한다", () => {
    const testData = [];
    const testResult = lexer.checkType(testData);
    const answer = 'Number';
    expect(answer).toBe(testResult);
});

test("String Type을 확인한다", () => {
    const testData = "'";
    const testResult = lexer.checkType(testData);
    const answer = 'String';
    expect(answer).toBe(testResult);
});

test("Number Type을 확인한다", () => {
    const testData = "123";
    const testResult = lexer.checkType(testData);
    const answer = 'Number';
    expect(answer).toBe(testResult);
});

console.log("--------------------------------------------");
console.log("lexer.js 테스트가 완료되었습니다");
