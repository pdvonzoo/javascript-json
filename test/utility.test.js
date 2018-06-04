
const {test} = require('./test');
const {expect} = require('./expect');
const util = require('../function/utility');

console.log("Utility.js 테스트를 시작합니다");
console.log("--------------------------------------------");

test("String Data를 한 문자씩 쪼갠다", () => {
    const testData = "[123, [22], 33]";
    const testResult = util.divideString(testData);
    const answer = ["[","1","2","3",","," ","[","2","2","]",","," ","3","3","]"];

    // console.log(JSON.stringify(testResult, null, 2));
    expect(answer).toBe(testResult);
});

console.log("--------------------------------------------");
console.log("Utility.js 테스트가 완료되었습니다");