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

class DataStuctureObj {
  constructor(type, value, child) {
    this.type = type;
    this.value = value;
    this.child = child;
  }

  getChild(data){
    this.childArr = [];
    this.childArr.push(data);
  }
}
const test = new DataStuctureObj(dataType.array, dataType.arrayObj);
console.log(test.getChild(new DataStuctureObj(dataType.array, dataType.arrayObj, [{type: dataType.number, value: 1}])));
console.log(test.childArr)

class Stack {
  constructor() {
    this.list = [];
    this.top = 0;
  }

  stackPush(data) {
    const checkType = Object.prototype.toString.call(data);
    if (checkType === '[object Array]') this.list.push(new Array);
    console.log(this.list)
    if (data) this.list[this.top++].push(data);
  }

  stackPop() {
    return this.list[--this.top];
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
function getChildTokenType(parsing) {
  let child = [];

  for (let value of parsing) {
    let isArray = Object.prototype.toString.call(value);
    (isArray === '[object Array]') ? getChildOfChildObj(value, child): getChildObj(value, child);
  }
  return child;
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

// parsing 기능 
function parsingData(strData) {
  let stack = new Stack();
  let stackArr = [];
  let temp = '';

  const openBrackets = ['['];
  const closeBrackets = [']'];

  for (let key in strData) {
    const value = strData[key];

    if (openBrackets.indexOf(value) > -1) { 
      stackArr.push(new Array);
    } else if (closeBrackets.indexOf(value) > -1) { 
      temp !== '' ? stackArr[stackArr.length - 1].push(temp) : null;
      temp = stackArr.pop();
    } else if (value === ',') { 
      temp !== '' ? stackArr[stackArr.length - 1].push(temp) : null;
      temp = '';
    } else { 
      temp = temp + value.trim();
    }
  }
  return temp;
}

function parsingObj(strData) {
  const checkError = checkBlockError(strData);

  if (checkError === true) {
    const result = parsingData(strData);
    return result;
  }
}

const testcase1 = '[1, 2,[3,4, 5]]';
const testcase2 = '[12, [14, 55], 15]';
const testcase3 = '[1, [55, [3]],[]]';
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

const errorcase1 = '[3213, 2';
const errorcase2 = ']3213, 2[';
const errorcase3 = '[1, 55, 3]]';
const errorcase4 = '[[[p, []]]';


// const test1 = parsingObj(testcase1);
// const test2 = parsingObj(testcase2);
// const test3 = parsingObj(testcase3);

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

// const errorTest1 = parsingObj(errorcase1); 
// const errorTest2 = parsingObj(errorcase2); 
// const errorTest3 = parsingObj(errorcase3); 
// const errorTest4 = parsingObj(errorcase4); 

console.log(JSON.stringify(test13, null, 2));
