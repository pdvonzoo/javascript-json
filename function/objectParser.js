/*
    ObjectParser JS
*/

exports.ObjectParser = (data) => new ObjectParser(data);

const util = require('./utility');
const lexer = require('./lexer');
// const ArrayParser = require('./arrayParser');
const {ArrayParser} = require('./arrayParser');

// 상속을 이용하려 했으나, 상호참조가 발생함..
class ObjectParser {
    constructor(data) {
        this.resultObject = {
            type: "Object",
            key: null,
            value: null,
        };

        this.dividedCharacterDatas = [];
        /*
            왜 this.mergeData = data; 는 안먹히고,
            this.inputString = data.trim() 은 먹히는지..?
            mergeData 네이밍이 문제가 있는듯함
            아래서 mergeData 를 초기화 했던 것이 문제가 되었음
        */
        // this.inputString = data.trim();
        // this.inputString = data;
        this.inputData = data;

        this.curlyObjectMode = true;

        this.startCurlyBracketsCount = 0;
        this.endCurlyBracketsCount = 0;
        this.curlyBracketsMode = false;

        this.startSquareBracket = 0;
        this.endSquareBracket = 0;

        this.squareBracketMode = false;
        this.mergeData = "";

        // this.key
    }

    getResult() {
        console.log(this.inputData);
        this.dividedCharacterDatas = util.divideString(this.inputData);
        // this.resultObject.type = lexer.checkType(this.mergeData);
        this.resultObject = this.createCurlyObject();

        if (this.errorMode) return this.errorContent;

        return this.resultObject;
    }

    recursionCase() {
        if (util.checkFirstLetterBracket(this.mergeData)) {
            // this.changeObjectProperties();
            const newObjectParser = new ObjectParser(this.mergeData);
            this.mergeData = newObjectParser.getResult();
            return this.mergeData;
        }

        const newArrayParser = ArrayParser(this.mergeData);
        this.mergeData = newArrayParser.getResult();
        // const newArrayParser = new ArrayParser(mergeData);
        // mergeData = newArrayParser.getResult();
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
                    return; // 원래 break 가 없었음 (해결필요)
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