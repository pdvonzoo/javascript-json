/* 
    @crong 피드백

    이 함수가 createObject 함수와 중복아닌 중복인 느낌이죠?
    이 두개의 비슷한 큰 덩어리가 분리되어 있는 점이 아쉽네요.
    개선하기 쉽지 않지만요.

    if 하위 내용을 모조로 함수로 다 분리할 수 있겠네요.
    if(endCase) xxxx();
    if(endCase2) xxxx2();    

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

    divideString() {
        this.dividedCharacterDatas = this.inputString.split("");
    }

    recursionCase(mergeData) {
        const secondArrayParser = new ArrayParser(mergeData);
        mergeData = secondArrayParser.getResult();
        return mergeData;
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

    typeDecision(inputData) {
        const initString = "";

        inputData = this.removeFirstParenthesis(inputData);
        if (inputData.constructor === Object || inputData.type === 'Array') {
            this.resultObject.child.push(inputData);
        } else {
            inputData = (inputData === "null") ? null : inputData;
            inputData = this.removeSpace(inputData);
            inputData = this.checkCorrectString(inputData);
            const dataObject = {
                type: this.checkType(inputData),
                value: inputData,
                child: []
            };
            this.resultObject.child.push(dataObject);
        }
        return initString;
    }

    checkCorrectString(inputData) {

        if(typeof(inputData) !== "string") {
            return inputData;
        }

        let errorCount = 0;
        if (inputData.includes("'")) {
            let smallQuotesPosition = inputData.indexOf("'");
            const endCondtion = -1;
            
            while (smallQuotesPosition !== endCondtion) {
                errorCount++;
                smallQuotesPosition = inputData.indexOf("'", smallQuotesPosition + 1);
            }
        }

        if (errorCount >= 3) { 
            this.errorMode = true;
            this.errorContent = inputData;
            console.log(inputData + "(은/는) 올바른 문자열이 아닙니다");
            process.exit();
        }
        return inputData;
    }

    removeSpace(inputData) {
        if (typeof(inputData) === "string") {
            return inputData.trim();
        } else {
            return inputData;
        }
    }

    removeFirstParenthesis(inputData) {
        if (inputData[0] === '[') {
            const inputDataEndIndex = inputData.length;
            return inputData.substring(1, inputDataEndIndex);
        } else {
            return inputData;
        }
    }

    checkType(params) {

        const onlyNumberRegex = /^[0-9]*$/;

        if (params === null) { return 'Null'; }

        const parameterEndIndex = params.length - 1;

        if (params === "true" || params == "false") { return 'Boolean'; }
        if (params.constructor === Object) { return 'Object'; }
        if (params.includes("[") && params.includes("]")) { return 'Array'; }
        if (params[0] === "'" && params[parameterEndIndex] === "'") { return 'String'; }
        if (onlyNumberRegex.test(params)) { return "Number"; } 
        else {
            console.log(params + "(은/는) 알 수 없는 타입입니다");
            process.exit();
        }
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

function run() {

    // const stringData = "[123, [22], 33]";
    // const stringData = "[123, [1,2,3,4,5], 33]";
    // const stringData = "[123,[22,23,[11,[112233],112],55],33]";
    // const stringData = "['1a3',[null,false,['11',[112233],112],55, '99'],33, true]";
    // const stringData = "['1a'3',[22,23,[11,[112233],112],55],33]";
    // const stringData = "['1a3',[22,23,[11,[112233],112],55],3d3]";
    const stringData = "['1a3',[null,false,['11',[112233],{easy : ['hello', {a:'a'}, 'world']},112],55, '99'],{a:'str', b:[912,[5656,33],{key : 'innervalue', newkeys: [1,2,3,4,5]}]}, true]";

    const arrayParser = new ArrayParser(stringData);
    const result = arrayParser.getResult();
    
    console.log(JSON.stringify(result, null, 2));
}

run();