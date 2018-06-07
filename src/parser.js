exports.ArrayParser = class {
  constructor(dataStructure, syntaxChecker) {
    this.dataStructure = dataStructure;
    this.syntaxChecker = syntaxChecker;
  }
  processCompletedData(currentString, originalArray, idx, parsedData) {
    if (currentString === ',' || idx === originalArray.length - 1) {
      this.pushCompletedString(parsedData);
    }
    if (!parsedData.arrayCount && parsedData.arrayOpen) {
      this.pushCompletedArray(parsedData);
    }
    if (!parsedData.objectCount && !parsedData.arrayOpen && parsedData.objectOpen) {
      this.pushCompletedObject(parsedData);
    }
  }
  pushCompletedString(context) {
    if (context.arrayOpen || context.objectOpen) return;
    let processed = this.syntaxChecker.removeLastComma(context.chunk).trim();
    if (this.syntaxChecker.isNumber(processed)) {
      context.completeArr.push(parseInt(processed));
    } else if (processed.length) {
      this.syntaxChecker.checkError(processed);
      processed = this.syntaxChecker.removeSideQuote(processed);
      processed = this.syntaxChecker.changeToNullAndBoolean(processed);
      context.completeArr.push(processed);
    }
    context.chunk = '';
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

exports.JsonParser = class {
  constructor(dataStructure, syntaxChecker) {
    this.dataStructure = dataStructure;
    this.syntaxChecker = syntaxChecker;
  }
  processCompletedData(currentString, originalArray, idx, parsedData) {
    if (currentString === ',' || idx === originalArray.length - 1) {
      this.addValue(parsedData);
    }
    if (currentString === ':') {
      this.addKey(parsedData);
    }
    if (!parsedData.objectCount && parsedData.objectOpen) {
      this.addObject(parsedData);
    }
    if (!parsedData.arrayCount && parsedData.arrayOpen) {
      this.addArray(parsedData);
    }
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
    if (context.arrayOpen || context.objectOpen) return;
    let processed = this.syntaxChecker.removeLastComma(context.chunk).trim();
    this.syntaxChecker.checkKey(context); // :를 만나지 못해 key값이 생성되지 않았는지를 체크
    if (this.syntaxChecker.isNumber(processed)) {
      context.completeObj[context.temp] = parseInt(processed);
    } else if (processed.length) {
      this.syntaxChecker.checkError(processed);
      processed = this.syntaxChecker.removeSideQuote(processed);
      processed = this.syntaxChecker.changeToNullAndBoolean(processed);
      context.completeObj[context.temp] = processed;
    }
    context.temp = '';
    context.chunk = '';
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