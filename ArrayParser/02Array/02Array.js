const _isArrayClosed = require('../modules/_isArrayClosed')
const {_pipe} = require('../functionalUtil')
const {isString} = require('../typeCheck')
const {IdentityObject, IdObjNumber} = require('../class/IdentityObject')
const splitItem = require('../modules/splitItem')

var str = "[123,[22], 33, [1,2,3,4,5]]";


// error Test

// var str2 = 123;
// var str3 = "[123, 22, 33";

const _trimed = str => str.trim()

// 닫혀있으면 제거 한다 아니면 

const removeBracket = str => {
    return str.slice(1,str.length-1)
}

const makeIdObjByType = str => {
    if(!isNaN(str)) return new IdentityObject('number', str) 
    if(_isArrayClosed(str)) return ArrayParser(str)
}


const resultToObj = arr => {
    const result = new IdentityObject('array', 'ArrayObject',[])

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

