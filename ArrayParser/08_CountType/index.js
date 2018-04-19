const {pipe} = require('../functionalUtil')
const {isString} = require('../typeCheck')
const { IdentityObjObject, IdentityObject} = require('../class/IdentityObject')
const {isObjClosed, isArrayClosed, splitItem, MakeIdObjPrimitiveType} = require('../modules')
const totalCounter = require('../modules/counts')
const typeCheck = require('../typeCheck')

const trimed = str => str.trim()

const removeBracket = str => str.slice(1,str.length-1)

const hasEdgeValue = (str, first, last)=> str[0]===first || str[str.length-1]===last

const hasArrayBracketsEdge = str =>  hasEdgeValue(str, '[',']')

const hasObjBracketsEdge = str =>  hasEdgeValue(str, '{','}')

const checkClosedArrString = str => {
    if(isArrayClosed(str)) return parseString(str, 'array')
    throw new Error(`배열이 닫혀 있지 않습니다 ${str}`)
}

const checkClosedObjString = str => {
    if(isObjClosed(str)) return parseString(str, 'obj')
    throw new Error(`객체가 닫혀 있지 않습니다 ${str}`)
}


const makeIdObjByType = str => {
    if(hasArrayBracketsEdge(str)) return checkClosedArrString(str)
    if(hasObjBracketsEdge(str)) return checkClosedObjString(str)
    return MakeIdObjPrimitiveType(str)
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

const parseString = (str, type) => {
    debugger;
    if(!isString(str)) throw Error(`문자열로 값을 입력해주세요  현재값 :${str}`)
    str = trimed(str)
    if(type!=='array'&&type!=='obj') return makeIdObjByType(str)
    const methodsByType ={
        'obj': {
            result: getResultToObjObjString,
            isClosed: isObjClosed,
        },
        'array': {
            result: getResultToObjArrayString,
            isClosed: isArrayClosed,
        }
    }
    if(!methodsByType[type].isClosed(str)) throw Error(`닫혀 있지가 않습니다  현재값 :${str}`)
    const result = pipe(makeItemList, methodsByType[type].result)(str)
    return result;
}


var str = "['1a3',[null,false,['11',112,'99']],{c:{d:{a:[1,2,3]}}}, {a:'str', b:[912,[5656,33]]}, true, undefined]";
const result = parseString(str, 'array');
console.log(JSON.stringify(result, null, 2));

const counts = totalCounter(result)
console.log(JSON.stringify(counts, null, 2));

const str1 = "[1,2,3,4,5]";
const str2 = "[[1,2,3],[2],{a:'str', b:[1,2,3]},true, undefined, false]";
const str3 = '[1,2,3]'

const sampleResult1 = parseString(str1, 'array');
const sampleResult2 = parseString(str2, 'array');
const sampleResult3 = parseString(str3, '');
// console.log(sampleResult1.constructor===IdentityObject)
// console.log(typeCheck.checkType(sampleResult1))
console.log(sampleResult3)


module.exports = {
    sampleResult1,
    sampleResult2,
    parseString,
}



