const {test} = require('./test');
const {expect} = require('./expect');
const printManager = require('../function/printManager');

console.log("printManager.js 테스트를 시작합니다");
console.log("--------------------------------------------");

test("정확한 타입갯수를 분석하는지 확인한다", () => {
    const testData = {"array":2,"string":0,"null":0,"boolean":0,"object":0,"number":3};
    const testResult = printManager.analyzeTypeData(testData);
    const answer = "타입 갯수를 분석하여 결과를 출력합니다\narray: 2\nstring: 0\nnull: 0\nboolean: 0\nobject: 0\nnumber: 3\n";
    expect(answer).toBe(testResult);
});

test("정확한 타입갯수를 분석하는지 확인한다 (틀린 답)", () => {
    const testData = {"array":2,"string":0,"null":0,"boolean":0,"object":0,"number":3};
    const testResult = printManager.analyzeTypeData(testData);
    const answer = "타입 갯수를 분석하여 결과를 출력합니다\narray: 1\nstring: 0\nnull: 0\nboolean: 0\nobject: 0\nnumber: 3\n";
    expect(answer).toBe(testResult);
});

test("정상적으로 JSON 포맷으로 반환하는지 확인한다", () => {
    const testData = {"array":2,"string":0,"null":0,"boolean":0,"object":0,"number":3};
    const testResult = printManager.printToJSON(testData);
    const answer = "{\n  \"array\": 2,\n  \"string\": 0,\n  \"null\": 0,\n  \"boolean\": 0,\n  \"object\": 0,\n  \"number\": 3\n}";
    expect(answer).toBe(testResult);
});

console.log("--------------------------------------------");
console.log("printManager.js 테스트가 완료되었습니다");