const Syntax = require('./checker').Syntax;
class ParsingData {
  constructor() {
    this.completeArr = [];
    this.completeObj = {};
    this.chunk = '';
    this.temp = '';
    this.arrayCount = 0;
    this.arrayOpen = false;
    this.objectCount = 0;
    this.objectOpen = false;
  }
}
class ArrayStructure {
  constructor(syntaxChecker, ArrayParser, JsonParser) {
    this.syntaxChecker = syntaxChecker;
    this.arrayParser = new ArrayParser(this, syntaxChecker);
    this.jsonParser = new JsonParser(this, syntaxChecker);
  }
  madeArray(str) {
    return this.syntaxChecker.removeBracket(str).split('');
  }
  parser(str) {
    const type = this.syntaxChecker.isArray(str) ? 'array' : 'object';
    const parsedData = new ParsingData();
    this.madeArray(str).forEach((currentString, idx, originalArray) => {
      if (currentString === '{' && !parsedData.arrayOpen) {
        parsedData.objectOpen = true;
        parsedData.objectCount++;
      }
      if (currentString === '}' && !parsedData.arrayOpen) {
        parsedData.objectCount--;
      }
      if (currentString === '[' && !parsedData.objectOpen) {
        parsedData.arrayCount++;
        parsedData.arrayOpen = true;
      }
      if (currentString === ']' && !parsedData.objectOpen) {
        parsedData.arrayCount--;
      }
      parsedData.chunk += currentString;
      if (type === 'array') {
        this.arrayParser.processCompletedData(currentString, originalArray, idx, parsedData);
      } else if (type === 'object') {
        this.jsonParser.processCompletedData(currentString, originalArray, idx, parsedData);
      }

    })
    return type === 'array' ? parsedData.completeArr : parsedData.completeObj;
  }
}
exports.ArrayStructure = ArrayStructure;