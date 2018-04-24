// ArrayParser 2중 중첩배열 분석

var str = "[[123, 1, 2], [11,24,5235 , 22 , 22, 0], [11,2,33],1,2,532,5]";

// 메인 함수
function ArrayParser(str) {
  if (!isArray(str)) return 'error';
  let arrayStructure = changeToArrayStructure(str);
  return getObjectStructure(arrayStructure);
}

function getObjectStructure(str) {
  let completedObject = str.reduce((accumulator, currentValue) => {
    if (isArray(currentValue)) {
      accumulator.push(processForArray(currentValue));
      return accumulator;
    }
    accumulator.push(processForNumber(currentValue));
    return accumulator;
  }, []);
  return completedObject;
}

function processForArray(arr) {
  const obj = {};
  obj.type = isArray(arr);
  obj.value = 'ArrayObject';
  obj.child = removeBracket(arr).split(',').map(v => processForNumber(v));
  return obj;
}

function processForNumber(str) {
  return {
    type: isNumber(str),
    value: str,
    child: []
  }
}

function changeToArrayStructure(str) {
  str = removeBracket(str);
  let checkedArr = [];
  let normalString = '';
  let arrayString = '';
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (isEmpty(str[i])) continue;
    if (str[i] === '[') count++;
    if (str[i] === ']') {
      count--;
      if (count === 0) {
        checkedArr.push(arrayString + str[i]);
        arrayString = '';
        continue;
      }
    }

    if (count === 0 && str[i] === ',' && normalString !== '') {
      checkedArr.push(normalString);
      normalString = '';
    }

    if (count) {
      arrayString += str[i]
    } else {
      if (isNaN(+str[i])) continue;
      normalString += str[i];
    }
    if (i === str.length - 1) checkedArr.push(normalString);
  }
  return checkedArr;
}

function isEmpty(str) {
  if (str === ' ') return 1;
}

function isArray(str) {
  if (str[0] !== '[' || str[str.length - 1] !== ']') return undefined;
  if (!isPairBracket(str)) return undefined;
  return 'array';
}

function isPairBracket(str) {
  let count = str.split('').reduce((ac, cv) => {
    if (cv === '[') ac += 1;
    if (cv === ']') ac -= 1;
    return ac;
  }, 0)
  return count ? undefined : 1;
}

function removeBracket(str) {
  return str.substring(1, str.length - 1);
}

function isNumber(item) {
  if (!isNaN(+item)) return 'number';
}

let result = ArrayParser(str);
console.log(JSON.stringify(result, null, 2));