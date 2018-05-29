const DataStructure = require('./structure').DataStructure;
const Syntax = require('./checker').Syntax;
const arrayParser = require('./parser').ArrayParser;
const jsonParser = require('./parser').JsonParser;

function test(testCase, valueFunction) {
  console.log(`${testCase} : ${valueFunction()}`);
}

function expect(expectedValue) {
  const fn = {
    toBe(testValue, errorArray) {
      return !errorArray.length ? 'OK' : `FAIL (targetValue : ${testValue}, expectedValue : ${expectedValue})
      ${errorArray}`;
    }
  }
  return fn;
}

test('parser의 출력 내용', function () {
  const structure = new DataStructure(new Syntax(Syntax.errorMessage), arrayParser, jsonParser);
  const result = structure.parser("[[1,2,3,4],'a',{a:null,b:true,c:false}]");
  const expected = [
    [1, 2, 3, 4], 'a', {
      a: null,
      b: true,
      c: false
    }
  ];
  let errorArray = [];

  function comparing(expected, result) {
    expected.forEach((cv, idx) => {
      if (toString.call(cv) === '[object Array]') {
        comparing(cv, result[idx]);
      } else if (cv !== result[idx]) errorArray.push(`${idx}번째 ${cv}값이 같지 않습니다`);
    })
  }
  comparing(expected, result);
  console.log(expected);
  console.log(result);
  // return errorArray.length ? 'OK' : errorArray;
  return expect(expected).toBe(result, errorArray);
});
// console.log(expect(30).toBe(20));