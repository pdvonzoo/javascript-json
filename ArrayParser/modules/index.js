const testUtil = require('../testUtil')
const splitItem = require('./splitItem')
const _isArrayClosed = require('./_isArrayClosed') 
const _isObjClosed = require('./_isObjString')

const stringSelector = '\''

const isNullString = str => str ==='null'

const isNormalString = str => str[0]===stringSelector&&str[str.length-1]===stringSelector

const isBooleanString = str => str === 'false' || str === 'true'

const isUndefinedString = str => str === 'undefined'

module.exports = Object.freeze({
    isNullString,
    splitItem,
    _isArrayClosed,
    _isObjClosed,
    isNormalString,
    isBooleanString,
    isUndefinedString
  });