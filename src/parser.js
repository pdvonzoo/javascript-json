const {tokenizer} = require('./tokenizer.js');
const {lexer} = require('./lexer.js')

class parser{

    dataParser(str, key){
        let result = lexer(str, key).getLexer;
        if( str[0] === "[" ){
            const arr = tokenizer.convertArray(str);
            result.child = result.child.concat(this.arrayChild(arr));
        }
        if( str[0] === "{" ){
            const obj = tokenizer.convertObject(str);
            result.child = result.child.concat(this.objectChild(obj));
        }
        return result;
    }
    arrayChild(array){
        const result = array.reduce( (prev, curr) => prev.concat(this.dataParser(curr)),[]);
        return result;
    }
    objectChild(object){
        const result = [];
        for( let key in object ){
            result.push(this.dataParser(object[key], key));
        }
        return result;
    }
}
exports.parser = new parser();

// let str = "['1a3',[null,false,['11',[112233],{easy : ['hello', {a:'a'}, 'world']},112],55, '99'],{a:'str', b:[912,[5656,33],{key : 'innervalue', newkeys: [1,2,3,4,5]}]}, true]";
// let parseData = new parser().dataParser(str);
// console.log(JSON.stringify(parseData,null,2));

// str = "['1a'3',[22,23,[11,[112233],112],55],33]";
// parseData = new parser().dataParser(str);
// console.log(JSON.stringify(parseData, null, 2));

// str = "['1a3',[22,23,[11,[112233],112],55],3d3]"; 
// parseData = new parser().dataParser(str);
// console.log(JSON.stringify(parseData, null, 2));

// str = "['1a3',[22,23,[11,[112233],112],55],{crong : 3d3}]"; 
// parseData = new parser().dataParser(str);
// console.log(JSON.stringify(parseData, null, 2));

// str = "[{a : '1a'3'},[22,23,[11,[112233],112],55],33]";
// parseData = new parser().dataParser(str);
// console.log(JSON.stringify(parseData, null, 2));

// str = "{1 : { 2 : { 3 : 4} }, 5 : [{},[],3] }";
// parseData = new parser().dataParser(str);
// console.log(JSON.stringify(parseData, null, 2));