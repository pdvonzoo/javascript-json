var str = "[123, 22, 33]";

function ArrayParser(str) {
  let type = isArrayToken(str);
  return type ? {
    type: type,
    child: getInfo(str)
  } : str;
}

function getInfo(str) {
  str = removeBracketToken(str);
  let splited = splitedToken(str);
  let trimmedArray = trimToken(splited);
  let objected = getObjectToken(trimmedArray);
  return objected;
}

function isArrayToken(str) {
  if (str[0] === '[' && str[str.length - 1] === ']') return 'array';
}

function removeBracketToken(str) {
  return str.substring(1, str.length - 1);
}

function trimToken(arr) {
  return arr.map(v => v.trim());
}

function splitedToken(str) {
  return str.split(',');

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
console.log(result);
// console.log(JSON.stringify(result, null, 2));