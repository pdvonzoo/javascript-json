/*
    Utility JS
*/

const printManager = require('./printManager');

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
        printManager.errorAbnormalArray();
    }
}

exports.checkCorrectObject = (param) => {
    const startCurlyBracketNum = (param.match(/\{/g) || []).length;
    const endCurlyBracketNum = (param.match(/\}/g) || []).length;

    if (startCurlyBracketNum !== endCurlyBracketNum) {
        printManager.errorAbnormalObject();
    }
}

exports.checkCorrectColon = (param) => {
    
    /* 
        원래 적용하려했던 Regex
        key, value, key2, value2 문자열이 동시에 있는지 검사한다.
    */
    // const regex = /(?=.*key)(?=.*value)(?=.*key2)(?=.*value2).*/g;
    
    const toJsonStringData = JSON.stringify(param);

    const objectRegex = /Object/g;
    const keyValueRegex = /(?=.*key)(?=.*value)/g;
    const key2Regex = /(?=.*key2)/g;
    const value2Regex = /(?=.*value2)/g;

    if (objectRegex.test(toJsonStringData)) {
        if (!keyValueRegex.test(toJsonStringData)) {
            printManager.errorOmissionColon();
        }
        if (!key2Regex.test(toJsonStringData) && value2Regex.test(toJsonStringData)) {
            printManager.errorOmissionColon();
        }
    }
}

exports.checkMergeDataIsNull = (mergeData) => {
    if (this.checkString(mergeData) && mergeData === "") {
        printManager.notifySpaceData();
        return true;
    }
}


