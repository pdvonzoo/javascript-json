const commandMSG = {
  noneData: 'none Data',
  array: 'Array',
  object: 'Object;'
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
    let checkType = {
      type: commandMSG.array,
      child: getDeleteOfBlank(arrWord)
    };
    return checkType;
  }
  throw new Error(ERROR_MSG.BLOCK_ERROR);
}

// filtering Black in Arr Data
function getDeleteOfBlank(word) {
  const delOutsideArr = word.substring(1, word.length - 1);
  const split = delOutsideArr.split('');

  const result = split.filter(element => {
    return element !== ' ';
  }).reduce((accData, element) => {
    return accData + element;
  });

  return getChildDataType(commandMSG.array, result);
}

// condition Number Check
function isNumber(stringWord) {
  if (stringWord.match(/[0-9]/)) return true;
}

// condition Array Check
function isArray(stringWord) {
  if (stringWord.match(/(\[|\])/)) return true;
}

// 데이터 형태 확인 및 데이터 값 반환 child 데이터의 유무 확인 
function getChildDataType(typeCheck, stringWord) {
  if (typeCheck !== 'Array') throw new Error(ERROR_MSG.TYPE_ERROR);

  if (typeCheck === 'Array') {
    const splitData = stringWord.split(',');
    const test = stringWord.split('');
    const filtering = test.filter(value => {
      return value !== ',';
    });

    let childArr = [];

    let bracket = 0;
    for (let key in filtering) {

      if(filtering[key] === '['){
        bracket++;
      } else if(filtering[key] === ']'){
        bracket--;
      }
      if(bracket !== 0){
        childArr.push(filtering[key]);
      } else {
        console.log(filtering[key], "일반 데이터")
      }
    }
    console.log(childArr)

    for (let key in splitData) {
      let stringWord = splitData[key];

      if (isArray(stringWord)) {
        const childOfChild = getChildOfChildDataType(stringWord);
        childArr.push(childOfChild);

      } else if (isNumber(stringWord)) {
        let childData = {
          type: getCheckNumber(stringWord),
          value: stringWord
        };
        childArr.push(childData);
      }
    }
    return childArr;
  }
}

// sublutin fun1 - getChildDataType
function arrTypeValueChangeElement(wordElement) {
  return wordElement.replace(/(\[|\])/g, '').trim();
}

// sublutin fun2 - getChildDataType
function getCheckNumber(wordData) {
  return wordData.search(/(0-9)/) ? 'Number' : false;
}

// child 안의 child Data 값 확인
function getChildOfChildDataType(inStringData) {

  let stringWord = arrTypeValueChangeElement(inStringData);
  const childArr = [];

  const child = {
    type: getCheckNumber(inStringData),
    value: stringWord,
    child: []
  };
  childArr.push(child);

  let inChildData = {
    type: 'Array',
    value: 'ArrayObject',
    child: childArr
  };
  return inChildData;
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


const str = '[1,[2],[3,4,5]]';
// const strArr = '[[3],123, 22, 33, 4,[5,6],7]';
// const strArr2 = '[132132, 2321,32111,32942,3211,1,4,65,6,8,9,1,2,3,4,5,6,7,8,9]';
// const strArr3 = '[132132, [2321,32111],32942,[3211,1],4,65,6,8,9,1,2,[3,4],5,6,7,8,9]';

const result = new ArrayParser(str);
// const resultFirst = new ArrayParser(strArr);
// const resultSecond = new ArrayParser(strArr2);
// const resultThird = new ArrayParser(strArr3);

// console.log(JSON.stringify(result, null, 2));
// console.log(JSON.stringify(resultFirst, null, 2));
// console.log(JSON.stringify(resultSecond, null, 2));
// console.log(JSON.stringify(resultThird, null, 2));
