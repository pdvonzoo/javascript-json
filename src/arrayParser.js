const DataStructure = require('./structure.js').DataStructure;
const Syntax = require('./checker.js').Syntax;
const Tokenizer = require('./tokenizer.js').Tokenizer;
const arrayParser = require('./parser').ArrayParser;
const jsonParser = require('./parser').JsonParser;

class ArrayParser {
  constructor() {
    this.syntaxChecker = new Syntax(Syntax.ErrorMessage);
    this.tokenizer = new Tokenizer(this.syntaxChecker);
    this.dataStructure = new DataStructure(this.syntaxChecker, arrayParser, jsonParser);
  }
  parse(str) {
    this.syntaxChecker.isPairBracket(str);
    const arrayed = this.dataStructure.parser(str);
    const fixedArray = this.tokenizer.tokenize(arrayed);
    return fixedArray;
  }
}

const str = "['wef', [789, {a:'b',c:'d',e:[{a:'b',d:{a:'b'}}]},null,true,'a', ['a',[1,32,3],2], 2],false, 1,2]";
const ap = new ArrayParser();
const result = ap.parse(str);
console.log(JSON.stringify(result, null, 2));