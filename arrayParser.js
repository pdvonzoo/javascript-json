/* 
    3. 무한으로 중첩된 배열구조 분석

    무한중첩 구조도 동작하게 한다. [[[[[]]]]]
    배열의 원소에는 숫자타입만 존재한다.
    복잡한 세부로직은 함수로 분리해본다.
    중복된 코드역시 함수로 분리해서 일반화한다.
    프로그래밍 설계를 같이 PR한다.
    hint : 중첩문제를 풀기 위해 stack구조를 활용해서 구현할 수도 있다.

    Class ArrayParser
      0. constructor
      0-1. resultObject : 결과값을 반환하기 위한 객체입니다.
      0-2. dividedCharacterDatas[] : string 데이터를 한글자씩 분리하여 담는 배열입니다.
      1. function divideString() : 파라미터로 들어오는 string 데이터를 한글자씩 분리합니다.
      2. function createObject() : 객체를 만드는 메서드입니다.
      3. function checkType(params) : 객체 중 Type 속성을 결정합니다.
      4. function getResult() : 결과 객체를 반환합니다.

    접근법
      Stack을 이용할까 생각했지만, 기존의 함수를 재사용하는 재귀방식으로 접근했습니다.
      테스트 케이스로 예를 들어보겠습니다.
      [123, [22, 23, [11, [112233], 112], 55], 33]
      '두번째 괄호'를 만날 때 마다 데이터를 아래와 같이 새로 찢습니다.
      [22, 23, [11, [112233], 112], 55]
      똑같이 찢습니다.
      [11, [112233], 112]
      또 똑같이 찢습니다.
      [112233]

      각 데이터를 새로 생성한 ArrayParser Class 에 파라미터로 넘깁니다.

      여기서부터 똑같은 함수(createObject)가 재활용되며
      최종적으로 만들어진 객체는 resultObject 로 반환됩니다.
      반환된 Object 는 해당 Class 의 resultObject(결과 Object) 에 추가되며
      역시 똑같이 계속 반환되며, 최종적으로 한개의 Object로 만들어집니다.

    테스트 결과
      TestCase : "[123,[22,23,[11,[112233],112],55],33]"

      Output:
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
              },
              {
              "type": "Number",
              "value": "23",
              "child": []
              },
              {
              "type": "Array",
              "child": [
                  {
                  "type": "Number",
                  "value": "11",
                  "child": []
                  },
                  {
                  "type": "Array",
                  "child": [
                      {
                      "type": "Number",
                      "value": "112233",
                      "child": []
                      }
                  ]
                  },
                  {
                  "type": "Number",
                  "value": "112",
                  "child": []
                  }
              ]
              },
              {
              "type": "Number",
              "value": "55",
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
        let recursionMode = false;
        const divisionCharacterDataNumber = this.dividedCharacterDatas.length;
        const onlyNumberRegex = /^[0-9]/;

        this.dividedCharacterDatas.forEach(element => {

            if (element === '[') {
                startParenthesisCount++;
            }

            if (element === ']') {
                if (startParenthesisCount >= 3) {
                    startParenthesisCount--;
                } else {
                    endParenthesisCount++;
                }
            }

            if (startParenthesisCount >= 2 && !recursionMode) {
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
            } else if (onlyNumberRegex.test(element) && startParenthesisCount >= 1) {
                mergeData += element;   
            }

            if (mergeData === "" || 
                repeatCount === divisionCharacterDataNumber) {

            } else if (endParenthesisCount >= 1 && endParenthesisCount === startParenthesisCount-1) {
                startParenthesisCount--;
                endParenthesisCount--;
                recursionMode = true;

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