const Syntax = require('./checker').Syntax;
exports.DataStructure = class DataStructure {
  constructor() {
    this.syntaxChecker = new Syntax();
  }
  processArray(str) {
    str = this.syntaxChecker.removeBracket(str);
    const splited = str.split('');
    let completeArr = [];
    let chunk = '';
    let flag = {
      arrayCount: 0,
      arrayOpen: false,
      objectCount: 0,
      objectOpen: false
    }
    splited.forEach((currentString, idx, originalArray) => {
      if (currentString === '{' && !flag.arrayFlag) {
        flag.objectFlag = true;
        flag.objectCount++;
      }
      if (currentString === '}' && !flag.arrayFlag) {
        flag.objectCount--;
      }
      if (currentString === '[' && !flag.objectFlag) {
        flag.arrayCount++;
        flag.arrayFlag = true;
      }
      if (currentString === ']' && !flag.objectFlag) {
        flag.arrayCount--;
      }
      chunk += currentString;
      if ((currentString === ',' || idx === originalArray.length - 1) && !flag.arrayFlag && !flag.objectFlag) {
        let processed = this.syntaxChecker.removeLastComma(chunk).trim();
        if (processed.length) {
          this.syntaxChecker.checkError(processed);
          completeArr.push(processed);
        }
        chunk = '';
      }
      if (!flag.arrayCount && flag.arrayFlag) {
        completeArr.push(this.processArray(chunk.trim()));
        flag.arrayFlag = false;
        flag.objectFlag = false;
        chunk = '';
      }
      if (!flag.objectCount && !flag.arrayFlag && flag.objectFlag) {
        let processed = this.syntaxChecker.removeLastComma(chunk).trim();
        if (this.syntaxChecker.isObject(processed)) {
          processed = this.processObject(processed);
          completeArr.push(processed)
          flag.objectFlag = false;
        }
        chunk = '';
      }

    })
    return completeArr;
  }
  processObject(str) {
    str = this.syntaxChecker.removeBracket(str);
    const splited = str.split('');
    let chunk = '';
    let temp = '';
    let completeObj = {};
    let flag = {
      arrayCount: 0,
      arrayOpen: false,
      objectCount: 0,
      objectOpen: false
    }
    splited.forEach((currentString, idx, originalArray) => {
      if (currentString === '{' && !flag.arrayFlag) {
        flag.objectCount++;
        flag.objectFlag = true;
      }
      if (currentString === '}' && !flag.arrayFlag) {
        flag.objectCount--;
      }
      if (currentString === '[' && !flag.objectFlag) {
        flag.arrayCount++;
        flag.arrayFlag = true;
      }
      if (currentString === ']' && !flag.objectFlag) {
        flag.arrayCount--;
      }
      chunk += currentString;
      if (currentString === ':' && !flag.arrayFlag && !flag.objectFlag) {
        const processed = this.syntaxChecker.removeLastEqual(chunk).trim();
        if (processed.length) {
          this.syntaxChecker.checkError(processed, 'key');
          temp = processed;
        }
        chunk = '';
      }
      if ((currentString === ',' || idx === originalArray.length - 1) && !flag.arrayFlag && !flag.objectFlag) {
        const processed = this.syntaxChecker.removeLastComma(chunk).trim();
        if (processed.length) {
          this.syntaxChecker.checkError(processed);
          completeObj[temp] = processed;
        }
        temp = '';
        chunk = '';
      }
      if (!flag.arrayCount && flag.arrayFlag) {
        if (this.syntaxChecker.isArray(chunk)) chunk = this.processArray(chunk);
        completeObj[temp] = chunk;
        flag.arrayFlag = false;
        temp = '';
        chunk = '';
      }
      if (!flag.objectCount && flag.objectFlag) {
        if (this.syntaxChecker.isObject(chunk)) chunk = this.processObject(chunk);
        completeObj[temp] = chunk;
        flag.objectFlag = false;
        temp = '';
        chunk = '';
      }
    })
    return completeObj;
  }
}