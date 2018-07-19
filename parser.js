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

class dataStuctureObj {
  constructor(type, value, child) {
    this.type = type;
    this.value = value;
    this.child = child;
  }

  getChild() {
    this.childArr = [];
  }
}


class Stack {
  constructor() {
    this.list = [];
    this.top = 0;
  }

  stackPush(data) {
    if (data) this.list[this.top++].push(data);
    else this.list.push(new Array);
  }

  stackPop() {
    return this.list[--this.top];
  }

}

function checkBlockError(arrWord) {
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

function parsingData(strData) {
  let stackArr = [];
  let temp = '';

  const openBrackets = ['['];
  const closeBrackets = [']'];

  for (let key in strData) {
    const value = strData[key];

    // '[' 가 있으면 배열 생성 결과 배열에 push
    if (openBrackets.indexOf(value) > -1) { 
      stackArr.push(new Array);
    } else if (closeBrackets.indexOf(value) > -1) { 
      // ']' 가 있으면 결과 배열에서 pop해 빼고 마지막 배열의 끝에 push 
      temp !== '' ? stackArr[stackArr.length - 1].push(temp) : null;
      temp = stackArr.pop();
    } else if (value === ',') { 
      // ',' 가 있으면 합쳐진 문자열을 결과 배열에 push 
      temp !== '' ? stackArr[stackArr.length - 1].push(temp) : null;
      temp = '';
    } else { 
      //  ',' 가 보이기 전의 token값을 하나씩 합쳐놓게 함
      temp = temp + value.trim();
    }
  }
  return temp;
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
function getChildTokenType(parsing) {
  let child = [];

  for (let value of parsing) {
    let isArray = Object.prototype.toString.call(value);
    (isArray === '[object Array]') ? getChildOfChildObj(value, child): getChildObj(value, child);
  }
  return child;
}


function parsingObj(strData) {
  const checkError = checkBlockError(strData);

  if (checkError === true) {
    // const splitData = strData.split('');
    const result = parsingData(strData);
    // const test = new getDataStuctureObj('Array', 'ArrayObject', result);
    return result;
  }
}

const testcase1 = '[1, 2,[3,4, 5]]';
const testcase2 = '[12, [14, 55], 15]';
const testcase3 = '[1, [55, 3],[]]';
const testcase4 = '[1,3,[1,2],4,[5,6],7]';
const testcase5 = '[[1123, 354445324328103829,[1, 2, [3],4,5,6]],[1,2],4,[5,6]]';
const testcase6 = '12345';
const testcase7 = '[[[]]]';
const testcase8 = '[[],[],4,[6,5,87],[78]]';
const testcase9 = '[[1],[2,3]]';
const testcase10 = '[11, [22], 33]';
const testcase11 = '[[[[1,[],2]],[]]]';
const testcase12 = '[1, [[2]]]';
const testcase13 = '[123,[22,23,[11,[112233],112],55],33]';

// const errorcase1 = '[3213, 2';
// const errorcase2 = ']3213, 2[';
// const errorcase3 = '[1, 55, 3]]';


// const test1 = parsingObj(testcase7);
// const test2 = parsingObj(testcase2);
// const test3 = parsingObj(testcase3);

// const test4 = parsingObj(testcase4);
// const test5 = parsingObj(testcase5);
// const test6 = parsingObj(testcase6);

// const test7 = parsingObj(testcase7);
// const test8 = parsingObj(testcase8);
// const test9 = parsingObj(testcase9);

// const test10 = parsingObj(testcase10);
const test11 = parsingObj(testcase11);
// const test12 = parsingObj(testcase12);
// const test13 = parsingObj(testcase13);

console.log(JSON.stringify(test11, null, 2));
