const dataType = {
  array: 'Array',
  object: 'Object',
  arrayObj: 'Array Object',
  number: 'Number',
  string: 'String',
  null: null,
};

const ERROR_MSG = {
  BLOCK_ERROR: 'BLOCK ERROR',
  TYPE_ERROR: 'TYPE ERROR'
};

// block error 확인
function getCheckErrorBlock(arrWord) {
  let arrBracket = 0;
  const splitWord = arrWord.split('');

  splitWord.forEach(matchArrVal => {
    if (matchArrVal === '[') arrBracket++;
    if (matchArrVal === ']') {
      if (arrBracket === 0) throw new Error(ERROR_MSG.BLOCK_ERROR);
      arrBracket--;
    }
  });

  if (arrBracket === 0) {
    return true;
  }
  throw new Error(ERROR_MSG.BLOCK_ERROR);
}

// string token에 불필요한 조건 데이터 filter
function getFilterData(data) {
  let delOutsideArr = '';
  let splitData = '';

  if (data.match(/(\[|\])/)) {
    delOutsideArr = data.substring(1, data.length - 1);
    splitData = delOutsideArr.split('');
  } else {
    splitData = data.split('');
  }
  let filteringData = splitData.filter(element => {
    return element !== ' ';
  }).reduce((accData, index) => {
    return accData + index;
  });
  return filteringData;
}

// 배열 기호 token이 섞이지 않은 아닌 순수한 숫자 token 
function isNoneArrStrOfArrKey(value, arrKey, result) {
  if (value.match(/^(?!.*\[)(?!.*\]).*$/m) && arrKey === 0) {
    result.push(value);
  } else if (value.match(/^(?!.*\[)(?!.*\]).*$/m) && arrKey > 0) {
    result[arrKey].push(value);
  }
  return result;
}

// arrKey를 가지고 있는가 아닌가?
function isHaveArrKey(value, arrKey) {
  return arrKey > 0 && value.match(/[0-9]/);
}

function isNoneArrKey(value, arrKey) {
  return arrKey === 0 && value.match(/[0-9]/);
}

// 괄호 token 조건 함수
function isAllBracket(value) {
  return value.match(/^(?=.*\[)(?=.*\]).*$/m);
}

function isSquareBracket(value) {
  return value.match(/(\[)/);
}

function isCloseBracket(value) {
  return value.match(/(\])/);
}

// bracket Check test 함수
function isHaveStrBracket(value) {
  return value.match(/^(?=.*\[)|(?=.*\]).*$/m) || value.match(/^(?=.*\[)(?=.*\]).*$/m);
}

function getNullValInArray(value, result) {
  if (value.match(/^(?=.*\[)(?!.*[0-9])(?=.*\]).*$/m)) {
    const emptyArr = result.push(new Array);
    return emptyArr;
  }
}

// arrKey 값을 세팅
function setArrKeyVal(value, arrKey, result) {
  if (isAllBracket(value) || isCloseBracket(value)) {
    return arrKey = 0;
  } else if (isSquareBracket(value)) {
    return arrKey = result.length - 1;
  }
}

// 해당 값을 result 배열에 넣고 반환
function getResultArr(value, arrKey, result) {
  if (isAllBracket(value)) {
    result.push(new Array);
    arrKey = result.length - 1;
    const delAllBracket = value.substring(1, value.length - 1);
    result[arrKey].push(delAllBracket);
  } else if (isCloseBracket(value)) {
    const delCloseBracket = value.substr(value, value.length - 1);
    result[arrKey].push(delCloseBracket);
  } else if (isSquareBracket(value)) {
    const delSquareBracket = value.substring(1);
    result[arrKey].push(delSquareBracket);
  }
  return result;
}

// pasing시 조건
function parsingObj(splitData) {
  let result = [];
  let arrKey = 0;

  for (let key in splitData) {
    const value = splitData[key];

    getNullValInArray(value, result);

    /*
      TODO:
        > parsingObj 함수 크기 줄이기 []
        > 괄호별 중복 문제 refactoring 진행하기 []
    */ 
    if (isNoneArrKey(value, arrKey)) {
      // array Token을 가지고 있을 경우( '[', ']', '[ ]') 
      if (isHaveStrBracket(value)) {
        if (isAllBracket(value)) {
          getResultArr(value, arrKey, result);
          arrKey = 0;
        } else if (isCloseBracket(value)) {
          getResultArr(value, arrKey, result);
          arrKey = 0;
        } else if (isSquareBracket(value)) {
          result.push(new Array);
          arrKey = result.length - 1;
          getResultArr(value, arrKey, result);
        }
      } else {
        isNoneArrStrOfArrKey(value, arrKey, result);
      }
    } else if (isHaveArrKey(value, arrKey)) {
      if (isHaveStrBracket(value)) {
        if (isAllBracket(value)) {
          getResultArr(value, arrKey, result);
          arrKey = 0;
        } else if (isCloseBracket(value)) {
          getResultArr(value, arrKey, result);
          arrKey = 0; 
        } else if (isSquareBracket(value)) {
          result.push(new Array);
          arrKey = result.length - 1;
          getResultArr(value, arrKey, result);
        }
      } else {
        isNoneArrStrOfArrKey(value, arrKey, result);
      }
    }
  }
  return result;
}

function getArrayParser(str) {
  const checkErrorBracket = getCheckErrorBlock(str);

  if (checkErrorBracket === true) {
    const filteringData = getFilterData(str);
    const splitData = filteringData.split(',');

    const resultObj = parsingObj(splitData);
    return resultObj;
  }
}

function getChildOfChildObj(value, child) {
  let childOfChildData = {
    type: 'Array',
    value: 'ArrayObject',
    child: []
  };
  value.forEach(value => {
    if (value.length === 0) return dataType.null;
    childOfChildData.child.push({
      type: dataType.number,
      value: value
    });
  });
  return child.push(childOfChildData);
}

function getChildObj(value, child) {
  let childData = {
    type: dataType.number,
    value: value,
  };
  return child.push(childData);
}

// child data Type 분류
function getChildTokenType(strData) {
  const parsing = getArrayParser(strData);

  let child = [];

  for (let value of parsing) {
    let isArray = Object.prototype.toString.call(value);
    (isArray === '[object Array]') ? getChildOfChildObj(value, child): getChildObj(value, child);
  }
  return child;
}

// 오류 check parser로 보냄. 
function getResultObj(word) {
  const checkArr = getCheckErrorBlock(word);

  if (checkArr === true) {
    const parserObjResult = {
      type: dataType.array,
      child: getChildTokenType(word),
    };
    return parserObjResult;
  }
}

const testcase1 = '[1, 2,[3,4, 5]]';
const testcase2 = '[12, [14, 55], 15]';
const testcase3 = '[1, [55, 3],[]]';
const testcase4 = '[1,3,[1,2],4,[5,6],7]';
const testcase5 = '[[1123, 354445324328103829],[1,2],4,[5,6]]';
const testcase6 = '12345';
const testcase7 = '[[]]';
const testcase8 = '[[],[],4,[6,5,87],[78]]';
const testcase9 = '[[1],[2,3]]';
const testcase10 = '[11, [22], 33]';

// const errorcase1 = '[3213, 2';
// const errorcase2 = ']3213, 2[';
// const errorcase3 = '[1, 55, 3]]';

// const testcase10 = '[1, [[2]]]';
// const testcase11 = '[123,[22,23,[11,[112233],112],55],33]';

const test1 = getResultObj(testcase1);
const test2 = getResultObj(testcase2);
const test3 = getResultObj(testcase3);

const test4 = getResultObj(testcase4);
const test5 = getResultObj(testcase5);
const test6 = getResultObj(testcase6);

const test7 = getResultObj(testcase7);
const test8 = getResultObj(testcase8);
const test9 = getResultObj(testcase9);
const test10 = getResultObj(testcase10);

console.log(JSON.stringify(test10, null, 2));