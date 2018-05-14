/* 
    Object 타입 ( { key: value} ) 도 지원한다.
    배열안에 object, object안에 배열이 자유롭게 포함될 수 있다.
    지금까지의 코드를 리팩토링한다.
        복잡한 세부로직은 반드시 함수로 분리해본다.
        최대한 작은 단위의 함수로 만든다.
        중복된 코드역시 함수로 분리해서 일반화한다.
        객체형태의 class로 만든다.

    @crong 피드백
    다만, createObject 함수의 크기는 더 커지지 않도록 하고,
    다른 함수들도 이정도 크기를 넘지 않도록 해야
    기능개선과 추가도 쉬울 겁니다.
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

            if (element === '9') {
                console.log("BP");
            }

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

                    const secondArrayParser = new ArrayParser(mergeData);
                    mergeData = secondArrayParser.getResult();
                }
                return;
            }

            if (element === '[') { startSquareBracketsCount++; }
            if (element === ']') {
                if (startSquareBracketsCount >= 3) { startSquareBracketsCount--; }
                else { endSquareBracketsCount++; }
            }

            if (startSquareBracketsCount >= 2 &&
                endSquareBracketsCount === 0) {
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

                const secondArrayParser = new ArrayParser(mergeData);
                mergeData = secondArrayParser.getResult();
            }
        });
    }

    /* 
        @INPUT : {easy : ['hello', {a:'a'}, 'world']}
        @OUTPUT :
            {
                "type": Object
                "Key": easy
                "Value: [
                    {
                        "type": "String"
                        "value": "'hello'"
                        "child": []
                    },
                    {
                        "type": "Object"
                        "key": "a"
                        "value": "'a'"
                    },
                    {
                        "type": "String"
                        "value": "'world'"
                        "child": []
                    }
                ]
            }
    */
    createCurlyObject(inputData, param1, param2) {

        // log
        if (this.inputString === "{a:'str',b:[912,[5656,33],{key:'innervalue',newkeys:[1,2,3,4,5]}]}") {
            console.log("log");
        }

        let key;
        let mergeData = "";
        let squareBracketMode = false;
        let startSquareBracket = 0;
        let endSquareBracket = 0;

        this.dividedCharacterDatas.forEach(element => {
            if (element === "]") {
                endSquareBracket++;
                if (startSquareBracket === endSquareBracket) {
                    squareBracketMode = false;
                    mergeData += element;
                    this.curlyObjectMode = true;
                    // mergeData = this.createObject(mergeData);
                    const secondArrayParser = new ArrayParser(mergeData);
                    mergeData = secondArrayParser.getResult();
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
                if (this.resultObject.value === null) {
                    this.resultObject.value = mergeData;
                } else {
                    this.resultObject.value2 = mergeData;
                }
                mergeData = "";
                return;
            }

            // if (element === ',') {
                
            // }

            if (element === ":") {
                if (this.resultObject.key === null) {
                    this.resultObject.key = mergeData.trim();
                } else {
                    this.resultObject.key2 = mergeData.trim();
                }
                mergeData = "";
                return;
            }

            mergeData += element;
        });


    }

    // 3개 이상일 경우는 ?
    createObjectKeyAndValue() {
        if (this.resultObject.key === null) {
            return false;
        } else {
            this.resultObject.key2 = null;
            this.resultObject.value2 = null;
            return true;
        }
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