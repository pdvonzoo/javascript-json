const commandMSG = {
  noneData: 'none Data',
  array: 'Array',
  object: 'Object;',
  blockError: 'BLOCK ERROR',
  typeError: 'TYPE ERROR'
};

// sublutin fun1 - getChildDataType
function isArrayTypeValueChangeElement(wordElement) {
  return wordElement.replace(/(\[|\])/g, '').trim();
}
// sublutin fun2 - getChildDataType
function getCheckNumber(wordData) {
  return wordData.search(/(0-9)/) ? 'Number' : false;
}

// child 안의 child Data 값 확인 
function getInChildDataType(inStringData) {
  let stringWord = isArrayTypeValueChangeElement(inStringData);
  let inChildData = {
    type: 'Array',
    value: 'ArrayObject',
    child: [{
      type: getCheckNumber(inStringData),
      value: stringWord,
      child: []
    }]
  }
  return inChildData;
}

// 데이터 형태 확인 및 데이터 값 반환 child 데이터의 유무 확인 
function getChildDataType(typeCheck, wordArr) {
  if (typeCheck === 'Array') {
    const splitData = wordArr.split(',');
    let childArr = [];

    for (let value in splitData) {
      let stringWord = splitData[value];
      if (stringWord.match(/(\[|\])/g)) {
        const inChildData = getInChildDataType(stringWord);
        childArr.push(inChildData);
      } else if (stringWord.match(/[0-9]/)) {
        let childData = {
          type: getCheckNumber(stringWord),
          value: stringWord
        }
        childArr.push(childData);
      }
    }
    return childArr;
  }
}

// block error 확인
function getCheckErrorBlock(arrWord) {
  let arrBracket = 0;
  const splitWord = arrWord.split("");

  splitWord.forEach(matchArrVal => {
    if (matchArrVal === '[') arrBracket++;
    if (matchArrVal === ']') arrBracket--;
  });

  if (arrBracket % 2 === 0) {
    let checkType = {
      type: commandMSG.array,
      child: getChildDataType(commandMSG.array, arrWord)
    }
    return checkType;
  }
  throw new Error(commandMSG.blockError);
}

// filtering Black in Arr Data
function getDeleteInBlankData(word) {
  const delOutsideArr = word.substring(1, word.length - 1);
  const split = delOutsideArr.split("");

  const result = split.filter(element => {
    return element !== " ";
  }).reduce((accData, element) => {
    return accData + element;
  });

  return result;
}

// 각각에 데이터함수에서 데이터 확인
function ArrayParser(word) {
  const delBlankArr = getDeleteInBlankData(word);
  const typeCheck = getCheckErrorBlock(delBlankArr);

  const parsingData = {
    type: typeCheck.type,
    child: typeCheck.child
  };
  return parsingData;
}

// const str = '[123, 22, 33, 4,[5,6],[7]]';
// const strArr = '[[3],123, 22, 33, 4,[5,6],7]';
// const strArr2 = '[132132, 2321,32111,32942,3211,1,4,65,6,8,9,1,2,3,4,5,6,7,8,9]';
const strArr3 = '[132132, [2321,32111],32942,[3211,1],4,65,6,8,9,1,2,[3,4],5,6,7,8,9]';


// const result = new ArrayParser(str);
// const resultFirst = new ArrayParser(strArr);
// const resultSecond = new ArrayParser(strArr2);
const resultThird = new ArrayParser(strArr3);


// console.log(JSON.stringify(result, null, 2));
// console.log(JSON.stringify(resultFirst, null, 2));
// console.log(JSON.stringify(resultSecond, null, 2));
console.log(JSON.stringify(resultThird, null, 2));
