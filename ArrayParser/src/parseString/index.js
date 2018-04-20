const {pipe} = require('../util/functionalUtil')
const {isString} = require('../util/typeCheck')
const { IdentityObjObject, IdentityObject} = require('../IdentityObject/IdentityObject')
const { makeIdObjPrimitiveType} = require('../makePrimitiveType/makePrimitiveType')
const {isArrayClosed, isObjClosed} = require('../checkClosed')
const totalCounter = require('../counts/counts')
const splitItem = require('../splitItem/splitItem')


const trimed = str => str.trim()

const removeBracket = str => str.slice(1,str.length-1)

const hasEdgeValue = (str, first, last)=> str[0]===first || str[str.length-1]===last

const hasArrayBracketsEdge = str =>  hasEdgeValue(str, '[',']')

const hasObjBracketsEdge = str =>  hasEdgeValue(str, '{','}')

const checkClosedArrString = str => {
    if(isArrayClosed(str)) return parseObjandArray(str, 'array')
    throw new Error(`배열이 닫혀 있지 않습니다 ${str}`)
}

const checkClosedObjString = str => {
    if(isObjClosed(str)) return parseObjandArray(str, 'object')
    throw new Error(`객체가 닫혀 있지 않습니다 ${str}`)
}


const makeIdObjByType = str => {
    if(hasArrayBracketsEdge(str)) return checkClosedArrString(str)
    if(hasObjBracketsEdge(str)) return checkClosedObjString(str)
    return makeIdObjPrimitiveType(str)
  }

const addEachItemArrString = (ac, c)=> {
    c = trimed(c)
    const item = makeIdObjByType(c)
    ac.child.push(item)
    return ac;
}

const addEachItemObjString = (ac,c)=>{
    const divisor = c.indexOf(':')
    if(divisor===-1) throw Error(` : 이 없습니다.{${c}}`)
    const key = c.slice(0,divisor).trim()
    const value = c.slice(divisor+1).trim()
    ac.key = key;
    ac.value = makeIdObjByType(value)
    return ac;
}

const getResultToObjArrayString = arr => {
    const newArrayObj = new IdentityObject('array', 'ArrayObject')
    const result = arr.reduce(addEachItemArrString, newArrayObj)
    return result;
}

const getResultToObjObjString = arr => {
    const newObjObj = new IdentityObjObject() 
    const result = arr.reduce(addEachItemObjString, newObjObj)
    return result;
}

const makeItemList= pipe(removeBracket, splitItem)

const parseString = (str) => {
    debugger;
    if(!isString(str)) throw Error(`문자열로 값을 입력해주세요  현재값 :${str}`)
    str = str.trim()
    return makeIdObjByType(str)
}

const parseObjandArray = (str, type)=>{
    const methodsByType ={
        'object': {
            result: getResultToObjObjString,
        },
        'array': {
            result: getResultToObjArrayString,
        }
    }
    const result = pipe(makeItemList, methodsByType[type].result)(str)
    return result;
}



// var str = "['1a3',[null,false,['11',112,'99']],{c:{d:{a:[1,2,3]}}}, {a:'str', b:[912,[5656,33]]}, true, undefined]";
// const result = parseString(str, 'array');
// console.log(JSON.stringify(result, null, 2));

// const counts = totalCounter(result)
// console.log(JSON.stringify(counts, null, 2));

const str1 = "[1,2,3,4,5]";
const str2 = "[[1,2,3],[2],{a:'str', b:[1,2,3]},true, undefined, false]";
const str3 = '[1,2,3]'
const str4 = '{a: \'b\'}'
const str5 = '{a: [1,2,{b: 3}]}'

// var str = "['1a3',[null,false,['11',[112233],{easy : ['hello', {a:'a'}, 'world']},112],55, '99'],{a:'str', b:[912,[5656,33],{key : 'innervalue', newkeys: [1,2,3,4,5]}]}, true]";

// var s1 = "[1,[null,false,['11',112,'99']], {a:'str', b:{[912]}}},true]";



// var s = "['1a3',[null,false,['11',112,'99']], {a:'str', b:[912,[5656,33]]}, true]";
//정상출력

// var s = "['1a3',[null,false,['11',112,'99' , {a:'str', b:[912,[5656,33]]}, true]";
// 정상적으로 종료되지 않은 배열이 있습니다.

// var s = "['1a3',[null,false,['11',112,'99']], {a:'str', b: [912,[5656,33]], true]";
// 정상적으로 종료되지 않은 객체가 있습니다.

// var s = "['1a3',[null,false,['11',112,'99']], {a:'str', b  [912,[5656,33]]}, true]";
// ':'이 누락된 객체표현이 있습니다.

const sampleResult1 = parseString(str1);
const sampleResult2 = parseString(str2);
const sampleResult3 = parseString(str3);
const sampleResult4 = parseString(str4);
const sampleResult5 = parseString(str5);
console.log(sampleResult1.constructor===IdentityObject)
console.log(sampleResult1)
console.log(sampleResult2)
console.log(sampleResult3)
console.log(sampleResult4)
console.log(sampleResult5)
console.log(totalCounter(sampleResult1));

module.exports = {
    sampleResult1,
    sampleResult2,
    parseString,
}



