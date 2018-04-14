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
const closed = 2

const allClosed = (arrayClose, objClose) => (arrayClose===closed) && (objClose === closed)

const isComma = item => item === ','

const isStringItemEnd = (arrayClose, objClose, singleCharacter) =>allClosed(arrayClose, objClose) && isComma(singleCharacter)

const splitItem = str => {
    const splitItemList =[] 
    let arrayClose = closed;
    let objClose = closed;
    let splitItem = ''
    for(singleCharacter of str){
        if(isStringItemEnd(arrayClose, objClose, singleCharacter)){
            splitItemList.push(splitItem)
            splitItem = ''
        }
        else {
            if(brackets[singleCharacter]){
                arrayClose = brackets[singleCharacter](arrayClose)
                objClose = brackets[singleCharacter](objClose)
            }
            splitItem+=singleCharacter
        }
    }
    splitItemList.push(splitItem)
    return splitItemList
}
var str = "['1a3',[null,false,['11',[112233],{easy : ['hello', {a:'a'}, 'world']},112],55, '99'],{a:'str', b:[912,[5656,33],{key : 'innervalue', newkeys: [1,2,3,4,5]}]}, true]";


const result = splitItem(str)
console.log(JSON.stringify(result, null, 2));


module.exports = splitItem