const SyntaxChecker = require('./syntaxChecker').SyntaxChecker;

function tokenizer(str) {
  let parsedData = {
    checkedArr: [],
    arrayString: '',
    objectString: '',
    arrayCount: 0,
    arrayFlag: false,
    objectCount: 0,
    objectFlag: false,
    finishArrayFlag: false
  };
  const token = parsedData;
  const syntaxChecker = new SyntaxChecker();
  str = syntaxChecker.removeBracket(str);
  const splited = str.split('');
  let nextComma = 0;
  let chunked = '';
  let objectCount = 0;
  splited.forEach((currentString, idx, a) => {
    if (currentString === '{') {
      token.objectCount++;
      token.objectFlag = true;
    }
    if (currentString === '}') {
      token.objectCount--;
    }
    if (currentString === '[') {
      token.arrayCount++;
      token.arrayFlag = true;
    }
    if (currentString === ']') {
      token.arrayCount--;
    }
    chunked += currentString;
    if ((currentString === ',' || idx === a.length - 1) && !token.arrayFlag && !token.objectFlag) {
      const processed = syntaxChecker.removeLastComma(chunked).trim();
      if (processed.length) {
        syntaxChecker.checkError(processed);
        token.checkedArr.push(processed);
      }
      chunked = '';
    }
    if (!token.arrayCount && token.arrayFlag) {
      token.checkedArr.push(chunked.trim());
      token.arrayFlag = false;
      chunked = '';
    }
    if (!token.objectCount && token.objectFlag) {
      token.checkedArr.push(chunked.trim());
      token.objectFlag = false;
      chunked = '';
    }

  })
  return token.checkedArr;
}
exports.tokenizer = tokenizer;