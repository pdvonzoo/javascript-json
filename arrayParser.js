/* 
    2-1. 피드백 반영

    - 루프를 돌면서 같은 일을 하지 않도록 하세요. 
    this.dividedCharacterDatas.length 이값은 계속 똑같은 결과일텐데, forEach돌면서 계속 계산될 듯.

    - count는 무슨 count이죠? 항상 이름에 좀더 신경쓰세요.

    - 다른방법도 한번 알아보세요.
    정규표현식으로도 할 수 있을 듯.

    - 생성자 칭찬받음 헤헤

    - 함수(메서드)는 동사+명사로. .. 하아 이놈의 네이밍
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

    divideString() {
        this.dividedCharacterDatas = this.inputString.split("");
    }

    createObject() {
        let mergeData = "";
        let repeatCount = 1;
        let startParenthesisCount = 0;
        let endParenthesisCount = 0;
        const divisionCharacterDataNumber = this.dividedCharacterDatas.length;
        const onlyNumberRegex = /^[0-9]/;

        this.dividedCharacterDatas.forEach(element => {

            if (element === '[') {
                startParenthesisCount++;
            }

            if (element === ']') {
                endParenthesisCount++;
            }

            if (startParenthesisCount >= 2) {
                mergeData += element;
            } else if (element === ',' || repeatCount === divisionCharacterDataNumber) {

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
            } else if (onlyNumberRegex.test(element) && startParenthesisCount === 1) {
                mergeData += element;   
            }

            if (endParenthesisCount === 1 && repeatCount !== divisionCharacterDataNumber) {
                startParenthesisCount--;
                endParenthesisCount--;

                const secondArrayParser = new ArrayParser(mergeData);
                mergeData = secondArrayParser.getResult();
            }
            repeatCount++;
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

        this.divideString();
        this.resultObject.type = this.checkType(this.inputString);
        this.createObject();

        return this.resultObject;
    }
}

function run() {

    // const stringData = "[123, [22], 33]";
    // const stringData = "[123, [1,2,3,4,5], 33]";
    var stringData = "[123,[22,23,[11,[112233],112],55],33]";

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