var str = "[[123, 1, 2], [11,24,5235 , 22 , 22, 0], [11,2,33],1,2,532,5]";
removed = removeBracketToken(str);

function ArrayParser(str) {
  let type = isArrayToken(str);

  if (type) removeBracketToken(str);
  let b = typeCheck(removed);
  objecting(b);
  console.log(b);
}

function objecting(str) {
  let re = str.reduce((ac, cv) => {
    if (isArrayToken(cv)) {
      const obj = {};
      obj.type = isArrayToken(cv);
      obj.value = 'ArrayObject'
      obj.child = removeBracketToken(cv).split(',').map(v => numberObjecting(v));
      ac.push(obj);
      return ac;
    }
    ac.push(numberObjecting(cv));
    return ac;
  }, [])
  console.log(re);
}

function numberObjecting(str) {
  return {
    type: 'number',
    value: str,
    child: []
  }
}

function typeCheck(str) {
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
        arrayString = ''
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

// function getInfoToken(str) {
//   str = removeBracketToken(str);
//   console.log(str);
//   // let objected = getObjectToken(trimmedArray);
//   // return trimmedArray;
// }

function isArrayToken(str) {
  if (str[0] === '[' && str[str.length - 1] === ']') return 'array';
}

function removeBracketToken(str) {
  return str.substring(1, str.length - 1);
}

function trimToken(arr) {
  return arr.map(v => v.trim());
}

function isNumberToken(item) {
  if (!isNaN(+item)) return 'number';
}

function getObjectToken(arr) {
  return arr.map(v => {
    return {
      type: typeof (+v),
      value: v,
      child: []
    }

  });
}
let result = ArrayParser(str);
// console.log(result);
// console.log(JSON.stringify(result, null, 2));