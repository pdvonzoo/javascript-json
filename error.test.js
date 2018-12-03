const testHelper = require('./test_helper.js');
const ErrorChecker = require('./error.js');
const errorChecker = new ErrorChecker();

const expect = testHelper.expect;
const test = testHelper.test;

test('문자열, 배열, 객체의 특수문자가 올바르게 열리고 닫히는지 체크', function(){
    const value = "[asd,'cdsac',{asd:dfg}]"
    const result = errorChecker.validateClosing(value);
    return expect(true).toBe(result);
})
test('객체 안의 콜론이 정상적으로 있는지 체크', function(){
})