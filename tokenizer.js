/*
    Tokenizer JS
*/

const lexer = require('./lexer');
const util = require('./utility');
// const ArrayParser = require('./arrayParser');
const ArrayParser = require('./arrayParser');
// const {arrayParser} = require('./arrayParser');

class Tokenizer {
    constructor() {
        this.resultObject = {};
        this.mergeData = "";
        this.repeatCount = 0;
        this.startSquareBracketsCount = 0;
        this.endSquareBracketsCount = 0;
        this.startCurlyBracketsCount = 0;
        this.endCurlyBracketsCount = 0;
        this.curlyBracketsMode = false;
        this.recursionMode = false;

        // DEBUG
        // this.arrayParserClass = ArrayParser;
        
        this.equalCurlyBracket = function() {
            if (this.startCurlyBracketsCount === this.endCurlyBracketsCount) {
                this.curlyBracketsMode = false;
                this.mergeData = this.recursionMode(this.mergeData);
            }
        };

        this.adjustBracketCount = function() {
            if (this.startSquareBracketsCount >= 3) {
                this.startSquareBracketsCount--;
            } else {
                this.endSquareBracketsCount++;
            }
        };

        this.checkTwoMoreSquareBracket = function() {
            if (this.startSquareBracketsCount >= 2 && this.endSquareBracketsCount === 0)
                return true; 
            else
                return false;
        };

        this.checkOneMoreSquareBracket = function() {
            if (this.startSquareBracketsCount >= 1) 
                return true;
        };

        this.checkEndCondition = function(arrayEndPoint) {
            if (this.repeatCount === arrayEndPoint)
                return true;
            else
                return false;
        };

        this.determineType = function() {
            // this.mergeData = lexer.decisionType(this.mergeData);
            this.resultObject.child.push(lexer.decisionType(this.mergeData));
            this.mergeData = "";
        };

        this.closedInnerSquareBracket = function(element) {
            if (this.endSquareBracketsCount >= 1 && 
                this.endSquareBracketsCount == this.startSquareBracketsCount-1) {
                    this.mergeData += element;
                    this.startSquareBracketsCount--;
                    this.endSquareBracketsCount--;
                    return true;
                }
        };
    }

    checkNoDataExists(inputData) {
        if (inputData.trim() === "") return true;
        else return false;
    }

    checkBracket(element) {
        if (util.checkStartSquareBracket(element)) {
            this.startSquareBracketsCount++;
        }
        if (util.checkEndSquareBracket(element)) {
            this.adjustBracketCount();
        }
        if (util.checkStartCurlyBracket(element)) {
            this.startCurlyBracketsCount++;
            this.curlyBracketsMode = this.checkNoDataExists(this.mergeData);
        }
        if (util.checkEndCurlyBracket(element)) {
            this.endCurlyBracketsCount++;
        }
    }

    createObject(dividedCharacterDatas, resultObject) {

        const arrayEndPoint = dividedCharacterDatas.length;
        this.resultObject = resultObject;

        // console.log(ArrayParser);
        // console.log(this.arrayParserClass);

        Array.prototype.forEach.call(dividedCharacterDatas, element => {
            this.repeatCount++;
            this.checkBracket(element);

            if (util.checkSpace(element)) return;

            switch(true) {
                case this.curlyBracketsMode:
                    this.mergeData += element;
                    this.equalCurlyBracket();
                    break;
                case this.checkTwoMoreSquareBracket():
                    this.mergeData += element;
                    break;
                case util.checkComma(element):
                    this.determineType();
                    break;
                case this.checkEndCondition(arrayEndPoint):
                    this.determineType();
                    break;
                case this.closedInnerSquareBracket(element):
                    // const arrayParser = new arrayParserClass(this.mergeData);
                    // this.mergeData = arrayParser.recursionCase(this.mergeData);
                    // const tempArrayParser = secondArrayParser.ArrayParser;
                    // const recursionArrayParser = tempArrayParser();
                    // const recursionArrayParser = new secondArrayParser(this.mergeData);
                    // this.mergeData = recursionArrayParser.getResult();
                    /*
                        DEBUGGER
                    */
                    // console.log(this.mergeData);
                    // console.log(ArrayParser);
                    // console.log(this.arrayParserClass);
                    // const recursionArrayParser = new secondArrayParser(this.mergeData);
                    // const recursionArrayParser = new ArrayParser(this.mergeData);

                    // console.log(tokenizerArrayParser);
                    console.log(ArrayParser);
                    
                    const recursionArrayParser = new ArrayParser(this.mergeData);
                    // const recursionArrayParser = tokenizerArrayParser(this.mergeData);
                    console.log(recursionArrayParser);
                    break;
                case this.checkOneMoreSquareBracket():
                    this.mergeData += element;
                    break;
            }
        });

        return this.resultObject;
    }

    createCurlyObject() {

        let key;
        let mergeData = "";
        let squareBracketMode = false;
        let startSquareBracket = 0;
        let endSquareBracket = 0;

        this.dividedCharacterDatas.forEach(element => {
            if (element === "]") {
                endSquareBracket++;
                if (startSquareBracket === endSquareBracket) {
                    mergeData += element;
                    squareBracketMode = false;
                    this.curlyObjectMode = true;
                    mergeData = this.recursionCase(mergeData);
                    return;
                }
                mergeData += element;
                return;
            }

            if (element === "[") {
                mergeData += element;
                startSquareBracket++;
                squareBracketMode = true;
                return;
            }
            
            if (squareBracketMode) {
                mergeData += element;
                return;
            }
            
            if (element === '{') {
                return;
            }

            if (element === '}' || element === ',') {
                mergeData = this.setObjectData("value", mergeData);
            }
            
            if (element === ":") {
                mergeData = this.setObjectData("key", mergeData);
                return;
            }

            mergeData += element;
        });
    }

    
    setObjectData(mode, inputData) {
        const initString = "";

        if (mode === "key") {
            if (this.resultObject.key === null) {
                this.resultObject.key = inputData;
            } else {
                this.resultObject.key2 = inputData;
            }
        } else {
            if (this.resultObject.value === null) {
                this.resultObject.value = inputData;
            } else {
                this.resultObject.value2 = inputData;
            }
        }

        return initString;
    }


}

module.exports = new Tokenizer();