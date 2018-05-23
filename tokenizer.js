/*
    Tokenizer JS
*/

class tokenizer {
    constructor() {

    }

    createObject() {
        let mergeData = "";
        let repeatCount = 0;
        let startSquareBracketsCount = 0;
        let endSquareBracketsCount = 0;
        let startCurlyBracketsCount = 0;
        let endCurlyBracketsCount = 0;
        let curlyBracketsMode = false;
        let recursionMode = false;
        const arrayEndPoint = this.dividedCharacterDatas.length;

        this.dividedCharacterDatas.forEach(element => {
            repeatCount++;

            if (element === ' ') {
                return;
            }

            if (element === '{') {
                startCurlyBracketsCount++;
                if (mergeData.trim() === "") {
                    curlyBracketsMode = true;
                }
            }

            if (element === '}') {
                endCurlyBracketsCount++;
            }

            if (curlyBracketsMode) {
                mergeData += element;
                if (startCurlyBracketsCount === endCurlyBracketsCount) {
                    curlyBracketsMode = false;
                    mergeData = this.recursionCase(mergeData);
                }
                return;
            }

            if (element === '[') {
                startSquareBracketsCount++;
            }
            
            if (element === ']') {
                if (startSquareBracketsCount >= 3) {
                    startSquareBracketsCount--;
                } else {
                    endSquareBracketsCount++;
                }
            }

            if (startSquareBracketsCount >= 2 && endSquareBracketsCount === 0) {
                mergeData += element;
                return;
            }

            if (element === ',' || repeatCount === arrayEndPoint) {
                mergeData = this.typeDecision(mergeData);
                return;
            }

            if (startSquareBracketsCount >= 1) {
                mergeData += element;
            }

            if (endSquareBracketsCount >= 1 && 
                endSquareBracketsCount == startSquareBracketsCount-1) {
                startSquareBracketsCount--;
                endSquareBracketsCount--;
                mergeData = this.recursionCase(mergeData);
            }
        });
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

exports.tokenizer = new tokenizer();