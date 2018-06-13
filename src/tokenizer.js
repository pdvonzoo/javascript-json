class Tokenizer {
  constructor(syntaxChecker) {
    this.syntaxChecker = syntaxChecker;
  }
  getType(str) {
    if (toString.call(str) === '[object Boolean]') return 'boolean';
    if (toString.call(str) === '[object Null]') return 'null';
    if (toString.call(str) === '[object Array]') return 'array';
    if (toString.call(str) === '[object Object]') return 'object';
    if (toString.call(str) === '[object Number]') return 'number';
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
  tokenize(value, countByType) {
    return this.getObjectByType(value, countByType);
  }
}
exports.Tokenizer = Tokenizer;