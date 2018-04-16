const testUtil = require('../testUtil')
const splitItem = require('./splitItem')
const {IdentityObject} = require('../class/IdentityObject')


const typeCounts = {
  'string': 0,
  'number': 0,
  'boolean': 0,
  'undefined': 0,
  'null': 0,
  'array': 0,
  'object': 0,
  'function': 0,
  addCount(type){
      this[type]+=1
  }
}

const removeFirstAndLast = str => {
  return str.slice(1,str.length-1)
}

const _isArrayClosed = str => {
  return str[0]==='[' && str[str.length-1] ===']'
}

const _isObjClosed = str => {
  str = str.trim();
  return str[0]==='{' && str[str.length-1] ==='}'
}

const stringSelector = '\''

const isNullString = str => str ==='null'

const hasStart = str => str[0]===stringSelector
const hasEnd = str => str[str.length-1]===stringSelector


const hasStringEdge = str => str[0]===stringSelector || str[str.length-1]===stringSelector

const isClosedOutSide = str=> str[0]===stringSelector && str[str.length-1]===stringSelector

const makeIdObjandUpdaeCounts = (type, str) =>{
  const makeOne = new IdentityObject(type, str)
  typeCounts.addCount(type)
  return makeOne
}


const isClosedInside = (str) => {
  const internalString = removeFirstAndLast(str)
  if(internalString.indexOf(stringSelector) === -1) return makeIdObjandUpdaeCounts('string', str)
  throw new Error(`invalid String type not closed insied ${str}`)
}

const isBooleanString = str => str === 'false' || str === 'true'

const isUndefinedString = str => str === 'undefined'

const checkClosedString = (str) => {
  if(isClosedOutSide(str)) return isClosedInside(str)
  throw new Error(`invalid String type not closed outside' ${str}`)
}


const MakeIdObjPrimitiveType = str => {
  if(hasStringEdge(str)) return checkClosedString(str)
  if(!isNaN(str)) return makeIdObjandUpdaeCounts('number', str)
  if(isBooleanString(str)) return makeIdObjandUpdaeCounts('boolean', str)
  if(isNullString(str)) return makeIdObjandUpdaeCounts('null', str)
  if(isUndefinedString(str)) return makeIdObjandUpdaeCounts('undefined', str) 
  throw new Error(`${str} 는 알 수 없는 타입입니다`) 
}


module.exports = Object.freeze({
    splitItem,
    _isArrayClosed,
    _isObjClosed,
    MakeIdObjPrimitiveType,
    checkClosedString,
    typeCounts,
  });