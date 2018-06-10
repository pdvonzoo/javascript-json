/*
    Utility JS
*/

const print = require('./print');

exports.divideString = function(inputString) {
    return inputString.split("");
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
    if (this.checkString(inputData)) {
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
    return param[0] === '{';
};

exports.checkNoDataExists = (inputData) => {
    return inputData.trim() === "";
};

exports.checkEndCondition = (repeatCount, arrayEndPoint) => {
    return repeatCount === arrayEndPoint;
};

exports.checkOneMoreSquareBracket = (bracketCount) => {
    return bracketCount >= 1;
};

exports.checkEndCurlyBracketOrComma = (param) => {
    return this.checkComma(param) || this.checkEndCurlyBracket(param);
};

exports.checkColon = (param) => {
    return param === ':';
};

exports.existBracketPair = (param) => {
    return param.includes("[") && param.includes("]");
};

exports.checkString = (param) => {
    return typeof(param) === "string";
}

exports.checkCorrectArray = (param) => {
    const startSquareBracketNum = (param.match(/\[/g) || []).length;
    const endSquareBracktNum = (param.match(/\]/g) || []).length;

    if (startSquareBracketNum !== endSquareBracktNum) {
        print.errorAbnormalArray();
    }
}

exports.checkCorrectObject = (param) => {
    const startCurlyBracketNum = (param.match(/\{/g) || []).length;
    const endCurlyBracketNum = (param.match(/\}/g) || []).length;

    if (startCurlyBracketNum !== endCurlyBracketNum) {
        print.errorAbnormalObject();
    }
}

exports.checkCorrectColon = (param) => {
    const toJsonStringData = JSON.stringify(param, null, 2)
    const inclusionKEY = toJsonStringData.includes("key");
    const inclusionKEY2 = toJsonStringData.includes("key2");
    const inclusionVALUE = toJsonStringData.includes("value");
    const inclusionVALUE2 = toJsonStringData.includes("value2");

    if (inclusionKEY && inclusionVALUE2 && !inclusionKEY2) {
        print.errorOmissionColon();
    }
}


