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
    return param === ' ';
}

exports.checkStartCurlyBracket = function(param) {
    return param === '{';
}

exports.checkEndCurlyBracket = function(param) {
    return param === '}';
}

exports.checkComma = function(param) {
    return param === ',';
}

exports.checkStartSquareBracket = function(param) {
    return param === '[';
}

exports.checkEndSquareBracket = function(param) {
    return param === ']';
}
