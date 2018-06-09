const DataStructure = require('./structure.js').DataStructure;
const Syntax = require('./checker.js').Syntax;
const Tokenizer = require('./tokenizer.js').Tokenizer;
const arrayParser = require('./parser').ArrayParser;
const jsonParser = require('./parser').JsonParser;

class ArrayParser {
  constructor() {
    this.countByType = { object: 0, array: 0, boolean: 0, null: 0, number: 0, string: 0 };
    this.syntaxChecker = new Syntax();
    this.tokenizer = new Tokenizer(this.syntaxChecker, this.countByType);
    this.dataStructure = new DataStructure(this.syntaxChecker, arrayParser, jsonParser);
  }
  parse(str) {
    this.syntaxChecker.isPairBracket(str);
    const arrayed = this.dataStructure.parser(str);
    const fixedArray = this.tokenizer.tokenize(arrayed);
    return fixedArray;
  }
  countTypeFormatting(countByTypeObject) {
    const key = Object.keys(countByTypeObject);
    const reduced = key.reduce((ac, cv, idx) => {
      ac += `${cv}타입 : ${countByTypeObject[cv]}개, `
      if (idx === key.length - 1) return ac.slice(0, -2);
      return ac;
    }, ``)
    return reduced;
  }
}

const str = "['wef', [789, {a:'b',c:'d',e:[{a:'b',d:{a:'b'}}]},null,true,'a', ['a',[1,32,3],2], 2],false, 1,2]";
const ap = new ArrayParser();
const result = ap.parse(str);
const countByType = ap.countByType;
console.log(JSON.stringify(result, null, 2));
console.log(ap.countTypeFormatting(ap.countByType));