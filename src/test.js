const { DataStructure } = require('./structure');
const { Syntax } = require('./checker');
const { arrayParser } = require('./parser');
const { jsonParser } = require('./parser');
const FORMAT = {
  ARRAY: function (testValue, expectValue, errorArray) {
    const errorMessage = `
  FAIL 
  (targetValue : ${testValue}, expectValue : ${expectValue})
  
  상세내용
  검출된 에러 : ${errorArray.length}개
  ${errorArray.join('\r')}
  `
    return errorMessage;
  }

}
exports.test = function (testCase, valueFunction) {
  console.log(testCase, valueFunction.call(this));
}

exports.expect = function (expectValue) {
  const fn = {
    toBe(testValue) {
      let errorArray = [];
      comparingArray(expectValue, testValue, errorArray);
      const completedMessage = !errorArray.length ?
        'OK' : FORMAT.ARRAY(testValue, expectValue, errorArray)
        ;
      return completedMessage;
    }
  }
  return fn;
}

function comparingArray(expectCode, testCode, errorArray) {
  expectCode.forEach((cv, idx, arr) => {
    if (toString.call(cv) === '[object Object]') {
      comparingArray(Object.keys(cv), Object.keys(testCode[idx]), errorArray);
      comparingArray(Object.values(cv), Object.values(testCode[idx]), errorArray);
    } else if (toString.call(cv) === '[object Array]') {
      comparingArray(cv, testCode[idx], errorArray);
    } else if (cv !== testCode[idx]) errorArray.push(`
    검출 배열 : ${arr}배열의 ${idx}번째 Index
    expectValue = ${cv}
    targetValue = ${testCode[idx]}`);
  })
}