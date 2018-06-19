
const {test} = require('./test');
const {expect} = require('./expect');
const {ArrayParser} = require('../function/arrayParser');
const arrayParser = ArrayParser("[123, [22], 33]");

console.log("arrayParser.js 테스트를 시작합니다");
console.log("--------------------------------------------");

test("타입을 올바르게 결정하는지 확인한다", () => {
    const testData = "[123, [22], 33]";
    const testResult = arrayParser.getResult(testData);
    const answer = {"type":"Array","child":[{"type":"Number","value":"123","child":[]},{"type":"Array","child":[{"type":"Number","value":"22","child":[]}]},{"type":"Number","value":"33","child":[]}]};

    expect(answer).toBe(testResult);
});

test("타입을 올바르게 분석하는지 확인한다", () => {
    const testData = "[123, [22], 33]";
    const testResult = arrayParser.getStats(testData);
    const answer = "타입 갯수를 분석하여 결과를 출력합니다\narray: 2\nstring: 0\nnull: 0\nboolean: 0\nobject: 0\nnumber: 3\n";

    expect(answer).toBe(testResult);
});

console.log("--------------------------------------------");
console.log("arrayParser.js 테스트가 완료되었습니다");









