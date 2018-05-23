const Syntax = require('./checker').Syntax;
const syntaxChecker = new Syntax();
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
  constructor() {}
  pushCompletedString(context) {
    if (!context.arrayOpen && !context.objectOpen) {
      let processed = syntaxChecker.removeLastComma(context.chunk).trim();
      if (processed.length) {
        syntaxChecker.checkError(processed);
        context.completeArr.push(processed);
      }
      context.chunk = '';
    }
  }
  pushCompletedArray(context) {
    const structure = new DataStructure();
    context.completeArr.push(structure.parser(context.chunk.trim()));
    context.arrayOpen = false;
    context.objectOpen = false;
    context.chunk = '';
  }
  pushCompletedObject(context) {
    const structure = new DataStructure();
    let processed = syntaxChecker.removeLastComma(context.chunk).trim();
    if (syntaxChecker.isObject(processed)) {
      processed = structure.parser(processed);
      context.completeArr.push(processed)
      context.objectOpen = false;
    }
    context.chunk = '';
  }
}
class JsonParser {
  constructor() {}
  addKey(context) {
    if (!context.arrayOpen && !context.objectOpen) {
      const processed = syntaxChecker.removeLastEqual(context.chunk).trim();
      if (processed.length) {
        syntaxChecker.checkError(processed, 'key');
        context.temp = processed;
      }
      context.chunk = '';
    }
  }
  addValue(context) {
    if (!context.arrayOpen && !context.objectOpen) {
      const processed = syntaxChecker.removeLastComma(context.chunk).trim();
      if (processed.length) {
        syntaxChecker.checkError(processed);
        context.completeObj[context.temp] = processed;
      }
      context.temp = '';
      context.chunk = '';
    }
  }
  addObject(context) {
    const structure = new DataStructure();
    if (syntaxChecker.isObject(context.chunk)) context.chunk = structure.parser(context.chunk);
    context.completeObj[context.temp] = context.chunk;
    context.objectOpen = false;
    context.temp = '';
    context.chunk = '';
  }
  addArray(context) {
    const structure = new DataStructure();
    if (syntaxChecker.isArray(context.chunk)) context.chunk = structure.parser(context.chunk);
    context.completeObj[context.temp] = context.chunk;
    context.arrayOpen = false;
    context.temp = '';
    context.chunk = '';
  }
}
class DataStructure {
  constructor() {
    this.syntaxChecker = new Syntax();
    this.arrayParser = new ArrayParser();
    this.jsonParser = new JsonParser();
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