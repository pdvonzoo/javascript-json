const _isArrayClosed = require('../modules/_isArrayClosed')
const {_pipe} = require('../functionalUtil')
const {isString} = require('../typeCheck')
const {IdentityObject, IdObjNumber, IdObjNull, IdObjString, IdObjBoolean, IdObjUndefiend, IdObjArray, IdObjObj} = require('../class/IdentityObject')
const {splitItem, isNullString, isNormalString, isBooleanString, isUndefinedString, _isObjClosed} = require('../modules')

var str = "['1a3',[null,false,['11',[112233],{easy : ['hello', {a:'a'}, 'world']},112],55, '99'],{a:'str', b:[912,[5656,33],{key : 'innervalue', newkeys: [1,2,3,4,5]}]}, true]";

const _trimed = str => str.trim()

const removeBracket = str => {
    return str.slice(1,str.length-1)
}

const makeIdObjByType = str => {
    if(isNormalString(str)) return new IdObjString(str)
    if(!isNaN(str)) return new IdObjNumber(str) 
    if(isBooleanString(str)) return new IdObjBoolean(str)
    if(isNullString(str)) return new IdObjNull(str)
    if(isUndefinedString(str)) return new IdObjUndefiend(str) 
    if(_isArrayClosed(str)) return ArrayParser(str)
    if(_isObjClosed(str)) return ObjParser(str)
}


const resultToObjArrayString = arr => {
    const result = new IdObjArray()
    arr.reduce((ac,c)=> {
        c = _trimed(c)
        const item = makeIdObjByType(c)
        ac.push(item)
        return ac;
    }, result.child)
    return result;
}

const resultToObjObjString = arr => {
    const result = new IdObjObj() 
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

const Parser = (str, type) => {
    if(!isString(str)) throw Error(`문자열로 값을 입력해주세요  현재값 :${str}`)
    str = _trimed(str)
    const parserType ={
        'obj': ObjParser,
        'array': ArrayParser
    }
    return parserType[type](str)
}


const ObjParser = str => {
    if(!_isObjClosed(str)) throw Error(`문자열 오브젝트가  안 닫혀 있습니다 현재값 :${str}`)
      const result = _pipe(removeBracket, splitItem, resultToObjObjString)(str)
    return result;
}


const ArrayParser = str => {
    if(!_isArrayClosed(str)) throw Error(`문자열 배열이 안 닫혀 있습니다 현재값 :${str}`)
    const result = _pipe(removeBracket, splitItem, resultToObjArrayString)(str)
    return result;
}

// const result = ArrayParser(str);
// console.log(JSON.stringify(result, null, 2));

const result = Parser(str, 'array')
console.log(JSON.stringify(result, null, 2));

module.exports = ArrayParser

