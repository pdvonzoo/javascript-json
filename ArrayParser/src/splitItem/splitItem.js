const { each } = require('../util/functionalUtil')

const addOpenState = state => state << 1

const addCloseState = state => state >> 1

const toggleState = state => !state

const typeString = {
    '[': {'type': 'array', 'closed': addOpenState},
    ']': {'type': 'array', 'closed': addCloseState},
    '{': {'type': 'object', 'closed': addOpenState},
    '}': {'type': 'object', 'closed': addCloseState},
    "'": {'type': 'single', 'closed': toggleState},
    '"': {'type': 'double', 'closed': toggleState},
    '`': {'type': 'backTick', 'closed': toggleState}, 
}

const ClOSED = 2

const isComma = item => item === ','

const allClosed = (closeState) => Object.values(closeState).every(v=>{
    return typeof v==='boolean' ? v===true : v<=ClOSED
})

const isStringItemEnd = (singleCharacter,closeState) => allClosed(closeState) && isComma(singleCharacter)

const istypeString = singleCharacter => typeString[singleCharacter]!==undefined

const splitItem = str => {
    const splitItemList = [] 
    let splitItem = ''
    const closeState = {
        'array': ClOSED,
        'object': ClOSED,
        'single': true,
        'double': true,
        'backTick': true,
    }
    each(str, function(singleCharacter){
        if(isStringItemEnd(singleCharacter, closeState)){
            splitItemList.push(splitItem)
            splitItem = ''
            for(let key in closeState){
                closeState[key]===ClOSED
            }
        }
        else{
            if(istypeString(singleCharacter)){
                const {type, closed}=typeString[singleCharacter]
                closeState[type] = closed(closeState[type])
            }
            splitItem += singleCharacter
        }
    })       
    splitItemList.push(splitItem)
    return splitItemList
}

var s1 = "['1a'3',[null,false,['11',112,'99'], {a:'str', b:[912,[5656,33]]}, true]";
var result = splitItem(s1);

var test1 = "1,'[1,]]]]][1,[2,[2,3]]]',3";
var test1_result = splitItem(test1);
var test2 = "[1,2,3],{a:[1,2,{b:3}]}";
var test2_result = splitItem(test2);

console.log(JSON.stringify(result, null, 2));
console.log(JSON.stringify(test1_result, null, 2));
console.log(JSON.stringify(test2_result, null, 2));

module.exports = splitItem