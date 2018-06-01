/* 
    arrayParser JS
*/

const util = require('./utility');
// const tokenizer = require('./tokenizer.js');
const lexer = require('./lexer');

class ArrayParser {
    constructor(stringData) {
        this.resultObject = {
            type: null,
            child: [],
        };

        this.dividedCharacterDatas = [];
        this.inputString = stringData.trim();
        this.curlyObjectMode = false;
        this.errorMode = false;
        this.errorContent = "";

        this.inputStringLength = this.inputString.length;
        this.inputStringFirstCharacter = this.inputString[0];
        this.inputStringLastCharacher = this.inputString[this.inputStringLength-1];

        if (this.checkFirstLetterBracket(this.inputStringFirstCharacter)) {
            this.changeObjectProperties();
        }

        this.setResultObjectChildData = function(data) {
            this.resultObject.child.push(data);
        };
        
        // tokenizer Constructor ----------------------------------------------------------------------*

        this.mergeData = "";
        this.repeatCount = 0;
        this.startSquareBracketsCount = 0;
        this.endSquareBracketsCount = 0;
        this.startCurlyBracketsCount = 0;
        this.endCurlyBracketsCount = 0;
        this.curlyBracketsMode = false;
        this.recursionMode = false;
        
        this.equalCurlyBracket = function() {
            if (this.startCurlyBracketsCount === this.endCurlyBracketsCount) {
                this.curlyBracketsMode = false;
                this.mergeData = this.recursionCase(this.mergeData);
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
            return this.startSquareBracketsCount >= 2 && this.endSquareBracketsCount === 0;
        };

        this.checkOneMoreSquareBracket = function() {
            return this.startSquareBracketsCount >= 1;
        };

        this.checkEndCondition = function(arrayEndPoint) {
            return this.repeatCount === arrayEndPoint;
        };

        this.determineType = function() {
            Array.prototype.push.call(this.resultObject.child, lexer.decisionType(this.mergeData));
            console.log("-------------------------------");
            console.log(JSON.stringify(this.resultObject, null, 2));
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

    checkFirstLetterBracket(param) {
        if (param === '{') return true;
        else return false;
    }

    changeObjectProperties() {
        this.resultObject.type = "Object";
        delete this.resultObject.child;
        this.resultObject.key = null;
        this.resultObject.value = null;
        this.curlyObjectMode = true;
    }

    recursionCase(mergeData) {
        const secondArrayParser = new ArrayParser(mergeData);
        mergeData = secondArrayParser.getResult();
        return mergeData;
    }

    getResult() {

        this.dividedCharacterDatas = util.divideString(this.inputString);

        if (this.curlyObjectMode) {
            this.createCurlyObject();
        } else {
            this.resultObject.type = lexer.checkType(this.inputString);
            this.resultObject = this.createObject(this.dividedCharacterDatas, this.resultObject);
        }

        if (this.errorMode) {
            return this.errorContent;
        }

        return this.resultObject;
    }

    // Tokenizer ----------------------------------------------------------------------------------*

    checkNoDataExists(inputData) {
        // if (inputData.trim() === "") return true;
        // else return false;
        return inputData.trim() === "";
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
            if (!this.curlyBracketsMode) {
                this.curlyBracketsMode = this.checkNoDataExists(this.mergeData);
            }
        }
        if (util.checkEndCurlyBracket(element)) {
            this.endCurlyBracketsCount++;
        }
    }

    createObject(dividedCharacterDatas, resultObject) {

        const arrayEndPoint = dividedCharacterDatas.length;
        this.resultObject = resultObject;

        Array.prototype.forEach.call(dividedCharacterDatas, element => {

            /* DEBUG MODE */
            if (this.mergeData.constructor === Object && element === "}") {
                console.log();
            }

            if (this.mergeData === "{easy") { 
                console.log();
            }

            if (this.dividedCharacterDatas === "['11',[112233],{easy:['hello',{a:'a'},'world']},112]" && element === "{") {
                console.log();
            }

            if (this.mergeData === "{easy:['hello',") {
                console.log();
            }
            /* DEBUG MODE */

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
                    const recursionArrayParser = new ArrayParser(this.mergeData);
                    this.mergeData = recursionArrayParser.getResult();
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

        Array.prototype.forEach.call(this.dividedCharacterDatas, element => {
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

module.exports = ArrayParser;