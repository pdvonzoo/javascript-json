const Materializer = require('./materializer.js').Materializer;
const Syntax = require('./checker.js').Syntax;
const Tokenizer = require('./tokenizer.js').Tokenizer;
const arrayParser = require('./parser').ArrayParser;
const jsonParser = require('./parser').JsonParser;
const statistic = require('./statistic').statistic;
class ArrayParser {
  constructor() {
    this.syntaxChecker = new Syntax();
    this.tokenizer = new Tokenizer(this.syntaxChecker);
    this.materializer = new Materializer(this.syntaxChecker, arrayParser, jsonParser);
  }
  parse(str) {
    this.syntaxChecker.isPairBracket(str);
    const materialized = this.materializer.parser(str);
    const completedData = this.tokenizer.tokenize(materialized);
    return completedData;
  }
}

const str = "['wef', [789, {a:'b',c:'d',e:[{a:'b',d:{a:'b'}}]},null,true,'a', ['a',[1,32,3],2], 2],false, 1,2]";
const ap = new ArrayParser();
const result = ap.parse(str);
const statisticData = statistic(result);
console.log(JSON.stringify(result, null, 2));
console.log(statisticData);