const DataStructure = require('./structure.js').DataStructure;
const Syntax = require('./checker.js').Syntax;
const Tokenizer = require('./tokenizer.js').Tokenizer;

class ArrayParser {
  constructor() {
    this.tokenizer = new Tokenizer();
    this.structure = new DataStructure();
  }
  parse(str) {
    let arrayed = this.structure.processArray(str);
    let fixedArray = this.tokenizer.tokenize(arrayed);
    return fixedArray;
  }
}

const str = "['wef', ['sd', {a:'b',c:'d',e:[{a:'b',d:{a:'b'}}]},null,true,'a', ['a',[1,32,3],2], 2],false, 1,2]";
const ap = new ArrayParser();
const result = ap.parse(str);
console.log(JSON.stringify(result, null, 2));