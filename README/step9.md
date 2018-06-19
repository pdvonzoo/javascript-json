> #### STEP 9 : 문서화

- ### ArrayParser

  - #### 개요

    > JavaScript 의 Array 는 다양한 Type을 지원한다.
    >
    > 해당 ArrayParser는 JavaScript의 Array를 분석해서 그 결과를 출력하는 프로그램이다.

  

  - #### 기능

    - **배열(Array) 데이터 분석**
      - 2중 중첩 배열 분석
      - 무한으로 중첩된 배열 분석
    - **타입(Type) 분석**
      - 숫자
      - String
      - Boolean
      - null
    - **오류(Error) 체크**
      - 올바르지 않은 문자열 확인

  

  - #### 클래스 구조도

    ![](https://imgur.com/jeaSfFo.png)

  - #### 결과 검증

    - **"[123, [22], 33]"**

      ```javascript
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
      *-----------------------------------------------*
      타입 갯수를 분석하여 결과를 출력합니다
      array: 2
      string: 0
      null: 0
      boolean: 0
      object: 0
      number: 3
      ```

    - 이외 결과는 이곳을 참조



- ### ArrayParser 핵심 알고리즘

  - Recursion

  - Tokenizer

  - Algorithm

    ![](https://imgur.com/qdATHWe.png)

- ### 테스트코드 작성

  - #### 개요

    - 테스트 함수를 만드는 이유

      ```
      소프트웨어가 업데이트 되면서 각각의 버전이 올라갈 때
      예전에 맞물려있는 기능들이 정상적으로 동작되는지 확인이 필요함
      즉, 테스트가 가능하게 만드는것이 목적임
      ```

    - 테스트가 가능한 부분이 많은것이지, 틀린것이 아님

      ```
      예를들어, CLASS 생성이 잘 되는지 안되는지 (PASS/FAIL)
      15개의 분기문이 있으면 = 15개의 테스트 함수가 동작한다는 말
      그러나 테스트가 가능한 부분이 많은것일뿐, 틀린것이 아님
      ```

    - 메서드마다 중요한 것, 할 수 있는것부터 테스트케이스를 작성하며

    - 최종적으로는 모든 메서드의 테스트케이스를 작성하는 것

    - 자동화 해주는 툴들도 많지만

    - `왜` 필요한 것인지

    - `어떻게` 하는 것인지

    - `기초적인 지식`을 쌓기 위함이 이번 arrayParser #6 임

  

  - #### 목표

    - 테스트 코드를 이해한다.
    - 테스트 코드를 구현하면서 내 코드를 테스트 가능한 상태로 개선한다.

  

  - #### Test Code

    - **expect.js**

      > 테스트를 담당한다

      `expect(answer).toBe(testResult)`

      - 배열 데이터 일 경우

        ```javascript
        checkEqualArray(answer, result) {
            if (!Array.isArray(result)) return false;
            return answer.every((v,i) => v === result[i]);
        }
        ```

        `every 메서드`를 이용하여 2개의 배열요소가 같은지 판단한다.

      - 객체 데이터 일 경우

        ```javascript
        checkEqualObject(answer, result) {
            if (typeof(result) != "object") return false;
            answer = JSON.stringify(answer);
            result = JSON.stringify(result);
            return answer === result;
        }
        ```

        `JSON 형태`로 변환 후, 두개의 문자열이 같은지 판단한다.

      - 이 외의 경우

        `===` 비교연산자를 통해 같은지 판단한다.

      - 같지 않을 경우

        ```javascript
        toBe(result) {
            const answer = this.answer;
        
            if (this.equal(answer, result)) { console.log("OK"); }
            else {
                console.log("FAIL");
                console.log("----------------------");
                console.log("TargetValue is " + answer);
                console.log("ExpectValue is " + result);
                console.log("----------------------");
            }
        }
        ```

        경고문과 함께 `TargetValue` 와 `ExpectValue` 를 console 창에 출력한다

      

    - **test.js**

      > 출력을 담당한다

      ```javascript
      exports.test = function(testMsg, testFunction) {
          process.stdout.write(testMsg + " : ");
          testFunction();
      };
      ```

      자동 줄바꿈을 피하기 위해 `process.stdout.write` 구문을 사용하였다.

      

    - **arrayParser.test.js**

      > 타입을 올바르게 결정하는지 확인한다
      >
      > 타입을 올바르게 분석하는지 확인한다

    - **objectParser.test.js**

      >괄호({ })타입을 올바르게 결정하는지 확인한다

    - **lexer.test.js**

      >각 타입(String, Boolean, Object, Number, Array)에 맞게
      >
      >정상적으로 반환하는지 확인한다

    - **utility.test.js**

      >특정 문자 ({, }, [, ], : 등) 가 있는지 확인하거나
      >
      >특정 문자를 제거하는 기능들이 정상적으로 동작하는지 확인한다.
