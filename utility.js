/*
    Utility JS
*/

class utility {

    constructor() {

    }

    divideString() {
        this.dividedCharacterDatas = this.inputString.split("");
    }

    removeSpace(inputData) {
        if (typeof(inputData) === "string") {
            return inputData.trim();
        } else {
            return inputData;
        }
    }

    removeFirstParenthesis(inputData) {
        if (inputData[0] === '[') {
            const inputDataEndIndex = inputData.length;
            return inputData.substring(1, inputDataEndIndex);
        } else {
            return inputData;
        }
    }
}

exports.uility = new utility();