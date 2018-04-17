const {pipe} = require('../functionalUtil')
const {isString} = require('../typeCheck')
const { IdentityObjObject, IdentityObject} = require('../class/IdentityObject')
const {isObjClosed, isArrayClosed, splitItem, MakeIdObjPrimitiveType} = require('../modules')

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
    const newArrayObj = new IdentityObject('Array', 'ArrayObject')
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
    if(!isString(str)) throw Error(`문자열로 값을 입력해주세요  현재값 :${str}`)
    str = trimed(str)
  
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


var str = "['1a3',[null,false,['11',112,'99']], {a:'str', b:[912,[5656,33]]}, true, undefined]";
var result = parseString(str, 'array');
console.log(JSON.stringify(result, null, 2));



