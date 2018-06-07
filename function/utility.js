/*
    Utility JS
*/

exports.divideString = function(inputString) {
    return inputString.split("");
};

exports.trimString = function(inputData) {
    if (typeof(inputData) === "string") {
        return inputData.trim();
    } else {
        return inputData;
    }
};

exports.removeFirstParenthesis = function(inputData) {
    if (inputData[0] === '[') {
        const inputDataEndIndex = inputData.length;
        return inputData.substring(1, inputDataEndIndex);
    } else {
        return inputData;
    }
};

exports.removeSpace = function(inputData) {
    if (typeof(inputData) === "string") {
        return inputData.trim();
    } else {
        return inputData;
    }
};

exports.checkSpace = function(param) {
    return param === ' ';
};

exports.checkStartCurlyBracket = function(param) {
    return param === '{';
};

exports.checkEndCurlyBracket = function(param) {
    return param === '}';
};

exports.checkComma = function(param) {
    return param === ',';
};

exports.checkStartSquareBracket = function(param) {
    return param === '[';
};

exports.checkEndSquareBracket = function(param) {
    return param === ']';
};

exports.checkFirstLetterBracket = (param) => {
    console.log(param);
    console.log(param[0]);
    return param[0] === '{';
};

exports.checkNoDataExists = (inputData) => {
    return inputData.trim() === "";
};

exports.checkEndCondition = (repeatCount, arrayEndPoint) => {
    return repeatCount === arrayEndPoint;
};

exports.checkOneMoreSquareBracket = (bracketCount) => {
    // return this.startSquareBracketsCount >= 1;
    return bracketCount >= 1;
};

exports.checkEndCurlyBracketOrComma = (param) => {
    return this.checkComma(param) || this.checkEndCurlyBracket(param);
};

exports.checkColon = (param) => {
    return param === ':';
};
