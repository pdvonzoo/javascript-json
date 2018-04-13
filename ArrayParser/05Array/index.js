const {_pipe} = require('../functionalUtil')
const {isString} = require('../typeCheck')
const { IdentityObjObject, IdentityObject} = require('../class/IdentityObject')
const {_isObjClosed, _isArrayClosed, splitItem, MakeIdObjPrimitiveType} = require('../modules')

var str = "['1a3',[null,false,['11',[112233],{easy : ['hello', {a:'a'}, 'world']},112],55, '99'],{a:'str', b:[912,[5656,33],{key : 'innervalue', newkeys: [1,2,3,4,5]}]}, true]";

const _trimed = str => str.trim()

const removeBracket = str => {
    return str.slice(1,str.length-1)
}

const makeIdObjByType = str => {
    if(_isArrayClosed(str)) return parseArrayString(str)
    if(_isObjClosed(str)) return parseObjString(str)
    return MakeIdObjPrimitiveType(str)
  }


const resultToObjArrayString = arr => {
    const result = new IdentityObject('Array', 'ArrayObject')
    arr.reduce((ac,c)=> {
        c = _trimed(c)
        const item = makeIdObjByType(c)
        ac.push(item)
        return ac;
    }, result.child)
    return result;
}

const resultToObjObjString = arr => {
    const result = new IdentityObjObject() 
    arr.reduce((ac,c)=>{
        const divisor = c.indexOf(':')
        const key = c.slice(0,divisor).trim()
        const value = c.slice(divisor+1).trim()
        ac.key = key;
        ac.value = makeIdObjByType(value)
        return ac;
    }, result)
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
      const result = _pipe(removeBracket, splitItem, resultToObjObjString)(str)
    return result;
  }
  
  
  const parseArrayString = str => {
    if(!_isArrayClosed(str)) throw Error(`문자열 배열이 안 닫혀 있습니다 현재값 :${str}`)
    const result = _pipe(removeBracket, splitItem, resultToObjArrayString)(str)
    return result;
  }





// const result = ArrayParser(str);
// console.log(JSON.stringify(result, null, 2));

const result = parseString(str, 'array')
console.log(JSON.stringify(result, null, 2));



module.exports = Object.freeze({
    parseObjString,
    parseArrayString,
})

