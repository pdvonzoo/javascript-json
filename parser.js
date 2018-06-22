const commandMSG = {
  noneData: 'none Data',
  array: 'Array',
  object: 'Object;'
};

const ERROR_MSG = {
  BLOCK_ERROR: 'BLOCK ERROR',
  TYPE_ERROR: 'TYPE ERROR'
};

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

function isHaveNoneArrKeyCloseBracketVal(arrKey, strElement){
  return arrKey === 0 && strElement.match(/(\])/);
}

function isHaveArrKeyCloseBracketVal(arrKey, strElement) {
  return arrKey && strElement.match(/(\])/);
}

function parser(str) {
  const filteringData = getFilterData(str);
  const splitData = filteringData.split(',');

  let result = [];
  let arrKey = 0;

  for (let key in splitData) {
    const value = splitData[key];

    if (isHaveArrKeyStrNum(value, arrKey)) result.push(value);

    if (isHaveSquareBracketVal(value)) {
      result.push(new Array);
      arrKey = result.length - 1;
      result[arrKey].push(value.substring(1));
    }

    if (isHaveArrKeyNoneBracketVal(arrKey, value)) result[arrKey].push(value);
    
    if(isHaveNoneArrKeyCloseBracketVal(arrKey, value)) {
      const sliceStr = value.substr(value, value.length - 1);
      result[arrKey].push(sliceStr);
    }

    if (isHaveArrKeyCloseBracketVal(arrKey, value)) {
      const sliceStr = value.substr(value, value.length - 1);
      result[arrKey].push(sliceStr);
      const temp = result.pop();
      result.push(temp);
      arrKey = 0;
    }
  }
  return result;
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
    const childData = parser(arrWord);
    let checkType = {
      type: commandMSG.array,
      child: childData 
    };
    return checkType;
  }
  throw new Error(ERROR_MSG.BLOCK_ERROR);
}

// 각각에 데이터함수에서 데이터 확인
function ArrayParser(word) {
  const checkArr = getCheckErrorBlock(word);

  const parsingData = {
    type: checkArr.type,
    child: checkArr.child
  };
  return parsingData;
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

// const testcase5 = '[1, [[2]]]';
// const testcase6 = '[123,[22,23,[11,[112233],112],55],33]';
// const result = parser(testcase3);
// console.log(JSON.stringify(result, null, 2));

const result2 = ArrayParser(testcase1);
console.log(JSON.stringify(result2, null, 2));
