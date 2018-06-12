/*
    Lexer JS
*/

const util = require('./utility');
const print = require('./print');

class Lexer {
    constructor() {}

    decisionType(inputData) {
        const initString = "";

        inputData = util.removeFirstParenthesis(inputData);
        if (inputData.constructor === Object || inputData.type === 'Array') {
            return inputData;
        } else {
            inputData = (inputData === "null") ? null : inputData;
            inputData = util.removeSpace(inputData);
            inputData = this.checkCorrectData(inputData);

            const dataObject = {
                type: this.checkType(inputData),
                value: inputData,
                child: []
            };
            return dataObject;
        }
        return initString;
    }

    checkCorrectData(inputData) {

        if(typeof(inputData) !== "string") {
            return inputData;
        }

        if (util.existBracketPair(inputData)) {
            return inputData;
        }

        let errorCount = 0;
        if (inputData.includes("'")) {
            let smallQuotesPosition = inputData.indexOf("'");
            const endCondtion = -1;
            
            while (smallQuotesPosition !== endCondtion) {
                errorCount++;
                smallQuotesPosition = inputData.indexOf("'", smallQuotesPosition + 1);
            }
        }

        if (errorCount >= 3) {
            this.errorMode = true;
            this.errorContent = inputData;
            print.errorAbnormalString(inputData);
        }
        return inputData;
    }

    
    checkType(params) {

        const onlyNumberRegex = /^[0-9]*$/;

        if (params === null) { return 'Null'; }

        const parameterEndIndex = params.length - 1;

        if (params === "true" || params == "false") { return 'Boolean'; }
        if (params.constructor === Object) { return 'Object'; }
        if (params.includes("[") && params.includes("]")) { return 'Array'; }
        if (params[0] === "'" && params[parameterEndIndex] === "'") { return 'String'; }
        if (onlyNumberRegex.test(params)) { return "Number"; } 
        else { print.errorUnknownType(params); }
    }
}

module.exports = Lexer;