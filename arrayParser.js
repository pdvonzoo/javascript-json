/* 
    2. 2중 중첩배열 분석

    배열안에 배열이 있는 경우도 분석한다.
    중첩된 배열 원소도 역시, 숫자데이터만 존재한다.
    중첩된 결과는 child 부분에 추가해서 결과가 표현돼야 한다.
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

    // 하..
    // merger 에 대한 구현이 예전에 개인적으로 계산기를 구현하는 것 처럼
    // 자꾸 추가하는 식으로 된다고 해야될까요
    // 그러니까 조건을 납땜(?) 하는 기분이 들어요
    // 어쩔 수 없는 것인가요.. 욕심이 나는데, 완벽히 구현하기가 어렵네요..
    // 코드가 개인적으로 굉장히 지저분한듯한 느낌이 들어요 ㅠㅠ
    merger() {
        let mergeData = "";
        let count = 1;
        let startParenthesisCount = 0;
        let endParenthesisCount = 0;

        this.dividedCharacterDatas.forEach(element => {

            if (element === '[') {
                startParenthesisCount++;
            }

            if (element === ']') {
                endParenthesisCount++;
            }

            if (startParenthesisCount >= 2) {
                mergeData += element;
            } else if (element === ',' || count === this.dividedCharacterDatas.length) {

                // Depth가 3이상이 되어버려서 계속 걸립니다..
                // 어떻게 고칠까 생각중입니다 ㅠㅠ
                if (mergeData.constructor === Object) {
                    this.resultObject.child.push(mergeData);
                    mergeData = "";
                } else {
                    const dataObject = {
                        type: this.checkType(mergeData),
                        value: mergeData,
                        child: []
                    };

                    this.resultObject.child.push(dataObject);
                    mergeData = "";
                }
            } else if (element >= '0' && element <= '9' && startParenthesisCount === 1) {
                mergeData += element;   
            }

            if (endParenthesisCount === 1 && count !== this.dividedCharacterDatas.length) {
                startParenthesisCount--;
                endParenthesisCount--;

                const secondArrayParser = new ArrayParser(mergeData);
                mergeData = secondArrayParser.getResult();
            }
            count++;
        });
    }

    checkType(params) {

        if (params.constructor === Object) {
            return 'Object';
        }

        if (params.includes("[") && params.includes("]")) {
            return 'Array';
        }
    
        if (parseInt(params) !== NaN) {
            return 'Number';
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

    // const stringData = "[123, [22], 33]";
    const stringData = "[123, [1,2,3,4,5], 33]";

    const arrayParser = new ArrayParser(stringData);
    const result = arrayParser.getResult();

    console.log(JSON.stringify(result, null, 2));
}

run();

/*
TestCase : [123, [22], 33]
Output :

{
  "type": "Array",
  "child": [
    {
      "type": "Number",
      "value": "123",
      "child": []
    },
    {
      "type": "Array",
      "child": [
        {
          "type": "Number",
          "value": "22",
          "child": []
        }
      ]
    },
    {
      "type": "Number",
      "value": "33",
      "child": []
    }
  ]
}

*/

/*
TestCase : [123, [1,2,3,4,5], 33]
Output :

{
  "type": "Array",
  "child": [
    {
      "type": "Number",
      "value": "123",
      "child": []
    },
    {
      "type": "Array",
      "child": [
        {
          "type": "Number",
          "value": "1",
          "child": []
        },
        {
          "type": "Number",
          "value": "2",
          "child": []
        },
        {
          "type": "Number",
          "value": "3",
          "child": []
        },
        {
          "type": "Number",
          "value": "4",
          "child": []
        },
        {
          "type": "Number",
          "value": "5",
          "child": []
        }
      ]
    },
    {
      "type": "Number",
      "value": "33",
      "child": []
    }
  ]
}
*/