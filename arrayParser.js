/* 
    1차 피드백
    todo의 리뷰를 보면서, 그 렉쳐의 코드를 class로 잘 정리해두시고요.
    그 다음에 여기까지의 array parser 코드를 class로 수정하고 더 진행해보시죠.

    todo의 리뷰를 보면서, 그 렉쳐의 코드를 class로 잘 정리하고나서 여기 렉처를 이어나가세요.
    todo렉처가 정리되면, 여기 array parser 코드를 class로 수정하고 더 진행해보시죠.
    arrayParser 함수는 좀 하위함수로 나누면서 하면 좋겠고요.

    class arrayParser
    1. spliter
    2. checkType 
*/

class ArrayParser {
    
    constructor(stringData) {
        this.resultObject = {
            type: null,
            child: [],
        }
        this.dividedCharacterDatas = [];
        this.inputString = stringData;
    }

    spliter() {
        this.dividedCharacterDatas = this.inputString.split("");
    }

    merger() {
        let mergeData = "";
        let count = 1;

        this.dividedCharacterDatas.forEach(element => {
            if (element === ',' || count === this.dividedCharacterDatas.length) {
                const dataObject = {
                    type: this.checkType(mergeData),
                    value: mergeData,
                    child: []
                };
    
                this.resultObject.child.push(dataObject);
                mergeData = "";
            } else if (element >= '0' && element <= '9') {
                mergeData += element;   
            }
            count++;
        });
    }

    checkType(params) {

        if (params.includes("[") && params.includes("]")) {
            return 'array';
        }
    
        if (parseInt(params) !== NaN) {
            return 'number';
        }
    }

    getResult() {
        const inputStringLength = this.inputString.length;
        const firstCharacter = this.inputString[0];
        const lastCharacter = this.inputString[inputStringLength-1];

        this.spliter();
        this.resultObject.type = this.checkType(this.inputString);
        this.merger();

        return this.resultObject;
    }
}

function run() {

    const stringData = "[123, 22, 33]";

    const arrayParser = new ArrayParser(stringData);
    const result = arrayParser.getResult();

    console.log(JSON.stringify(result, null, 2));
}

run();