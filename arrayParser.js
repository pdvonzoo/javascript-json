/* 
    4. 여러가지 타입분석
    
    - 요구사항
    숫자타입이외에 string, boolean, null 타입도 지원하도록 구현한다.
    ['1a3',[null,false,['11',[112233],112],55, '99'],33, true]"

    올바른 문자열이 아닌 경우 오류를 발생한다. (아래 실행결과 참고)
    타입체크를 정규표현식을 사용하는 경우, backreference를 활용하는 것을 추천.
    복잡한 세부로직은 함수로 분리해본다.
    중복된 코드역시 함수로 분리해서 일반화한다.

    - 실행결과
    var s = "['1a3',[null,false,['11',[112233],112],55, '99'],33, true]";
    var result = ArrayParser(str);
    console.log(JSON.stringify(result, null, 2)); 

    var s = "['1a'3',[22,23,[11,[112233],112],55],33]";  //'1a'3'은 올바른 문자열이 아닙니다.
    var result = ArrayParser(str);
    ==>  //'1a'3'은 올바른 문자열이 아닙니다.

    var s = "['1a3',[22,23,[11,[112233],112],55],3d3]";  // 3d3은 알수 없는 타입입니다
    var result = ArrayParser(str);
    ==> // 3d3은 알수 없는 타입입니다
*/

class ArrayParser {
    
    constructor(stringData) {
        this.resultObject = {
            type: null,
            child: [],
        }
        this.dividedCharacterDatas = [];
        this.inputString = stringData;
        this.errorMode = false;
        this.errorContent = "";
    }

    divideString() {
        this.dividedCharacterDatas = this.inputString.split("");
    }

    createObject() {
        let mergeData = "";
        let repeatCount = 1;
        let startParenthesisCount = 0;
        let endParenthesisCount = 0;
        let recursionMode = false;
        const arrayEndPoint = this.dividedCharacterDatas.length;
        const dataObject = {
            type: this.checkType(mergeData),
            value: mergeData,
            child: [],
        }

        this.dividedCharacterDatas.forEach(element => {
            if (element === '[') { startParenthesisCount++; }
            if (element === ']') {
                if (startParenthesisCount >= 3) { startParenthesisCount--; }
                else { endParenthesisCount++; }
            }

            if (startParenthesisCount >= 2 && !recursionMode) { mergeData += element; }
            else if (element === ',' || repeatCount === arrayEndPoint) {
                mergeData = this.typeDetermination(mergeData);
            } else if (startParenthesisCount >= 1) { mergeData += element; }

            if (mergeData === "" ||  repeatCount === arrayEndPoint) { } 
            else if (endParenthesisCount >= 1 && endParenthesisCount === startParenthesisCount-1) {
                startParenthesisCount--;
                endParenthesisCount--;
                recursionMode = true;

                const secondArrayParser = new ArrayParser(mergeData);
                mergeData = secondArrayParser.getResult();
            }
            repeatCount++;
        });
    }

    typeDetermination(inputData) {
        inputData = this.removeFirstParenthesis(inputData);
        if (typeof(inputData) === Object || inputData.type === 'Array') {
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
        return "";
    }

    checkCorrectString(inputData) {

        if(typeof(inputData) !== "string") {
            return inputData;
        }

        let count = 0;
        if (inputData.includes("'")) {
            let pos = inputData.indexOf("'");
            const endCondtion = -1;
            
            while (pos !== endCondtion) {
                count++;
                pos = inputData.indexOf("'", pos+1);
            }
        }

        if (count >= 3) { 
            this.errorMode = true;
            this.errorContent = inputData;
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

        if (params === null) { return 'Null'; }

        const parameterEndIndex = params.length - 1;

        if (params === "true" || params == "false") { return 'Boolean'; }
        if (params.constructor === Object) { return 'Object'; }
        if (params.includes("[") && params.includes("]")) { return 'Array'; }
        if (params[0] === "'" && params[parameterEndIndex] === "'") { return 'String'; }
        if (parseInt(params) !== NaN) { return 'Number'; }
    }

    getResult() {
        const inputStringLength = this.inputString.length;
        const firstCharacter = this.inputString[0];
        const lastCharacter = this.inputString[inputStringLength-1];

        this.divideString();
        this.resultObject.type = this.checkType(this.inputString);
        this.createObject();

        if (this.errorMode) {
            return this.errorContent;
        }

        return this.resultObject;
    }
}

function run() {

    const errorMode = "string";

    // const stringData = "[123, [22], 33]";
    // const stringData = "[123, [1,2,3,4,5], 33]";
    // const stringData = "[123,[22,23,[11,[112233],112],55],33]";
    // const stringData = "['1a3',[null,false,['11',[112233],112],55, '99'],33, true]";
    const stringData = "['1a'3',[22,23,[11,[112233],112],55],33]";
    // const stringData = "['1a3',[22,23,[11,[112233],112],55],3d3]";

    const arrayParser = new ArrayParser(stringData);
    const result = arrayParser.getResult();
    
    if (typeof(result) === errorMode) {
        console.log(result + "(은/는) 올바른 문자열이 아닙니다");
    } else {
        console.log(JSON.stringify(result, null, 2));
    }    
}

run();