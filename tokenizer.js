/*
    Tokenizer JS
*/

const lexer = require('./lexer');

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
        
        this.equalCurlyBracket = function() {
            if (this.startCurlyBracketsCount === this.endCurlyBracketsCount) {
                this.curlyBracketsMode = false;
                this.mergeData = this.recursionMode(this.mergeData);
            }
        };

        this.adjustBracketCount = function() {
            this.startSquareBracketsCount = 
                (this.startSquareBracketsCount >= 3) ? 
                this.startSquareBracketsCount-1 : this.endSquareBracketsCount+1;
        };

        this.checkTwoMoreSquareBracket = function() {
            if (this.startSquareBracketsCount >= 2 && this.endSquareBracketsCount === 0)
                return true; 
        };

        this.checkOneMoreSquareBracket = function() {
            if (this.startSquareBracketsCount >= 1) 
                return true;
        };

        this.checkEndCondition = function(arrayEndPoint) {
            if (this.repeatCount === arrayEndPoint)
                return true;
        };

        this.determineType = function() {
            // this.mergeData = lexer.decisionType(this.mergeData);
            this.resultObject.child.push(lexer.decisionType(this.mergeData));
            this.mergeData = "";
        };

        this.closedInnerSquareBracket = () => {
            if (this.endSquareBracketsCount >= 1 && 
                this.endSquareBracketsCount == this.startSquareBracketsCount-1) {
                    startSquareBracketsCount--;
                    endSquareBracketsCount--;
                    return true;
                }
        };
    }

    checkNoDataExists(inputData) {
        if (inputData.trim() === "")
            return true;
    }

    createObject(dividedCharacterDatas, resultObject) {

        const arrayEndPoint = dividedCharacterDatas.length;
        this.resultObject = resultObject;

        Array.prototype.forEach.call(dividedCharacterDatas, element => {
            this.repeatCount++;
            switch(element) {
                case ' ':
                    return;
                case '{':
                    this.startCurlyBracketsCount++;
                    curlyBracketsMode = checkNoDataExists(mergeData);
                    break;
                case '}':
                    this.endCurlyBracketsCount++;
                    break;
                case this.curlyBracketsMode:
                    this.mergeData += element;
                    this.equalCurlyBracket();
                    break;
                case '[':
                    this.startSquareBracketsCount++;
                    break;
                case ']':
                    this.adjustBracketCount();
                    break;
                case this.checkTwoMoreSquareBracket():
                    this.mergeData += element;
                    break;
                case ',':
                    this.determineType();
                    break;
                case this.checkEndCondition(arrayEndPoint):
                    this.determineType();
                    break;
                case this.checkOneMoreSquareBracket():
                    this.mergeData += element;
                    break;
                case this.closedInnerSquareBracket():
                    mergeData = this.recursionCase(mergeData);
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