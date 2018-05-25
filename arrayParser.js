/* 
    arrayParser JS
*/

const util = require('./utility');
const tokenizer = require('./tokenizer.js');
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
            tokenizer.createCurlyObject();
        } else {
            this.resultObject.type = lexer.checkType(this.inputString);
            this.resultObject = tokenizer.createObject(this.dividedCharacterDatas, this.resultObject);
        }

        if (this.errorMode) {
            return this.errorContent;
        }

        return this.resultObject;
    }
}

// exports.ArrayParser = ArrayParser;
module.exports = ArrayParser;