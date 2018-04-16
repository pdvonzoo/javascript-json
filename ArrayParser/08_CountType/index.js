const {_pipe} = require('../functionalUtil')
const {isString} = require('../typeCheck')
const { IdentityObjObject, IdentityObject} = require('../class/IdentityObject')
const {_isObjClosed, _isArrayClosed, splitItem, MakeIdObjPrimitiveType, checkClosedString, typeCounts,
    hasStringEdge } = require('../modules')

const removeFirstAndLast = str => {
    return str.slice(1,str.length-1)
  }



const _trimed = str => str.trim()

const removeBracket = str => str.slice(1,str.length-1)

const hasArrayBracketsEdge = str => str[0]==='[' || str[str.length-1]===']'

const isClosedOutSideArrString = str => str[0]==='[' && str[str.length-1]===']'

const hasObjBracketsEdge = str => str[0]==='{' || str[str.length-1]==='}'

const isClosedOutSideObjString = str => str[0]==='{' && str[str.length-1]==='}'

const checkClosedArrString = str => {
    if(isClosedOutSideArrString(str)) return parseArrayString(str)
    throw new Error(`배열이 닫혀 있지 않습니다 ${str}`)
}

const checkClosedObjString = str => {
    if(isClosedOutSideObjString(str)) return parseObjString(str)
    throw new Error(`객체가 닫혀 있지 않습니다 ${str}`)
}


const makeIdObjByType = str => {
    if(hasArrayBracketsEdge(str)) return checkClosedArrString(str)
    if(hasObjBracketsEdge(str)) return checkClosedObjString(str)
    return MakeIdObjPrimitiveType(str)
  }

const addEachItemArrString = (ac, c)=> {
    c = _trimed(c)
    const item = makeIdObjByType(c)
    ac.push(item)
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
    const result = new IdentityObject('Array', 'ArrayObject')
    typeCounts.addCount('array');
    arr.reduce(addEachItemArrString, result.child)
    return result;
}

const getResultToObjObjString = arr => {
    const result = new IdentityObjObject() 
    typeCounts.addCount('object');
    arr.reduce(addEachItemObjString, result)
    return result;
}

const parseString = (str, type) => {
    if(!isString(str)) throw Error(`문자열로 값을 입력해주세요  현재값 :${str}`)
    str = _trimed(str)
    const parserType ={
        'obj': parseObjString,
        'array': parseArrayString
    }
    return parserType[type](str)
}

const parseObjString = str => {
    if(!_isObjClosed(str)) throw Error(`문자열 오브젝트가  안 닫혀 있습니다 현재값 :${str}`)
      const result = _pipe(removeBracket, splitItem, getResultToObjObjString)(str)
    return result;
  }
  
  
  const parseArrayString = str => {
    
    if(!_isArrayClosed(str)) throw Error(`문자열 배열이 안 닫혀 있습니다 현재값 :${str}`)
    const result = _pipe(removeBracket, splitItem, getResultToObjArrayString)(str)
    return result;
  }



var str = "['1a3',[null,false,['11',112,'99']], {a:'str', b:[912,[5656,33]]}, true, undefined]";
var result = parseString(str, 'array');
console.log(JSON.stringify(result, null, 2));
console.log('type Counts', typeCounts);

module.exports = Object.freeze({
    parseObjString,
    parseArrayString,
})

