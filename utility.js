/*
    Utility JS
*/

exports.divideString = function(inputString) {
    return inputString.split("");
};

exports.divideString = function(inputData) {
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
    if(param === ' ') return true;
    else return false;
}

exports.checkStartCurlyBracket = function(param) {
    if (param === '{') return true;
    else return false;
}

exports.checkEndCurlyBracket = function(param) {
    if (param === '}') return true;
    else return false;
}

exports.checkComma = function(param) {
    if (param === ',') return true;
    else return false;
}

exports.checkStartSquareBracket = function(param) {
    if (param === '[') return true;
    else return false;
}

exports.checkEndSquareBracket = function(param) {
    if (param === ']') return true;
    else return false;
}
