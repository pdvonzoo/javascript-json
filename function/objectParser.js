/*
    ObjectParser JS
*/

exports.ObjectParser = (data) => new ObjectParser(data);

const util = require('./utility');
const lexer = require('./lexer');
const {ArrayParser} = require('./arrayParser');

class ObjectParser {
    constructor(data) {
        this.resultObject = {
            type: "Object",
            key: null,
            value: null,
        };

        this.dividedCharacterDatas = [];
        this.inputData = data;
        this.curlyObjectMode = true;
        this.startCurlyBracketsCount = 0;
        this.endCurlyBracketsCount = 0;
        this.curlyBracketsMode = false;
        this.startSquareBracket = 0;
        this.endSquareBracket = 0;
        this.squareBracketMode = false;
        this.mergeData = "";
    }

    getResult() {
        this.dividedCharacterDatas = util.divideString(this.inputData);
        this.resultObject = this.createCurlyObject();
        if (this.errorMode) return this.errorContent;
        return this.resultObject;
    }

    recursionCase() {
        if (util.checkFirstLetterBracket(this.mergeData)) {
            const newObjectParser = new ObjectParser(this.mergeData);
            this.mergeData = newObjectParser.getResult();
            return this.mergeData;
        }

        const newArrayParser = ArrayParser(this.mergeData);
        this.mergeData = newArrayParser.getResult();
        return this.mergeData;
    }

    startSquareMode(element) {
        this.mergeData += element;
        this.startSquareBracket++;
        this.squareBracketMode = true;
    }

    equalSquareBracket(element) {
        if (this.startSquareBracket === this.endSquareBracket) {
            this.mergeData += element;
            this.squareBracketMode = false;
            this.curlyObjectMode = true;
            this.mergeData = this.recursionCase(this.mergeData);
            return;
        }
        this.mergeData += element;
    }

    createCurlyObject() {
        Array.prototype.forEach.call(this.dividedCharacterDatas, element => {

            switch(true) {
                case util.checkEndSquareBracket(element):
                    this.endSquareBracket++;
                    this.equalSquareBracket(element);
                    return;
                case util.checkStartSquareBracket(element):
                    this.startSquareMode(element);
                    return;
                case this.squareBracketMode:
                    this.mergeData += element;
                    return;
                case util.checkStartCurlyBracket(element):
                    return;
                case util.checkEndCurlyBracketOrComma(element):
                    this.mergeData = this.setObjectData("value", this.mergeData);
                    return;
                case util.checkColon(element):
                    this.mergeData = this.setObjectData("key", this.mergeData);
                    return;
            }
            this.mergeData += element;
        });

        return this.resultObject;
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