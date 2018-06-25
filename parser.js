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
  if (arrKey && !value.match(/(\[|\])/)) {
    return result[arrKey].push(value);
  }
}

function isHaveSquareBracketVal(value) {
  return value.match(/(\[)/);
}

function isHaveNoneArrKeyCloseBracketVal(arrKey, value) {
  return arrKey === 0 && value.match(/(\])/);
}

function isHaveArrKeyCloseBracketVal(arrKey, value) {
  return arrKey && value.match(/(\])/);
}

function parsingObj(splitData, arrKey, result) {
  for (let key in splitData) {
    const value = splitData[key];

    isHaveArrKeyStrNum(value, arrKey, result);
    isHaveArrKeyNoneBracketVal(value, arrKey, result);

    if (isHaveSquareBracketVal(value)) {
      result.push(new Array);
      arrKey = result.length - 1;
      const delCloseBracket = value.substring(1, value.length - 1);
      const delSquareBracket = value.substring(1);
      value.match(/[\]]/g) ? result[arrKey].push(delCloseBracket) : result[arrKey].push(delSquareBracket);

    } else if (isHaveNoneArrKeyCloseBracketVal(arrKey, value)) {
      const sliceStr = value.substr(value, value.length - 1);
      result[arrKey].push(sliceStr);

    } else if (isHaveArrKeyCloseBracketVal(arrKey, value)) {
      const sliceStr = value.substr(value, value.length - 1);
      result[arrKey].push(sliceStr);
      arrKey = 0;
    }
  }
  return result;
}

function arrayParser(str) {
  const checkErrorBracket = getCheckErrorBlock(str);

  if (checkErrorBracket === true) {
    const filteringData = getFilterData(str);
    const splitData = filteringData.split(',');

    let result = [];
    let arrKey = 0;
    const objResult = parsingObj(splitData, arrKey, result);
    return objResult;
  }
}

function childOfChildData(value, child) {
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

function childData(value, child) {
  let childData = {
    type: dataType.number,
    value: value,
  };
  return child.push(childData);
}

// child data Type 분류
function getChildDataType(strData) {
  const parsing = arrayParser(strData);

  let child = [];

  for (let value of parsing) {
    let isArray = Object.prototype.toString.call(value);
    (isArray === '[object Array]') ? childOfChildData(value, child): childData(value, child);
  }
  return child;
}

// 오류 check parser로 보냄. 
function getObjectData(word) {
  const checkArr = getCheckErrorBlock(word);

  if (checkArr === true) {
    const parsingData = {
      type: dataType.array,
      child: getChildDataType(word),
    };
    return parsingData;
  }
}

const testcase1 = '[1, 2,[3,4, 5]]';
const testcase2 = '[12, [14, 55], 15]';
const testcase3 = '[1, [55, 3]]';
const testcase4 = '[1,3,[1,2],4,[5,6]]';
const testcase5 = '[[1123, 354445324328103829],[1,2],4,[5,6]]';
const testcase6 = '12345';
const testcase7 = '[[]]';
const testcase8 = '[[1]]';
const errorcase1 = '[3213, 2';
const errorcase2 = ']3213, 2[';
const errorcase3 = '[1, 55, 3]]';


// const testcase9 = '[1, [[2]]]';
// const testcase10 = '[123,[22,23,[11,[112233],112],55],33]';

const test = getObjectData(testcase1);
console.log(JSON.stringify(test, null, 2));