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

class Stack {
  constructor() {
    this.stack = [];
  }

  pushStack(data) {
    this.stack[this.stack.length - 1].push(data);
    console.log(this.stack)
  }
}

class DataStructure {
  constructor(type, value, child) {
    this.type = type;
    this.value = value;
    this.child = child;
    this.stack = [];
  }

  pushChildArr(value) {
    this.child.push(value);
  }

  isArray(value) {
    const isArray = Object.prototype.toString.call(value);
    return isArray === '[object Array]';
  }

  test(value) {
    value.forEach(element => {
      (this.isArray(element)) ? console.log(dataType.array, element): console.log(dataType.number, element);
    });
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
  const stackArr = [];
  const stack = new Stack();
  let temp = '';

  for (let key in strData) {
    const value = strData[key];

    if (isOpenBrackets(value)) {
      stackArr.push(new DataStructure(dataType.array, dataType.arrayObj, new Array));
      // stack.pushStack(new DataStructure(dataType.array, dataType.arrayObj, new Array));
    } else if (isCommaOrCloseBrackets(value)) {
      temp !== '' ? stackArr[stackArr.length - 1].push(temp) : null;
      temp = '';
      /*
      TODO:
      [] - token 타입이 숫자를 제외한 배열 일때 type: Array, value: ArrayObject를 어떻게 출력 할지 고민..
      */
      if (isCloseBrackets(value)) temp = stackArr.pop();
    } else {
      temp = temp + value.trim();
    }
  }
  return temp;
}

function parsingObj(strData) {
  const checkError = checkBlockError(strData);

  if (checkError === true) {
    const test = new DataStructure();

    const parsingResult = {
      type: dataType.array,
      // child: test.test(stackData(strData)),
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
const testcase9 = '[[1],[2,3]]';
const testcase10 = '[11, [22], 33]';
const testcase11 = '[[[[1,[],2]],[]]]';
const testcase12 = '[1, [[2]]]';
const testcase13 = '[123,[22,23,[11,[112233],112],55],33]';

const errorcase1 = '[3213, 2';
const errorcase2 = ']3213, 2[';
const errorcase3 = '[1, 55, 3]]';
const errorcase4 = '[[[p, []]]';

// const test1 = parsingObj(testcase1);
// const test2 = parsingObj(testcase2);
const test3 = parsingObj(testcase3);

// const test4 = parsingObj(testcase4);
// const test5 = parsingObj(testcase5);
// const test6 = parsingObj(testcase6);

// const test7 = parsingObj(testcase7);
// const test8 = parsingObj(testcase8);
// const test9 = parsingObj(testcase9);

// const test10 = parsingObj(testcase10);
// const test11 = parsingObj(testcase11);
// const test12 = parsingObj(testcase12);
// const test13 = parsingObj(testcase13);

// const errorTest1 = parsingObj(errorcase1);
// const errorTest2 = parsingObj(errorcase2);
// const errorTest3 = parsingObj(errorcase3);
// const errorTest4 = parsingObj(errorcase4);

console.log(JSON.stringify(test3, null, 2));