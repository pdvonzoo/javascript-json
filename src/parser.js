const Syntax = require('./checker').Syntax;
const tokenizer = require('./tokenizer').tokenizer;
class ObjectStructure {
  constructor() {
    this.syntaxChecker = new Syntax();
  }

  getType(str) {
    if (['null', 'true', 'false'].indexOf(str) > -1) return str;
    if (toString.call(str) === '[object Array]') return 'array';
    if (this.syntaxChecker.isObject(str)) return 'object';
    if (this.syntaxChecker.isNumber(str)) return 'number';
    else return 'string';
  }
  childNode(arr) {
    let fixed = arr.reduce((ac, cv) => {
      ac.push(this.getObjectBytype(cv));
      return ac;
    }, []);
    return fixed;
  }
  getObjectBytype(value) {
    let type = this.getType(value);
    let finalObject = null;
    switch (type) {
      case 'array':
        finalObject = {
          type: type,
          value: 'ArrayObject',
          child: this.childNode(value)
        }
        break;
      case 'object':
        finalObject = {
          type: type,
          value: 'Object',
          child: []
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
}
const obj = new ObjectStructure();
const str = "['wef',['sd',null,true,'a', [1,[1,32,3],12], 2],false, 1,2]";
let abc = tokenizer(str);
let fi = obj.getObjectBytype(abc);
console.log(JSON.stringify(fi, null, 2));