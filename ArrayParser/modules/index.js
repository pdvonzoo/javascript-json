const testUtil = require('../testUtil')
const splitItem = require('./splitItem')
const _isArrayClosed = require('./_isArrayClosed') 
const _isObjClosed = require('./_isObjString')
const {IdentityObject} = require('../class/IdentityObject')


const stringSelector = '\''

const isNullString = str => str ==='null'

const isNormalString = str => str[0]===stringSelector&&str[str.length-1]===stringSelector

const isBooleanString = str => str === 'false' || str === 'true'

const isUndefinedString = str => str === 'undefined'


const MakeIdObjPrimitiveType = str => {
  if(isNormalString(str)) return new IdentityObject('string', str)
  if(!isNaN(str)) return new IdentityObject('number',str) 
  if(isBooleanString(str)) return new IdentityObject('boolean',str)
  if(isNullString(str)) return new IdentityObject('null', str)
  if(isUndefinedString(str)) return new IdentityObject('undefined',str)
  return str; 
}


module.exports = Object.freeze({
    splitItem,
    _isArrayClosed,
    _isObjClosed,
    // isNormalString,
    // isNullString,
    // isBooleanString,
    // isUndefinedString,
    MakeIdObjPrimitiveType,
  });