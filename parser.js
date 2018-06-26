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

function isHaveArrKeyStrNum(value, arrKey, result) {
  if (value.match(/[0-9]/) && arrKey === 0 && !value.match(/(\[|\])/)) {
    return result.push(value);
  }
}

function isHaveArrKeyNoneBracketVal(value, arrKey, result) {
  if (arrKey !== 0 && !value.match(/(\[|\])/)) {
    return result[arrKey].push(value);
  }
}

function isHaveSquareBracketVal(value, arrKey, result) {
  if (value.match(/^(?=.*\[)(?=.*\]).*$/m)) {
    result.push(new Array);
    arrKey = result.length - 1;
    const delAllBracket = value.substring(1, value.length - 1);
    result[arrKey].push(delAllBracket);
  } else if (value.match(/^(?=.*\[).*$/m)) {
    return true;
  }
}

function isHaveCloseBracketVal(value, arrKey, result) {
  if (arrKey && value.match(/(\])/)) {
    const sliceStr = value.substr(value, value.length - 1);
    const resultArr = result[arrKey].push(sliceStr);
    return resultArr;
  } else if (arrKey === 0 && value.match(/(\])/)) {
    const sliceStr = value.substr(value, value.length - 1);
    const resultArr = result.push(sliceStr);
    return resultArr;
  }
}

function isHaveArrKeyCloseBracketVal(arrKey, value) {
  return arrKey !== 0 && value.match(/(\])/);
}


function isHaveStrArr(value, arrKey, result) {
  if (value.match(/(\[)/)) {
    const delSquareBracket = value.substring(1);
    result.push(new Array);
    arrKey = result.length - 1;
    result[arrKey].push(delSquareBracket);
    console.log(value, 'square Bracket', result)
  } else if (value.match(/(\])/)) {
    const delCloseBracket = value.substr(value, value.length - 1);
    result[arrKey].push(delCloseBracket);
    arrKey = 0;
    console.log(value, 'close Bracket')
  } else if (value.match(/^(?=.*\[)(?=.*\]).*$/m)) {
    result.push(new Array);
    arrKey = result.length - 1; 
    const delAllBracket = value.substr(1, value.length - 1); 
    result[arrKey].push(delAllBracket);
    arrKey = 0;
    console.log(value, 'all Bracket')
  }
  return result;
}

function isNoneStrArr(value, result) {
  if (value.match(/^(?!.*\[)(?!.*\]).*$/m)) {
    result.push(value);
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

// pasing시 조건
function parsingObj(splitData, arrKey, result) {
  for (let key in splitData) {
    const value = splitData[key];

    if (isHaveArrKey(value, arrKey)) {
      result[arrKey].push(value);
      isHaveStrArr(value, result)
      isHaveStrArr(value, arrKey, result);
    } else if (isNoneArrKey(value, arrKey)) {
      isNoneStrArr(value, result)
    }

  }
  return result;
}

function getArrayParser(str) {
  const checkErrorBracket = getCheckErrorBlock(str);

  if (checkErrorBracket === true) {
    const filteringData = getFilterData(str);
    const splitData = filteringData.split(',');

    console.log(splitData)
    let result = [];
    let arrKey = 0;
    const resultObj = parsingObj(splitData, arrKey, result);
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
const testcase8 = '[[],[]]'
const testcase9 = '[[1]]';
const testcase10 = '[11, [22], 33]';

// const errorcase1 = '[3213, 2';
// const errorcase2 = ']3213, 2[';
// const errorcase3 = '[1, 55, 3]]';

// const testcase10 = '[1, [[2]]]';
// const testcase11 = '[123,[22,23,[11,[112233],112],55],33]';

const test1 = getResultObj(testcase1);
const test2 = getResultObj(testcase2);
const test3 = getResultObj(testcase2);
const test4 = getResultObj(testcase7);
const test5 = getResultObj(testcase8);
const test6 = getResultObj(testcase9);
// console.log(test1);
// console.log(test2);
// console.log(test3);
// console.log(test4);
// console.log(test5);
// console.log(JSON.stringify(test1, null, 2));