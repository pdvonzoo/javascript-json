> #### STEP 7 : 오류상황 탐지

- #### 요구사항

  - 배열이나 객체가 제대로 닫히지 않았는지 체크하는 부분을 추가한다.
  - 객체안에 colon이 누락된 경우가 있는지 체크한다.
  - 그외 엄격한 검사 로직을 1개 추가하고 이를 검증하는 코드를 구현한다.



- #### 실행결과

  ```javascript
  var s = "['1a3',[null,false,['11',112,'99'], {a:'str', b:[912,[5656,33]]}, true]";
  var result = ArrayParser(str);
  //정상출력
  
  var s = "['1a3',[null,false,['11',112,'99' , {a:'str', b:[912,[5656,33]]}, true]";
  var result = ArrayParser(str);
  // 정상적으로 종료되지 않은 배열이 있습니다.
  
  var s = "['1a3',[null,false,['11',112,'99'], {a:'str', b: [912,[5656,33]], true]]";
  var result = ArrayParser(str);
  // 정상적으로 종료되지 않은 객체가 있습니다.
  
  var s = "['1a3',[null,false,['11',112,'99'], {a:'str', b  [912,[5656,33]]}, true]";
  var result = ArrayParser(str);
  // ':'이 누락된 객체표현이 있습니다.
  
  이외 오류상황을 최대한 탐지해서 오류내용과 함께 발생시킨다.
  ```

  

- #### 구현사항

  - print class 를 따로 구성해서, `console.log` 로 찍히는 부분을 따로 뺌

  - 처음 입력받은 전체 `String Data` 의 `괄호 갯수([], {})를 확인`해서 갯수가 맞지 않으면 `process.exit()`

    ```javascript
    const startSquareBracketNum = (param.match(/\[/g) || []).length;
    const endSquareBracktNum = (param.match(/\]/g) || []).length;
    ```

  - Object의 `콜론(:)` 은, 해당 데이터를 현재 코드에 돌려보니, 정상적으로 작동하지만 `key-value` 쌍이 맞지 않게 결과가 출력됨

  - 그래서, 최종 결과를 출력하기 전에, key-value 가 문자열에 포함되어 있는지 확인함

    - `key` - `value`
    - `key2` - `value2`

  - 그 외, 엄격한 로직검사을 1개 추가

    ```javascript
    testCase : "[123, [22],, 33]"
    ```

    현재 나의 코드에서는 결과가 아래와 같이 출력됨

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
          "value": "",
          "child": []
        },
        {
          "type": "Number",
          "value": "33",
          "child": []
        }
      ]
    }
    ```

    중간 부분이 공백으로 처리되지만, `type`은 `Number`로 체크됨

    공백도 하나의 type 으로 지정할까 생각했지만, **공백을 데이터로 판별하는 것은 왠지 맞지않다고 생각됨



- #### 에러사항

  1. 끝나는 `종료조건 (repeatCount === arrayEndPoint)` 조건에 해당되는 바람에 안에 타입들을 분석하지 못함

     테스트케이스 케이스 구문 수정 필요 

     `"['1a3',[null,false,['11',112,'99'], {a:'str', b:[912,[5656,33]]}, true]]"`  =>

     `"['1a3',[null,false,['11',112,'99'], {a:'str', b:[912,[5656,33]]}, true]"` 



- #### 질문사항

  1. Print 클래스를 만들었을 경우, 함수 네이밍을 어떻게 해야하나요?

     ```javascript
     비정상적인 배열에 대한 에러를 출력하려고 하는 함수를 만드려고 합니다.
     print.printErrorAbnormalArray() ?
     print.ErrorAbnormalArray() ?
     ```

     이럴때는, `printUtil` 이나 `printManager` 와 같이 클래스명을 바꾸고 함수는 항상 `동사+명사`로 네이밍하면 된다.



- #### 피드백

  - 인자로 넘길 때, 객체로 넘긴 후 KEY 값으로 표현 (나중에 써보자)

  ---

  - `require` 와 `모듈 의존성`에 대해서 간단히라도 역사(history)를 살펴보면 좋을 거 같아요.
  - [[javascript] require vs import (CommonJs와 ES6)](https://blueshw.github.io/2017/05/16/ES-require-vs-import/)
    - 기존의 자바스크립트(ES5, 현재 대부분의 브라우저에서 지원하는 자바스크립트 문법)는 모듈이라는 개념이 부족하여 각 모듈(또는 파일)간의 의존성 처리에 제한
    - 고전적인 웹 프로젝트에서 자바스크립트를 사용하는 방법을 살펴보면, HTML 파일내부에 `<script>` 태그를 삽입하여 모듈을 로드
    - 그러나 문제는 자바스크립트 파일(또는 모듈)끼리 서로 모듈을 공유하는데 제약이 없다는 점
    - 그 이유는 script 태그로 로드된 모듈은 모두 window 객체의 속성이기 때문에 서로 다른 파일에 위치하면서도 모든 객체를 공유할 수 있기 때문
    - 각 자바스크립트 파일이 독립적으로 존재하지 못해 발생하는 여러 문제들`(예를들어 다른 파일에서 같은 이름의 변수를 사용하는 경우)`  때문에 하나의 모듈로 관리하기위한 다양한 패턴(모듈패턴, 즉시실행함수 등)을 사용하여 의존성을 관리할 수 밖에 없었습니다.
    - 이를 해결하기 위한 수단으로 모듈이라는 개념을 도입하여 정의한 방법(또는 표준)이 CommonJs와 AMD입니다. 이 둘은  내부적으로 모듈 서로 간의 의존성(로드)이 지원되지 않는 상태로 만들어졌는데, ES6에 이르러 언어 내부적으로 자바스크립트 모듈  의존성을 지원하게 되었습니다(import, export).
  - [자바스크립트 모듈, 모듈 포맷, 모듈 로더와 모듈 번들러에 대한 10분 입문서](https://github.com/codepink/codepink.github.com/wiki/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EB%AA%A8%EB%93%88,-%EB%AA%A8%EB%93%88-%ED%8F%AC%EB%A7%B7,-%EB%AA%A8%EB%93%88-%EB%A1%9C%EB%8D%94%EC%99%80-%EB%AA%A8%EB%93%88-%EB%B2%88%EB%93%A4%EB%9F%AC%EC%97%90-%EB%8C%80%ED%95%9C-10%EB%B6%84-%EC%9E%85%EB%AC%B8%EC%84%9C)
    - EcmaScript5 및 이전 버전은 모듈을 염두해두고 디자인되지 않음
    - 시간이 지나면서 개발자들은 자바스크립트의 모듈화 디자인을 시뮬레이션하기 위해 다양한 패턴을 고안
      - 즉시 실행 함수 표현식(IIFE, Immediately Invoked Function Expressions)
      - 노출식 모듈(Revealing Module)
    - 모던 자바스크립트 개발 환경에서 툴링을 잘 이해하기 위해서는 모듈, 모듈 포맷, 모듈 로더와 모듈 번들러 사이의 차이를 이해하는 것이 중요하다.
  - [의존성 관리](https://github.com/nhnent/fe.javascript/wiki/%EC%9D%98%EC%A1%B4%EC%84%B1-%EA%B4%80%EB%A6%AC#%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EC%9D%98-%EC%9D%98%EC%A1%B4%EC%84%B1-%EA%B4%80%EB%A6%AC)
  - [타입스크립트의 네임스페이스와 모듈](https://github.com/codepink/codepink.github.com/wiki/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EB%AA%A8%EB%93%88,-%EB%AA%A8%EB%93%88-%ED%8F%AC%EB%A7%B7,-%EB%AA%A8%EB%93%88-%EB%A1%9C%EB%8D%94%EC%99%80-%EB%AA%A8%EB%93%88-%EB%B2%88%EB%93%A4%EB%9F%AC%EC%97%90-%EB%8C%80%ED%95%9C-10%EB%B6%84-%EC%9E%85%EB%AC%B8%EC%84%9C)

  ---

  - 정규표현식 정리

  ```javascript
  +exports.checkCorrectColon = (param) => {
  +    const toJsonStringData = JSON.stringify(param, null, 2)
  +    const inclusionKEY = toJsonStringData.includes("key");
  +    const inclusionKEY2 = toJsonStringData.includes("key2");
  ```

  - checkCorrectColon (param)
    1. 전부 출력된 결과를 `JSON 형태`로 만든다
    2. `"key"` 라는 문자열이 있는지 확인한다
    3. `"key"` 라는 문자열이 있으면 `"value"` 라는 문자열이 있는지 확인한다
    4. 반대로, `"value"` 라는 문자열이 있는데 `"key"` 라는 문자열이 있는지 확인한다
       - Object 의 경우 `key-value 쌍`으로 결과가 출력되기 때문
    5. `"key2"` 라는 문자열이 있는지 확인한다
    6. `"key2"` 라는 문자열이 있으면 `"value2"` 라는 문자열이 있는지 확인한다.
    7. 반대로, `"value2"` 라는 문자열이 있는데 `"key2"` 라는 문자열이 있는지 확인한다
    8. 없다면 `:` 문자가 빠졌으므로 에러를 출력한다
  - 정규 표현식을 적용하면
    - "key", "value", "key2", "value2" 의 문자열이 있는지 `동시에` 확인한다.
    - 그러므로 모든 조건에 대해서 `false` 를 내뿜음
    - 일단 `Object` 라는 문자열이 있는지 부터 확인해야함