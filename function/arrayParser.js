/* 
    arrayParser JS
*/

exports.ArrayParser = (stringData) => new ArrayParser(stringData);

const util = require('./utility');
const Lexer = require('./lexer');
const {ObjectParser} = require('./objectParser');
const printManager = require('./printManager');

const lexer = new Lexer();

class ArrayParser {
    constructor(stringData, recursionMode) {
        this.resultObject = {
            type: null,
            child: [],
        };

        this.inputString = stringData.trim();
        this.mergeData = "";
        this.startSquareBracketsCount = 0;
        this.endSquareBracketsCount = 0;
        this.startCurlyBracketsCount = 0;
        this.endCurlyBracketsCount = 0;
        this.recursionMode = recursionMode;
    }

    getResult() {
        util.checkCorrectArray(this.inputString);
        util.checkCorrectObject(this.inputString);
        const dividedCharacterDatas = util.divideString(this.inputString);
        this.resultObject.type = lexer.checkType(this.inputString);
        this.resultObject = this.createObject(dividedCharacterDatas, this.resultObject);
        util.checkCorrectColon(this.resultObject);
        return this.resultObject;
    }

    getStats() {
        const dataNumberObject = this.analyzeTypeNumber();
        return printManager.analyzeTypeData(dataNumberObject);
    }
    
    analyzeTypeNumber() {
        const inputData = this.inputString;
        const stringRegex = /\'[a-z0-9]+\'/g;
        const nullRegex = /null/g;
        const booleanRegex = /(true|false)+/g;
        const arrayRegex = /\[/g;
        const objectRegex = /\{/g;
        const numberRegex = /[^\']\d+[^\']/g;

        const dataNumberObject = {
            array: inputData.match(arrayRegex).length,
            string: inputData.match(stringRegex).length,
            null: inputData.match(nullRegex).length,
            boolean: inputData.match(booleanRegex).length,
            object: inputData.match(objectRegex).length,
            number: inputData.match(numberRegex).length
        };
        
        return dataNumberObject;
    }

    adjustBracketCount() {
        if (this.startSquareBracketsCount >= 3) this.startSquareBracketsCount--;
        else this.endSquareBracketsCount++;
    }

    checkTwoMoreSquareBracket() {
        return this.startSquareBracketsCount >= 2 && this.endSquareBracketsCount === 0;
    }

    equalCurlyBracket() {
        if (this.startCurlyBracketsCount === this.endCurlyBracketsCount) {
            this.curlyBracketsMode = false;
            this.mergeData = this.recursionCase(this.mergeData);
        }
    }

    closedInnerSquareBracket(element) {
        if (this.endSquareBracketsCount >= 1 && 
            this.endSquareBracketsCount == this.startSquareBracketsCount-1) {
                this.mergeData += element;
                this.startSquareBracketsCount--;
                this.endSquareBracketsCount--;
                return true;
            }
    }

    determineType() {
        const dataType = lexer.decisionType(this.mergeData);
        this.setResultObjectChildData(dataType);
        this.mergeData = "";
    }

    setResultObjectChildData(data) {
        Array.prototype.push.call(this.resultObject.child, data);
    }

    recursionCase(mergeData) {
        if (util.checkFirstLetterBracket(mergeData)) {
            const newObjectParser = ObjectParser(mergeData);
            this.mergeData = newObjectParser.getResult();
            return this.mergeData;
        }

        const secondArrayParser = new ArrayParser(mergeData);
        mergeData = secondArrayParser.getResult();
        return mergeData;
    }

    checkBracket(element) {

        if (util.checkStartCurlyBracket(element)) {
            this.startCurlyBracketsCount++;
            if (!this.curlyBracketsMode) {
                this.curlyBracketsMode = util.checkNoDataExists(this.mergeData);
            }
        }
        if (util.checkEndCurlyBracket(element)) {
            this.endCurlyBracketsCount++;
        }

        if (this.curlyBracketsMode) return;

        if (util.checkStartSquareBracket(element)) {
            this.startSquareBracketsCount++;
        }
        if (util.checkEndSquareBracket(element)) {
            this.adjustBracketCount();
        }
    }

    createObject(dividedCharacterDatas, resultObject) {

        let repeatCount = 0;
        const arrayEndPoint = dividedCharacterDatas.length;
        this.resultObject = resultObject;

        Array.prototype.forEach.call(dividedCharacterDatas, element => {
            repeatCount++;
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
                    if(util.checkMergeDataIsNull(this.mergeData)) return;
                    this.determineType();
                    break;
                case util.checkEndCondition(repeatCount, arrayEndPoint):
                    this.determineType();
                    break;
                case this.closedInnerSquareBracket(element):
                    this.mergeData = this.recursionCase(this.mergeData);
                    break;
                case util.checkOneMoreSquareBracket(this.startSquareBracketsCount):
                    this.mergeData += element;
                    break;
            }
        });

        return this.resultObject;
    }    
}