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
class ArrayParser {
  constructor(dataStructure, syntaxChecker) {
    this.dataStructure = dataStructure;
    this.syntaxChecker = syntaxChecker;
  }
  pushCompletedString(context) {
    if (!context.arrayOpen && !context.objectOpen) {
      const processed = this.syntaxChecker.removeLastComma(context.chunk).trim();
      if (processed.length) {
        this.syntaxChecker.checkError(processed);
        context.completeArr.push(processed);
      }
      context.chunk = '';
    }
  }
  pushCompletedArray(context) {
    context.completeArr.push(this.dataStructure.parser(context.chunk.trim()));
    context.arrayOpen = false;
    context.objectOpen = false;
    context.chunk = '';
  }
  pushCompletedObject(context) {
    let processed = this.syntaxChecker.removeLastComma(context.chunk).trim();
    if (this.syntaxChecker.isObject(processed)) {
      processed = this.dataStructure.parser(processed);
      context.completeArr.push(processed)
      context.objectOpen = false;
    }
    context.chunk = '';
  }
}
class JsonParser {
  constructor(dataStructure, syntaxChecker) {
    this.dataStructure = dataStructure;
    this.syntaxChecker = syntaxChecker;
  }
  addKey(context) {
    if (!context.arrayOpen && !context.objectOpen) {
      const processed = this.syntaxChecker.removeLastEqual(context.chunk).trim();
      if (processed.length) {
        this.syntaxChecker.checkError(processed, 'key');
        context.temp = processed;
      }
      context.chunk = '';
    }
  }
  addValue(context) {
    if (!context.arrayOpen && !context.objectOpen) {
      const processed = this.syntaxChecker.removeLastComma(context.chunk).trim();
      if (processed.length) {
        this.syntaxChecker.checkError(processed);
        context.completeObj[context.temp] = processed;
      }
      context.temp = '';
      context.chunk = '';
    }
  }
  addObject(context) {
    if (this.syntaxChecker.isObject(context.chunk)) context.chunk = this.dataStructure.parser(context.chunk);
    context.completeObj[context.temp] = context.chunk;
    context.objectOpen = false;
    context.temp = '';
    context.chunk = '';
  }
  addArray(context) {
    if (this.syntaxChecker.isArray(context.chunk)) context.chunk = this.dataStructure.parser(context.chunk);
    context.completeObj[context.temp] = context.chunk;
    context.arrayOpen = false;
    context.temp = '';
    context.chunk = '';
  }
}
class DataStructure {
  constructor(syntaxChecker) {
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
        if (currentString === ',' || idx === originalArray.length - 1) {
          this.arrayParser.pushCompletedString(parsedData);
        }
        if (!parsedData.arrayCount && parsedData.arrayOpen) {
          this.arrayParser.pushCompletedArray(parsedData);
        }
        if (!parsedData.objectCount && !parsedData.arrayOpen && parsedData.objectOpen) {
          this.arrayParser.pushCompletedObject(parsedData);
        }

      } else if (type === 'object') {
        if (currentString === ',' || idx === originalArray.length - 1) {
          this.jsonParser.addValue(parsedData);
        }
        if (currentString === ':') {
          this.jsonParser.addKey(parsedData);
        }
        if (!parsedData.objectCount && parsedData.objectOpen) {
          this.jsonParser.addObject(parsedData);
        }
        if (!parsedData.arrayCount && parsedData.arrayOpen) {
          this.jsonParser.addArray(parsedData);
        }
      }

    })
    return type === 'array' ? parsedData.completeArr : parsedData.completeObj;
  }
}
exports.DataStructure = DataStructure;