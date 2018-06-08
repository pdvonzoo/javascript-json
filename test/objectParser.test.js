const {test} = require('./test');
const {expect} = require('./expect');
const {ObjectParser} = require('../function/objectParser');
const objectParser = ObjectParser("{key : 'innervalue', newkeys: [1,2,3,4,5]}]}");

console.log("objectParser.js 테스트를 시작합니다");
console.log("--------------------------------------------");

test("괄호({ })타입을 올바르게 결정하는지 확인한다", () => {
    const testData = "[123, [22], 33]";
    const testResult = objectParser.getResult(testData);
    const answer = {"type":"Object","key":"key ","value":" 'innervalue'","key2":" newkeys","value2":"]"};
    expect(answer).toBe(testResult);
});

console.log("--------------------------------------------");
console.log("objectParser.js 테스트가 완료되었습니다");