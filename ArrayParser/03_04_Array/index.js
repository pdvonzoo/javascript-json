const _isArrayClosed = require('../modules/_isArrayClosed')
const {_pipe} = require('../functionalUtil')
const {isString} = require('../typeCheck')
const {IdentityObject, IdObjNumber, IdObjNull, 
        IdObjString, IdObjBoolean, IdObjUndefiend, IdObjArray
    } = require('../class/IdentityObject')
const {splitItem, isNullString, isNormalString, isBooleanString, isUndefinedString} = require('../modules')

var str = "['1a3',[null,false,['11',[112233],112],55, '99'],33, true,undefined]" 


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
}


const resultToObj = arr => {
    const result = new IdObjArray()

    arr.reduce((ac,c)=> {
        c = _trimed(c)
        const item = makeIdObjByType(c)
        ac.push(item)
        return ac;
    }, result.child)
    return result;
}



const ArrayParser = str => {
    if(!isString(str)) throw Error(`문자열로 값을 입력해주세요  현재값 :${str}`)
    str = _trimed(str)
    debugger;
    if(!_isArrayClosed(str)) throw Error(`문자열 배열이 안 닫혀 있습니다 현재값 :${str}`)
    const result = _pipe(removeBracket, splitItem, resultToObj)(str)
    return result;
}

const result = ArrayParser(str);
console.log(JSON.stringify(result, null, 2));

module.exports = ArrayParser

