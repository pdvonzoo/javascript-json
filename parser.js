/*
  1. 중첩된 괄호가 비어있거나 부족한 괄호가 있으면 에러를 출력 올바르면 true가 반환되어 stackData 함수 실행
  2. 괄호가 발견되면 Stack Class에 DataStructure Class에 객체를 Stack에 쌓는다
  3. ','와 ']' 괄호가 조건이 되고 temp 변수에 데이터가 있다면,
      stack의 마지막 데이터의 child에 데이터와 데이터 타입 객체를 push 하고 초기화 
  4. ']' 괄호가 조건이 되면 stack의 마지막 데이터를 pop하고 마지막 stack에 있는 child에 push 반복
*/

const dataType = {
  array: 'Array',
  object: 'Object',
  arrayObj: 'Array Object',
  number: 'Number',
  string: 'String',
  null: null
};

const ERROR_MSG = {
  BLOCK_ERROR: 'BLOCK ERROR',
  TYPE_ERROR: 'TYPE ERROR'
};

class DataStructure {
  constructor(type, value) {
    this.type = type;
    this.value = value;
    this.child = [];
  }
}

class Stack {
  constructor() {
    this.stack = [];
  }

  addData(data) {
    this.stack.push(data);
  }

  popData() {
    return this.stack.pop();
  }

  pushChild(child) {
    if (this.stack.length === 0) return child;
    let lastDataStructure = this.stack[this.stack.length - 1];
    lastDataStructure.child.push(child);
  }
}

function checkBlockError(arrWord) {
  let BracketPoint = 0;
  const splitWord = arrWord.split('');

  splitWord.forEach(matchBrackets => {
    if (matchBrackets === '[') BracketPoint++;
    if (matchBrackets === ']') {
      if (BracketPoint === 0) throw new Error(ERROR_MSG.BLOCK_ERROR);
      BracketPoint--;
    }
  });
  if (BracketPoint === 0) {
    return true;
  }
  throw new Error(ERROR_MSG.BLOCK_ERROR);
}

function isOpenBrackets(value) {
  const openBrackets = ['['];
  return openBrackets.indexOf(value) > -1;
}

function isCommaOrCloseBrackets(value) {
  const closeBrackets = [']'];
  return closeBrackets.indexOf(value) > -1 || value === ',';
}

function isCloseBrackets(value) {
  const closeBrackets = [']'];
  return closeBrackets.indexOf(value) > -1;
}

// parsing 기능
function stackData(strData) {
  const stack = new Stack();
  let temp = '';

  for (let key in strData) {
    const value = strData[key];

    if (isOpenBrackets(value)) {
      stack.addData(new DataStructure(dataType.array, dataType.arrayObj));
    } else if (isCommaOrCloseBrackets(value)) {
      temp ? stack.pushChild(new DataStructure(dataType.number, temp)) : null;
      temp = '';
      if (isCloseBrackets(value)) temp = stack.pushChild(stack.popData());
    } else {
      temp = temp + value.trim();
    }
  }
  return temp;
}

function parsingObj(strData) {
  const checkError = checkBlockError(strData);

  if (checkError === true) {
    const parsingResult = {
      type: dataType.array,
      child: stackData(strData)
    };
    return parsingResult;
  }
}

const testcase1 = '[11, 22,[3,41, 5]]';
const testcase2 = '[12, [14, 55], 15]';
const testcase3 = '[1, [55, [3]],[]]';
const testcase4 = '[1,3,[1,21,[2, 4324,[543, 432]]],324,[51,63],7]';
const testcase5 = '[[1123, 354445324328103829,[1, 2, [3],4,5,6]],[1,2],4,[5,6]]';
const testcase6 = '12345';
const testcase7 = '[[[]]]';
const testcase8 = '[[],[],4,[6,5,87],[78]]';
const testcase9 = '[[1],[[2],3]]';
const testcase10 = '[11, [22], 33]';
const testcase11 = '[[[[1,[],2]],[]]]';
const testcase12 = '[1, [[2]]]';
const testcase13 = '[123,[22,23,[11,[112233],112],55],33]';
const testcase14 = '[[[[12]]]]';


const errorcase1 = '[3213, 2';
const errorcase2 = ']3213, 2[';
const errorcase3 = '[1, 55, 3]]';
const errorcase4 = '[[[p, []]]';

const test1 = parsingObj(testcase1);
const test2 = parsingObj(testcase2);
const test3 = parsingObj(testcase3);

const test4 = parsingObj(testcase4);
const test5 = parsingObj(testcase5);
const test6 = parsingObj(testcase6);

const test7 = parsingObj(testcase7);
const test8 = parsingObj(testcase8);
const test9 = parsingObj(testcase9);

const test10 = parsingObj(testcase10);
const test11 = parsingObj(testcase11);
const test12 = parsingObj(testcase12);

const test13 = parsingObj(testcase13);
const test14 = parsingObj(testcase14);

// const errorTest1 = parsingObj(errorcase1);
// const errorTest2 = parsingObj(errorcase2);
// const errorTest3 = parsingObj(errorcase3);
// const errorTest4 = parsingObj(errorcase4);

console.log(JSON.stringify(test14, null, 2));