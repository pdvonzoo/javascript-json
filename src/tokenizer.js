const structure = require('./structure').DataStructure;
exports.Tokenizer = class Tokenizer {
  constructor(syntaxChecker) {
    this.syntaxChecker = syntaxChecker;
  }
  getType(str) {
    if (['null', 'true', 'false'].indexOf(str) > -1) return str;
    if (toString.call(str) === '[object Array]') return 'array';
    if (toString.call(str) === '[object Object]') return 'object';
    if (this.syntaxChecker.isNumber(str)) return 'number';
    else return 'string';
  }
  tokenizeChildArray(arr) {
    const fixed = arr.reduce((ac, cv) => {
      ac.push(this.tokenize(cv));
      return ac;
    }, []);
    return fixed;
  }
  tokenizeChildObject(obj) {
    Object.keys(obj).forEach(v => {
      obj[v] = this.tokenize(obj[v]);
    })
    return obj;
  }
  getObjectByType(value) {
    let finalObject = null;
    const type = this.getType(value);
    switch (type) {
      case 'array':
        finalObject = {
          type: type,
          value: 'ArrayObject',
          child: this.tokenizeChildArray(value)
        }
        break;
      case 'object':
        finalObject = {
          type: type,
          value: 'Object',
          child: this.tokenizeChildObject(value)
        }
        break;
      default:
        finalObject = {
          type: type,
          value: value,
          child: []
        }
        break;
    }
    return finalObject;
  }
  tokenize(value) {
    if (toString.call(value) !== '[object array]') return this.getObjectByType(value);
    else {
      const fixedArray = value.reduce((ac, cv) => {
        const type = this.getType(cv);
        ac.push(this.getObjectByType(cv));
        return ac;
      }, []);
      return fixedArray;
    }
  }
}