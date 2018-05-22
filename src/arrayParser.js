const tokenizer = require('./tokenizer.js').tokenizer;
const Syntax = require('./checker.js').Syntax;
const ObjectStructure = require('./parser.js').ObjectStructure;

class ArrayParser {
  constructor() {
    this.objectStructure = new ObjectStructure();
  }
  parse(str) {
    let arrayed = tokenizer(str);
    let fixedArray = arrayed.reduce((ac, cv) => {
      ac.push(this.objectStructure.getObjectBytype(cv));
      return ac;
    }, []);
    return fixedArray;
  }
}

const str = "['wef',['sd', {a:'b',c:'d',e:[{a:'b',d:'rok'}]},null,true,'a', [1,[1,32,3],12], 2],false, 1,2]";
const ap = new ArrayParser();
const result = ap.parse(str);
console.log(JSON.stringify(result, null, 2));