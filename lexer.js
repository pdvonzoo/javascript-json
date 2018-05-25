/*
    Lexer JS
*/

class lexer {
    constructor(stringData) {

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

}

exports.lexer = new lexer();