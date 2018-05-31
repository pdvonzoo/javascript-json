const { DataStructure } = require('./structure');
const { Syntax } = require('./checker');
const { arrayParser } = require('./parser');
const { jsonParser } = require('./parser');
const FORMAT = {
  ARRAY: function (testValue, expectValue, errorArray) {
    const errorMessage = `FAIL
  상세내용
  검출된 에러 : ${errorArray.length}개
  ${errorArray.join('\r')}
  `
    return errorMessage;
  },
  TYPE_DISCORD: function (typeOfExpect, typeOfTest) {
    const errorMessage = `
    기대값과 테스트값의 타입이 불일치 합니다
    expect : ${typeOfExpect}
    test : ${typeOfTest}
    `
  }

}
exports.test = function (testCase, valueFunction) {
  console.log(testCase, valueFunction.call(this));
}

exports.expect = function (expectValue) {
  const fn = {
    toBe(testValue) {
      const typeOfExpect = toString.call(expectValue);
      const typeOfTest = toString.call(testValue);
      if (typeOfExpect !== typeOfTest) FORMAT.TYPE_DISCORD(typeOfExpect, typeOfTest);
      let completedMessage = '';
      if (typeOfExpect === '[object Array]') completedMessage = compareArrayType(expectValue, testValue);
      else if (typeOfExpect === '[object Object]') completedMessage = compareObjectType(expectValue, testValue);
      else completedMessage = (testValue === expectValue) ? 'OK'
        : `FAIL targetValue : ${testValue} expectValue : ${expectValue}`;
      return completedMessage;
    }
  }
  function compareArrayType(expectValue, testValue) {
    let errorArray = [];
    comparingArray(expectValue, testValue, errorArray);
    const completedMessage = !errorArray.length ?
      'OK' : FORMAT.ARRAY(testValue, expectValue, errorArray);
    return completedMessage;
  }
  function compareObjectType(expect, test) {
    let errorArray = [];
    let expectKey = Object.keys(expect);
    let testKey = Object.keys(test);
    let expectValue = Object.values(expect);
    let testValue = Object.values(test);
    comparingArray(expectKey, testKey, errorArray);
    comparingArray(expectValue, testValue, errorArray);
    const completedMessage = !errorArray.length ?
      'OK' : FORMAT.ARRAY(testValue, expectValue, errorArray);
    return completedMessage;
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
function compareObjectType(expect, test) {
  let errorArray = [];
  let expectKey = Object.keys(expect);
  let testKey = Object.keys(test);
  let expectValue = Object.values(expect);
  let testValue = Object.values(test);
  comparingArray(expectKey, testKey, errorArray);
  comparingArray(expectValue, testValue, errorArray);
  const completedMessage = !errorArray.length ?
    'OK' : FORMAT.ARRAY(testValue, expectValue, errorArray);
  return completedMessage;
}