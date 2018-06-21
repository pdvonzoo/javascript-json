
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

test("괄호 갯수를 조정하는 함수를 호출 후, 클래스 내에서 값이 정상적으로 바뀌는지 확인한다", () => {
    arrayParser.setSquareBracketCount(3, 0);
    arrayParser.adjustBracketCount();
    const testResult = arrayParser.getSquareBracketPairCount();
    const answer = {"start":2,"end":0};

    expect(answer).toBe(testResult);
});

test("2개 이상의 시작괄호 조건을 검사한다", () => {
    arrayParser.setSquareBracketCount(2, 0);
    const testResult = arrayParser.checkTwoMoreSquareBracket();
    const answer = true;

    expect(answer).toBe(testResult);
});

test("시작한 괄호가 닫히는 문자인지 확인한다", () =>{
    arrayParser.setSquareBracketCount(2, 1);
    const testResult = arrayParser.closedInnerSquareBracket();
    const answer = true;

    expect(answer).toBe(testResult);
});

test("Type을 결정하고, resultObject에 추가되는 값이 정상적인지 확인한다", () => {
    arrayParser.setMergeData("123");
    arrayParser.determineType();
    const testResult = arrayParser.getResultObject();
    const answer = {"type":"Array","child":[{"type":"Number","value":"123","child":[]},{"type":"Array","child":[{"type":"Number","value":"22","child":[]}]},{"type":"Number","value":"33","child":[]},{"type":"Number","value":"123","child":[]}]};
    
    expect(answer).toBe(testResult);
});

test("재귀가 동작하는지, 정상적인 결과값을 반환하는지 확인한다", () => {
    arrayParser.setResultObject({
        type: null,
        child: [],
    });
    const testResult = JSON.stringify(arrayParser.recursionCase("{a:'str'}"));
    const answer = "{\"type\":\"Object\",\"key\":\"a\",\"value\":\"'str'\"}";
    
    expect(answer).toBe(testResult);    
});

console.log("--------------------------------------------");
console.log("arrayParser.js 테스트가 완료되었습니다");









