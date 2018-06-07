/*
    ObjectParser.js
*/

class ObjectParser {

    consturctor() {
        this.resultObject = {
            type: "Object",
            key: null,
            value: null,
        };

        this.curlyObjectMode = true;

        this.startCurlyBracketsCount = 0;
        this.endCurlyBracketsCount = 0;
        this.curlyBracketsMode = false;
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

module.exports = ObjectParser;