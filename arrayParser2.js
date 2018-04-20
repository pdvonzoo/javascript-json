var str = "[[123, 1, 2], [11,24,5235 , 22 , 22, 0], [11,2,33],1,2,532,5]";

function ArrayParser(str) {
  if (!isArray(str)) return 'error';
  let arrayStructure = changeArrayStructure(str);
  return getObjectStructure(arrayStructure);
}

function getObjectStructure(str) {
  let completeObject = str.reduce((accumulator, currentValue) => {
    if (isArray(currentValue)) {
      accumulator.push(processArray(currentValue));
      return accumulator;
    }
    accumulator.push(processNumber(currentValue));
    return accumulator;
  }, []);
  return completeObject;
}

function processArray(arr) {
  const obj = {};
  obj.type = isArray(arr);
  obj.value = 'ArrayObject';
  obj.child = removeBracketToken(arr).split(',').map(v => processNumber(v));
  return obj;
}

function processNumber(str) {
  return {
    type: isNumber(str),
    value: str,
    child: []
  }
}

function changeArrayStructure(str) {
  str = removeBracketToken(str);
  let checkedArr = [];
  let normalString = '';
  let arrayString = '';
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === ' ') continue;
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

function isArray(str) {
  if (str[0] === '[' && str[str.length - 1] === ']') return 'array';
}

function removeBracketToken(str) {
  return str.substring(1, str.length - 1);
}

function isNumber(item) {
  if (!isNaN(+item)) return 'number';
}

let result = ArrayParser(str);
console.log(JSON.stringify(result, null, 2));