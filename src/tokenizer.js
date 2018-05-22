const Syntax = require('./checker').Syntax;

function tokenizer(str) {
  let parsedData = {
    checkedArr: [],
    arrayString: '',
    objectString: '',
    arrayCount: 0,
    arrayFlag: false,
    objectCount: 0,
    objectFlag: false,
  };
  const token = parsedData;
  const syntaxChecker = new Syntax();
  str = syntaxChecker.removeBracket(str);
  const splited = str.split('');
  let chunk = '';
  let objChunk = '';
  splited.forEach((currentString, idx, originalArray) => {
    if (currentString === '{' && !token.arrayFlag) {
      token.objectFlag = true;
      token.objectCount++;
    }
    if (currentString === '}' && !token.arrayFlag) {
      token.objectCount--;
    }
    if (currentString === '[' && !token.objectFlag) {
      token.arrayCount++;
      token.arrayFlag = true;
    }
    if (currentString === ']' && !token.objectFlag) {
      token.arrayCount--;
    }

    chunk += currentString;
    if ((currentString === ',' || idx === originalArray.length - 1) && !token.arrayFlag && !token.objectFlag) {
      let processed = syntaxChecker.removeLastComma(chunk).trim();
      if (processed.length) {
        syntaxChecker.checkError(processed);
        token.checkedArr.push(processed);
      }
      chunk = '';
    }
    if (!token.arrayCount && token.arrayFlag) {
      token.checkedArr.push(tokenizer(chunk.trim()));
      token.arrayFlag = false;
      token.objectFlag = false;
      chunk = '';
    }
    if (!token.objectCount && !token.arrayFlag && token.objectFlag) {
      let processed = syntaxChecker.removeLastComma(chunk).trim();
      if (syntaxChecker.isObject(processed)) {
        processed = jsonParser(processed);
        token.checkedArr.push(processed)
        token.objectFlag = false;
      }
      chunk = '';
    }

  })
  return token.checkedArr;
}
exports.tokenizer = tokenizer;

function jsonParser(str) {
  let parsedData = {
    checkedObj: {},
    arrayString: '',
    objectString: '',
    arrayCount: 0,
    arrayFlag: false,
    objectCount: 0,
    objectFlag: false,
  };
  const token = parsedData;
  const syntaxChecker = new Syntax();
  str = syntaxChecker.removeBracket(str);
  const splited = str.split('');
  let chunk = '';
  let temp = '';
  let obj = {};
  splited.forEach((currentString, idx, originalArray) => {
    if (currentString === '{' && !token.arrayFlag) {
      token.objectCount++;
      token.objectFlag = true;
    }
    if (currentString === '}' && !token.arrayFlag) {
      token.objectCount--;
    }
    if (currentString === '[' && !token.objectFlag) {
      token.arrayCount++;
      token.arrayFlag = true;
    }
    if (currentString === ']' && !token.objectFlag) {
      token.arrayCount--;
    }
    chunk += currentString;
    if (currentString === ':' && !token.arrayFlag && !token.objectFlag) {
      const processed = syntaxChecker.removeLastEqual(chunk).trim();
      if (processed.length) {
        syntaxChecker.checkError(processed);
        temp = processed;
      }
      chunk = '';
    }
    if ((currentString === ',' || idx === originalArray.length - 1) && !token.arrayFlag && !token.objectFlag) {
      const processed = syntaxChecker.removeLastComma(chunk).trim();
      if (processed.length) {
        syntaxChecker.checkError(processed);
        obj[temp] = processed;
      }
      temp = '';
      chunk = '';
    }
    if (!token.arrayCount && token.arrayFlag) {
      if (syntaxChecker.isArray(chunk)) chunk = tokenizer(chunk);
      obj[temp] = chunk;
      token.arrayFlag = false;
      temp = '';
      chunk = '';
    }
    if (!token.objectCount && token.objectFlag) {
      obj[temp] = chunk;
      token.objectFlag = false;
      temp = '';
      chunk = '';
    }
  })
  return obj;
}
console.log(JSON.stringify(jsonParser("{a:'b',c:{a:b,c:d,e:[]},f:[{1:2},1]}"), null, 2));