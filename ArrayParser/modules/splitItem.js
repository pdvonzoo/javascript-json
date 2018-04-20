const { each } = require('../util/functionalUtil')

const brackets = {
    '[': function(arrayClose){
        return arrayClose = arrayClose  << 1;
         },
    ']': function(arrayClose){
        return arrayClose = arrayClose  >> 1;
        },
    '{': function(objClose){
        return objClose = objClose  << 1;
        },
    '}': function(objClose){
        return objClose = objClose  >> 1;
        }
}
const ClOSED = 2


const isComma = item => item === ','

const allClosed = (arrayClose, objClose) => (arrayClose<=ClOSED) && (objClose <=ClOSED)

const isStringItemEnd = (singleCharacter, arrayClose, objClose) => allClosed(arrayClose, objClose) && isComma(singleCharacter)

const updateCloseState = (singleCharacter, arrayClose, objClose) => {
    if(brackets[singleCharacter]){
        arrayClose = brackets[singleCharacter](arrayClose)
        objClose = brackets[singleCharacter](objClose)
    }
    return {arrayClose, objClose}
}

const splitItem = str => {
    const splitItemList = [] 
    let arrayClose = ClOSED;
    let objClose = ClOSED;
    let splitItem = ''
    
    each(str, function(singleCharacter){
        if(isStringItemEnd(singleCharacter, arrayClose, objClose)){
            splitItemList.push(splitItem)
            splitItem = ''
        }
        else {
            const update = updateCloseState(singleCharacter, arrayClose, objClose) 
            arrayClose = update.arrayClose
            objClose = update.objClose
            splitItem += singleCharacter
        }
    })       
    splitItemList.push(splitItem)
    return splitItemList
}

var s1 = "['1a'3',[null,false,['11',112,'99'], {a:'str', b:[912,[5656,33]]}, true]";
var result = splitItem(s1);

var test1 = "1,[1,[1,[2,[2,3]]],3";
var test1_result = splitItem(test1);
var test2 = "{a:b},{c:[1,2,3],d:{a:b}}";
var test2_result = splitItem(test2);

console.log(JSON.stringify(test2_result, null, 2));

module.exports = splitItem