const commandMSG = {
  noneData: 'none Data',
};

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

class result {
  constructor({
    type,
    value,
    child
  }) {
    this.type = type;
    this.value = value;
    this.child = this.isChild(child);
  }

  isChild() {
    this.type = dataType.array,
      this.value = dataType.arrayObj
  }
}

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

function isHaveArrKeyStrNum(strElement, arrKey) {
  return strElement.match(/[0-9]/) && arrKey === 0 && !strElement.match(/(\[|\])/);
}

function isHaveSquareBracketVal(strElement) {
  return strElement.match(/(\[)/);
}

function isHaveArrKeyNoneBracketVal(arrKey, strElement) {
  return arrKey && !strElement.match(/(\[|\])/) && strElement !== ',';
}

function isHaveNoneArrKeyCloseBracketVal(arrKey, strElement) {
  return arrKey === 0 && strElement.match(/(\])/);
}

function isHaveArrKeyCloseBracketVal(arrKey, strElement) {
  return arrKey && strElement.match(/(\])/);
}

function dataParser(str) {
  const checkErrorBracket = getCheckErrorBlock(str);

  if (checkErrorBracket === true) {
    const filteringData = getFilterData(str);
    const splitData = filteringData.split(',');

    let result = [];
    let arrKey = 0;

    for (let key in splitData) {
      const value = splitData[key];

      if (isHaveArrKeyStrNum(value, arrKey)) result.push(value);
      else if (isHaveSquareBracketVal(value)) {
        result.push(new Array);
        arrKey = result.length - 1;
        result[arrKey].push(value.substring(1));
      } else if (isHaveArrKeyNoneBracketVal(arrKey, value)) result[arrKey].push(value)

      else if (isHaveNoneArrKeyCloseBracketVal(arrKey, value)) {
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
}

// child data Type 분류
function getChildDataType(strData) {
  const parsing = dataParser(strData)

  let child = [];
  for (let value of parsing) {
    let isArray = Object.prototype.toString.call(value);

    if (isArray === '[object Array]') {
      childOfChildData = {
        type: 'Array',
        value: 'ArrayObject',
        child: []
      };
      value.forEach(value => {
        childOfChildData.child.push({
          type: dataType.number,
          value: value
        })
      });
      child.push(childOfChildData);
    } else {
      childData = {
        type: dataType.number,
        value: value,
      };
      child.push(childData);
    }
  }
  return child;
}

// 오류 check parser로 보냄. 
function arrayParser(word) {
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
const errorcase1 = '[3213, 2';
const errorcase2 = ']3213, 2[';
const errorcase3 = '[1, 55, 3]]';

// const testcase7 = '[1, [[2]]]';
// const testcase6 = '[123,[22,23,[11,[112233],112],55],33]';

const test = arrayParser(testcase1);
console.log(JSON.stringify(test, null, 2));