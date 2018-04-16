const {_pipe} = require('../functionalUtil')
const {isString} = require('../typeCheck')
const { IdentityObjObject, IdentityObject} = require('../class/IdentityObject')
const {_isObjClosed, _isArrayClosed, splitItem, MakeIdObjPrimitiveType, checkClosedString, hasStringEdge } = require('../modules')




//정상출력

// var s2 = "['1a3',[null,false,['11',112,'99' , {a:'str', b:[912,[5656,33]]}, true]";
// var result = ArrayParser(s2);

// // 정상적으로 종료되지 않은 배열이 있습니다.

// var s3 = "['1a3',[null,false,['11',112,'99'], {a:'str', b: [912,[5656,33]], true]";
// var result = ArrayParser(s3);

// // 정상적으로 종료되지 않은 객체가 있습니다.

// var s4 = "['1a3',[null,false,['11',112,'99'], {a:'str', b  [912,[5656,33]]}, true]";
// var result = ArrayParser(s4);

// // ':'이 누락된 객체표현이 있습니다.


const removeFirstAndLast = str => {
    return str.slice(1,str.length-1)
  }

const _trimed = str => str.trim()

const removeBracket = str => str.slice(1,str.length-1)

const hasArrayBracketsEdge = str => str[0]==='[' || str[str.length-1]===']'

const isClosedOutSideArrString = str => str[0]==='[' && str[str.length-1]===']'

const hasObjBracketsEdge = str => str[0]==='{' || str[str.length-1]==='}'

const isClosedOutSideObjString = str => str[0]==='{' && str[str.length-1]==='}'

const isClosedInsideArrString = str => {
    const internalString = removeFirstAndLast(str)
    if(internalString.indexOf('[') === -1&&internalString.indexOf(']') === -1) return parseArrayString(str)
    throw new Error(`배열 내부가 닫혀 있지 않습니다 ${str}`)
}

const isClosedInsideObjString = str => {
    const internalString = removeFirstAndLast(str)
    if(internalString.indexOf('{') === -1 &&internalString.indexOf('}') === -1) return parseObjString(str)
    throw new Error(`객체 내부가 닫혀 있지 않습니다 ${str}`)
}


const checkClosedArrString = str => {
    if(isClosedOutSideArrString(str)) return parseArrayString(str)
    throw new Error(`배열이 닫혀 있지 않습니다 ${str}`)
}

const checkClosedObjString = str => {
    if(isClosedOutSideObjString(str)) return parseObjString(str)
    throw new Error(`객체가 닫혀 있지 않습니다 ${str}`)
}


const makeIdObjByType = str => {
    debugger;
    if(hasArrayBracketsEdge(str)) return checkClosedArrString(str)
    if(hasObjBracketsEdge(str)) return checkClosedObjString(str)
    // if(_isArrayClosed(str)) return parseArrayString(str)
    // if(_isObjClosed(str)) return parseObjString(str)
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
    arr.reduce(addEachItemArrString, result.child)
    return result;
}

const getResultToObjObjString = arr => {
    const result = new IdentityObjObject() 
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

// refactoirng하면서 빼먹은 04 Error Check추가 
// 닫힌 문자열 체크 / 

//1)내부가 안 닫혀 있음
//var s1 = "['1a'3']"; 

//2) 외부가 안 닫혀 있는 경우  
// var s1 = "['1a3, 3]";
// var s1 = "[1a3', 3]"; 

//3) 원시타입중에 없는 타입인 경우
// var s1 = "['1a3', 1a3]"; 

// 배열과 Object Error Check

// 1) 배열 객체 체크 

// 1.1) 배열 외부 
// var s1 = "[1,[null,false,['11',112,'99'], {a:'str', b:[912,[5656,33]]}, true]";
// var s1 = "[[2,3]] ]";

//1.2) 객체 체크
// var s1 = "[{2:3}} ]"
// var s1 = "[2: 3} ]"; 
// var s1 = "[{2 3} ]";



// var str = "['1a3',null,false,[1],2,3]]";

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



var result = parseString(s, 'array');

console.log(JSON.stringify(result, null, 2));

module.exports = Object.freeze({
    parseObjString,
    parseArrayString,
})

