/* 
    arrayParser JS
*/

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

        if (this.inputString[0] === '{') {
            this.resultObject.type = "Object";
            delete this.resultObject.child;
            this.resultObject.key = null;
            this.resultObject.value = null;
            this.curlyObjectMode = true;
        }
    }

    recursionCase(mergeData) {
        const secondArrayParser = new ArrayParser(mergeData);
        mergeData = secondArrayParser.getResult();
        return mergeData;
    }

    getResult() {
        const inputStringLength = this.inputString.length;
        const firstCharacter = this.inputString[0];
        const lastCharacter = this.inputString[inputStringLength-1];

        this.divideString();

        if (this.curlyObjectMode) {
            this.createCurlyObject();
        } else {
            this.resultObject.type = this.checkType(this.inputString);
            this.createObject();
        }

        if (this.errorMode) {
            return this.errorContent;
        }

        return this.resultObject;
    }
}

exports.arrayParser = new ArrayParser();