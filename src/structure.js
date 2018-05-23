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
class DataStructure {
  constructor() {
    this.syntaxChecker = new Syntax();
  }
  madeArray(str) {
    return this.syntaxChecker.removeBracket(str).split('');
  }
  parser(str) {
    const type = this.syntaxChecker.isArray(str) ? 'array' : 'object';
    const flag = new ParsingData();
    this.madeArray(str).forEach((currentString, idx, originalArray) => {
      if (currentString === '{' && !flag.arrayOpen) {
        flag.objectOpen = true;
        flag.objectCount++;
      }
      if (currentString === '}' && !flag.arrayOpen) {
        flag.objectCount--;
      }
      if (currentString === '[' && !flag.objectOpen) {
        flag.arrayCount++;
        flag.arrayOpen = true;
      }
      if (currentString === ']' && !flag.objectOpen) {
        flag.arrayCount--;
      }
      flag.chunk += currentString;
      if (type === 'array') {
        if (currentString === ',' || idx === originalArray.length - 1) {
          this.pushCompletedString(flag);
        }
        if (!flag.arrayCount && flag.arrayOpen) {
          this.pushCompletedArray(flag);
        }
        if (!flag.objectCount && !flag.arrayOpen && flag.objectOpen) {
          this.pushCompletedObject(flag);
        }

      } else if (type === 'object') {
        if (currentString === ',' || idx === originalArray.length - 1) {
          this.addValue(flag);
        }
        if (currentString === ':') {
          this.addKey(flag);
        }
        if (!flag.objectCount && flag.objectOpen) {
          this.addObject(flag);
        }
        if (!flag.arrayCount && flag.arrayOpen) {
          this.addArray(flag);
        }
      }

    })
    return type === 'array' ? flag.completeArr : flag.completeObj;
  }
  pushCompletedString(context) {
    if (!context.arrayOpen && !context.objectOpen) {
      let processed = this.syntaxChecker.removeLastComma(context.chunk).trim();
      if (processed.length) {
        this.syntaxChecker.checkError(processed);
        context.completeArr.push(processed);
      }
      context.chunk = '';
    }
  }
  pushCompletedArray(context) {
    context.completeArr.push(this.parser(context.chunk.trim()));
    context.arrayOpen = false;
    context.objectOpen = false;
    context.chunk = '';
  }
  pushCompletedObject(context) {
    let processed = this.syntaxChecker.removeLastComma(context.chunk).trim();
    if (this.syntaxChecker.isObject(processed)) {
      processed = this.parser(processed);
      context.completeArr.push(processed)
      context.objectOpen = false;
    }
    context.chunk = '';
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
    if (this.syntaxChecker.isObject(context.chunk)) context.chunk = this.parser(context.chunk);
    context.completeObj[context.temp] = context.chunk;
    context.objectOpen = false;
    context.temp = '';
    context.chunk = '';
  }
  addArray(context) {
    if (this.syntaxChecker.isArray(context.chunk)) context.chunk = this.parser(context.chunk);
    context.completeObj[context.temp] = context.chunk;
    context.arrayOpen = false;
    context.temp = '';
    context.chunk = '';
  }
}
exports.DataStructure = DataStructure;
const ds = new DataStructure();
// console.log(ds.parser("[1,2,3,['wef',{a:'b'},3],null,true]"));