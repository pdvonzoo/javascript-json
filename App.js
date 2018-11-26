const DataType = require('./dataType.js');
const Parser = require('./scripts.js');
const ErrorChecker = require('./error.js');

const error = new ErrorChecker();
const dataType = new DataType(error);

function replacer(key, value){
    return (key !== "parent")? value: undefined;
}

const str = "['1a3',[null,false,['11',112,'99'], {a:'str', b:[912,[5656,33]]}], true]";
const ArrayParser = (str) => new Parser(dataType).processData(str);
const result = ArrayParser(str);
console.log(JSON.stringify(result, replacer, 2));