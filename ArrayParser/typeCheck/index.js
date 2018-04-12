const Types = {
    Number: "number",
    String: "string",
    Boolean: "boolean",
    Array: "array",
    Object: "object",
    Function: "function",
    Null: "null",
    Undefined: "undefined",
  }
  
  const checkType = dataType => {
    return Object.prototype.toString
      .call(dataType)
      .slice(8, -1)
      .toLowerCase();
  };
  const isNumber = dataType => {
    return checkType(dataType) === Types.Number;
  };
  const isString = dataType => {
    return checkType(dataType) === Types.String;
  };
  const isBoolean = dataType => {
    return checkType(dataType) === Types.Boolean;
  };
  const isArray = dataType => {
    return checkType(dataType) === Types.Array;
  };
  const isObject = dataType => {
    return checkType(dataType) === Types.Object;
  };
  const isNull = dataType => {
    return checkType(dataType) === Types.Null;
  };
  const isUndefined = dataType => {
    return checkType(dataType) === Types.Undefined;
  };
  const isFunction = dataType => {
    return checkType(dataType) === Types.Function;
  };
  
  module.exports = Object.freeze({
    checkType,
    isString,
    isNumber,
    isBoolean,
    isArray,
    isObject,
    isNull,
    isUndefined,
    isFunction,
  });
  