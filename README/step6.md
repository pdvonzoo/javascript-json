> ### STEP 6 : 테스트 코드 작성

- #### 목표

  - 테스트 코드를 이해한다.
  - 테스트 코드를 구현하면서 내 코드를 테스트 가능한 상태로 개선한다.



- #### 이번 레슨에서 하는 일

  - 지금까지 구현한 코드를 테스트해본다.
  - 테스트환경을 제공하는 좋은 라이브러리가 있다. 하지만 이번레슨에서 직접 간단한 테스트를 해주는 함수를 만들어본다.
  - 테스트코드를 구현하면서, 테스트가 잘 되도록 원래의 코드를 수정해나가는 것이 정상적이며, 이상적이다.



- #### 내 코드를 (간단히) 테스트하는 방법

  내가 구현한 코드의 함수를 테스트 한다. 간단히 함수를 실행시키는 코드를 구현하면 된다. 예를들어, sum함수를 구현했다고 가정하면, 아래처럼 테스트 할 수 있다.

  ```javascript
  //함수
  const sum = (a,b) => a+b;
  test("sum을 테스트해보죠", function() {
    equal(sum(1,2), 3); //true이면 성공이다. false이면 실패.
  });
  ```



- #### 요구사항

  - 아래처럼 테스트 가능한**test함수**와 **expect.toBe**메서드를 만든다.

  - test함수와 expect객체 그리고 toBe메서드는 별도의 자바스크립트 파일로 만들고, 이를 export/require를 통해서 nodeJS환경에서 테스트 할 수 있어야 한다.

  - **내가 구현한 코드 (a.js)**

    ````javascript
      export.sum function(a, b) {
          if(b < 0) b = 0;
        return a + b;
     }
    ````

  - **테스트를 하기 위한 테스트 코드 (a.test.js)**

    ```javascript
      const {sum} = require('./sum');
    
      test("두 개의 서로다른 양의 정수의 합이 올바르게 나온다", function() {
         //값을 설정하고,
             a = 10; b = 20;
    
             //sum을 실행하면,
             const result = sum(a, b);
    
             //그때 그 결과는 아래처럼.
         expect(30).toBe(result);
     });
    
       test("양의 정수와 음의 정수의 합이 올바르게 나온다", function() {
         //값을 설정하고,
             a = 10; b = -10;
    
             //sum을 실행하면,
             const result = sum(a, b);
    
             //그때 그 결과는 아래처럼.
         expect(0).toBe(result);
     });
    ```



- #### 구현사항

  http://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-standard-tokenizer.html

  위 링크가 무슨 말인지 이해가 잘 안된다

  일단은 Tokenizer 가 무엇인지, 무엇을 하는것인지도 아직 이해하지 못한 상태

  text가 구분자 (`" "`) 에 의해서 하나씩 짤려나오는 상태 ?

  **@crong "단위가 저런거구나"**

  **@crong "저런식으로 Tokenizer 를 통해 토큰묶음을 만들 수 있다"**

  

  https://blog.naver.com/echris7/140012828393

  ```javascript
  import java.util.StringTokenizer;
  
  public class NumberForm {
      public static void main(String[] args) {
          String token = new String("스트링을 구분자를 사용하여 구분하기");
          StringTokenizer tokenizer = new StringTokenizer(token, " "); // 구분자 공백(" ")
            
          System.out.println("Total Token Count :  "+ tokenizer.countTokens());
          while(tokenizer.hasMoreTokens()){
              System.out.println("Token is : "+ tokenizer.nextToken());
           }
      }
  }
  ```

  `토큰` 의미를 갖는 최소한의 문자열

  `String Tokenizer` 는 String에서 구분자를 사용해 토큰을 얻어올 수 있다

  출력결과

  ---

  Total Token Count :  4

  Token is : 스트링을 

  Token is : 구분자를

  Token is : 사용하여 

  Token is : 구분하기

  ---

  그러면 일단 `Tokenizer` 은 알겠다.

  **@crong "`Tokenizer` 을 통해 `토큰묶음`을 만들 수 있죠"**

  토큰묶음?

  https://ariya.io/2011/08/math-evaluator-in-javascript-part1

  Math Evaluator in JavaScript: Part 1 (the Tokenizer)

  ```javascript
  // 도우미 함수들
  function isWhiteSpace(ch) {
      return (ch === 'u0009') || (ch === ' ') || (ch === 'u00A0');
  }
   
  function isLetter(ch) {
      return (ch >= 'a' && ch < = 'z') || (ch >= 'A' && ch < = 'Z');
  }
   
  function isDecimalDigit(ch) {
      return (ch >= '0') && (ch < = '9');
  }
  ```

  ```javascript
  // 유용한 보조함수
  function createToken(type, value) {
      return {
          type: type,
          value: value
      };
  }
  ```

  후반에 반복되는것을 피하기 위한 `createToken` 함수를 통해서 기본적인 `Token 객체` (type-value) 를 생성

  일단 여기까지..

  ---

  `토큰` = `문자 하나`

  ​	OK

  `토큰`이라는 단위를 `어떤 기준`으로 `자르는 것`도 가능

  ​	`어떤 기준` 구분자 ("", " " 등) 를 뜻하는 것 같다

  `하나의 의미있는 토큰`으로 다 `분리`하고 이를 `분석`해보는 것은 어떨까?

  ​	현재 나의 코드방식은 `split` 함수에 `구분자("")` 를 넣어서 한 문자씩 분리한다

  ​	이후 특정 문자 ([ ] { } ,) 에 따라서 분석한다

  ​	그 중에 재귀로 구성되어 있는 점

  ​	다른 방식이 있을까?

  `더 많은 함수`로 활용을 적극적으로 = `더 작은 단위`로

  ​	예를들어, if문의 하위내용을 모두 함수로 분리

  ​	되도록이면 createObject와 createCurlyObject에서 동시에 사용할 수 있는 메서드로 분리하고 싶은데

  ​	같은 조건이여도 두개의 수행내용이 달라서 (즉, 중복이 아닌 중복느낌) 찝찝한 기분을 지울수가 없다

  ---

  ```javascript
  /*
  	간단하게, continue 조건 (즉, 따로 수행되는 구문없이 바로 return 되는) 을 함수로 만들어서 처리
  	했을 때 createObject메서드와 createCurlyObject메서드에서 서로 다르게 동작하는 점을 처리할
  	수 없다
  */
  continueCase(param) {
      if (param === ' ') { return true; }
      if (param === '{') { return true; }
      return false;
  }
  ```

  일단은 메서드 내에서 변수를 조작 (++) 시키거나, 간단한것들을 제외한 나머지를 메서드로 구성시켜보자

   ```javascript
  // foreach 반복문 중 '{' 가 감지되었을 경우, curlyBracketsMode 를 작동시킨다
  if (curlyBracketsMode) {
    mergeData += element;
    /*
    	일단 괄호의 갯수가 같다는 것은 재귀케이스
    	하지만 메서드 내의 변수라서.. 메서드로 따로 구분할 필요는 없을 듯 함
    */
    if (startCurlyBracketsCount === endCurlyBracketsCount) {
        curlyBracketsMode = false;
  
        /*
        	@INPUT : mergeData
        	@OUTPUT : mergeData ( from .getResult() )
        */
        const secondArrayParser = new ArrayParser(mergeData);
        mergeData = secondArrayParser.getResult();
    }
    return;
  }
   ```

  if 안에 내용들을 하나씩 메서드로 만들고 싶은데 네이밍이 애매한 것 같음

  

- #### 테스트코드 작성

  - 테스트 코드를 이해한다	

    - https://item4.github.io/2016-03-19/Coding-with-Test-Code/

    - https://nesoy.github.io/articles/2017-01/TDD

    - http://huns.me/development/716

    - `테스트 주도 개발방법론` `TDD(Test-Driven Development)`

      ```
      정확한 프로그래밍 목적을 디자인 단계에서 반드시 미리 정의해야만 하고 또 무엇을 미리 정의해야한다.
      ```

      - `RED` 실패하는 테스트를 만들기
      - `GREEN` 테스트에 통과할 만한 작은 코드를 작성하기
      - `REFACTOR` 반복되는 코드, 긴 메소드, 큰 클래스, 긴 매개변수 목록 등등 코드를 좀 더 효율적으로 바꾸기
      - 문제를 먼저 정의하고, 문제의 해답을 찾아가는 과정
      - 내가 지금 만들어야 할 것이 무엇인지 우선적으로 명확하게 정의
      - 그 내용을 테스트로 표현하는 것이 TDD의 근본 취지
      - 테스트 코드도 사람이 작성하는 것이기 때문에 실수할 가능성이 존재함
      - 아주 단순한 기능을 만들어서 에러가 없음을 검증 후 조금씩 살을 붙여나가는 것이 TDD의 기본
      - 에러를 제거하는 코드를 최대한 빨리 단순하게 작성할 것을 강조

  - 테스트 코드를 구현하면서 내 코드를 테스트 가능한 상태로 개선한다

    ```javascript
    const sum = (a,b) => a+b;
    test("sum을 테스트해보죠", function() {
      equal(sum(1,2), 3); //true이면 성공이다. false이면 실`패.
    });
    ```

    ```javascript
    // a.js
    export.sum function(a,b) {
        if(b < 0) b = 0;
        return a + b;
    }
    ```

    ```javascript
    // a.test.js  
    const {sum} = require('./sum');
    
    test("두 개의 서로다른 양의 정수의 합이 올바르게 나온다", function() {
        //값을 설정하고,
        a = 10; b = 20;
    
        //sum을 실행하면,
        const result = sum(a+b);
    
        //그때 그 결과는 아래처럼.
        expect(30).toBe(result);
    });
    
    test("양의 정수와 음의 정수의 합이 올바르게 나온다", function() {
        //값을 설정하고,
        a = 10; b = -10;
    
        //sum을 실행하면,
        const result = sum(a+b);
    
        //그때 그 결과는 아래처럼.
        expect(0).toBe(result);
    });
    ```

    ```javascript
    // 결과
    두 개의 서로다른 양의 정수의 합이 올바르게 나온다  : OK
    양의 정수와 음의 정수의 합이 올바르게 나온다 : FAIL (targetValue is 10, expectValue is 0)
    ```

    - 아직 우리는 좋은 라이브러리를 쓰면서 다양한 테스트코드 구현을 하지 않고 있다.
    - 관심있다면 미리 mocha, jest와 같은 도구를 학습하는 것도 좋다.
    - given,when,then은 무엇이지`?`
      - `given` 어떤 상황이 들어간다
      - `when` 어떻게 동작한다
      - `then` 동작한 결과가 어떠해야 한다
      - `given-when-then` 패턴은 필수적으로 사용해야 하는것은 아님
    - unit test에 대해서 학습해본다.
    - TDD는 무엇인가?

  - 내 코드 메서드 구분

    - divideString
    - recursionCase(mergeData) 
    - createObject()
    - createCurlyObject()
    - setObjectData(mode, inputData)
    - typeDecision(inputData)
    - checkCorrectString(inputData)
    - removeSpace(inputData)
    - removeFirstParenthesis(inputData)
    - checkType(params)
    - getResult()

  - 다시 클래스 분할부터

    - main.js

    - lexer.js

      `어휘 분석기(Lexer)는 프로그램을 읽어 토큰(문장 자체를 문장을 이루고 있는 단어 단위로 쪼갠 것)을 생성하는 역할`

    - tokenizer.js

      `[컴퓨터 공학] 낱말 분석`

    - arrayParser.js

    - utility.js

  - test 메서드

  - expect 객체

  - toBe 메서드

  - [Module export import](http://hochulshin.com/javascript-module-export-import/)

    ```javascript
    //math.js
    exports.plus = function(a, b) {
      return a + b;
    };
       
    exports.multiply = function(a, b) {
      return a * b;
    };
    ```

    ```javascript
    //test.js
    var math = require("./math.js");
    console.log(math.plus(1, 2)); //3
    console.log(math.multiply(1, 2)); //2
    ```

  - require with class constructor](https://stackoverflow.com/questions/42553700/node-js-require-class-with-constructor-parameter)

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

  - 메서드마다 중요한 것, 할 수 있는것부터 테스트케이스를 작성하며, 최종적으로는 모든 메서드의 테스트케이스를 작성하는 것

  - 자동화 해주는 툴들도 많지만, 왜 필요한 것인지, 어떻게 하는 것인지에 대한 기초적인 지식을 쌓기 위함이 이번 arrayParser #6 임



- #### 디버깅

  1. main.js 에서 코드실행
  2. `const arrayParserClass = require('./arrayParser');`
  3. `const arrayParser = new arrayParserClass(testCase1);`
     1. arrayParser.js 로 이동해서 constructor 수행함 (arrayParser.js:11 ~)
     2. 이때의 testCase1 은 `"[123, [22], 33]"`
  4. `const result = arrayParser.getResult();`
     1. `this.dividedCharacterDatas = util.divideString(this.inputString);`
        - 결과 값 : `"[123, [22], 33]"`
     2. `this.resultObject.type = lexer.checkType(this.inputString);`
        - 결과 값 : `"Array"`
     3. `this.resultObject = tokenizer.createObject(this.dividedCharacterDatas, this.resultObject);`
        1. **해당 부분에서 데이터를 한글자씩 판별하며 합침 ("[123,")**
        2. `forEach.call` 에 의해 동작 (tokenizer.js:100)
        3. "123" 에 대한 객체가 잘 만들어지는것을 확인 함
        4. 그리고 this.resultObject.child 에 정상적으로 push 함
        5. mergeData = "" (init) (tokenizer.js:60)
        6. **이제 다시 데이터를 한글자씩 판별하며 합침 ("[22]")**
        7. `]` 문자일 때, `case this.closedInnerSquareBracket():` 에 해당함
        8. 근데 갑자기, `this.mergeData` 가 `undefined` ???
           - 확인해보니 `tokenizer.js:120` 구문에서, `this.mergeData` 가 `undefined` 가 됨
           - 왜냐하면, `case this.closedInnerSquareBracket():` 은
           - `this.closedInnerSquareBracket = function(element)`
           - element 를 파라미터로 받기 때문인데, 넘겨주는게 없으니
           - `this.mergeData = element;` 에서 `this.mergeData` 가 `undefined` 가 되는 것임
           - 이걸 빠트리다니 하...
        9. 그래서 일단 `this.mergeData` 는 정상적으로 출력되는것이 확인됨
        10. 이후 `const recursionArrayParser = new secondArrayParser(this.mergeData);` 에서.. 바로 `loader.js` 로 이동해 `tryModuleLoad` 에서 finally - if(threw) 에 걸림 = 강제종료



- #### 클래스를 합치고 나서 TESTCASE 7 작동

  - testCase가 구문 체크의 오류인지, 이상한 분기문으로 빠져 정상작동이 안됨

  - DEBUG DATA : `"{easy:['hello',{a:'a'},'world']"`

  - 일단은 `{` 문자가 나오고 나서, `[]` 구문이 먼저 처리되는 듯 함

  - 로직이 현재 헷갈려서 전 코드를 봐야겠음

  - `"{easy:['hello',{"` 일 때, `curlyBracketMode`가 `false` 가 됨

  - `"['11',[112233],{easy:['hello',{a:'a'},'world']},112]"`

    - this.startSquareBracketsCount : 2
    - this.endSquareBracketsCount : 1
    - 즉, `[` 가 2개, `]` 가 1개 있다는 뜻
    - 그래서 어느 조건에 걸리냐면
    - `closedInnerSquareBracket` 에 걸림
    - 그럼 어떻게 되냐면, 현재의 `this.mergeData` 를 가지고 `new ArrayParser(this.mergeData)` 를 수행하게됨
    - 원래 코드에서는 `endSquareBracketsCount`가 `0` 이기 때문에 안걸렸는데
    - 여기에서는 1 이기 때문에 걸린것
    - 왜 2, 1이 나왔냐면, `object` 를 할 때, `[]` 문자에 의해서 증가가 되는 것임

    ```javascript
    "type": "Object",
    "key": "a",
    "value": "'str'",
    "key2": ",b",
    ```

    - key2 에서 , 가 걸러지지 않고 b가 바로 출력됨

  

- #### 테스트코드 작성 (STEP6) 에 대한 피드백

  ```javascript
  arrayParser 클래스 역할이 좀 커졌네요. 메서드도 많아서 수정하고 스스로 디버깅하기 어렵진 않나요?
  분리하는게 답은 아니지만, 스스로 해결하기 어렵다면 이 큰 덩어리를 나누는 방법은 무엇인지 생각해보세요~
  ```

  - [JavaScript 객체지향](https://github.com/FEDevelopers/tech.description/wiki/%5BES6%5D%EA%B0%9D%EC%B2%B4%EC%A7%80%ED%96%A5-Javascript---Class)
  - [JavaScript Class 정의](http://steadypost.net/post/lecture/id/13/)
  - 상속
  - arrayParser 안에 `{}` 를 쪼개는 `createCurlyObject` 메서드가 `createObject` 메서드와 비슷하다
  - 따로 클래스로 빼면 어떨까?

  ```javascript
  지금처럼 new Lexer로 할수도 있지만,
  module.exports = Lexer; 로 클래스 자체를 반환하는 게 좀더 일반적이긴 합니다.
  ```

  - module.exports = Lexer;` 로 수정한 후, `lexer.checkType` 메서드를 호출할 때 **에러가 발생**한다
  - `lexer.checkType is not a function at ArrayParser.getResult`
  - `const {lexer} = require('./lexer');` 하면 에러 내용이 달라진다
  - `Cannot read property 'checkType' of undefined at ArrayParser.getResult` 
  - 아직 import 할 때, `{}` 차이를 잘 모르겠다
  - ES6의 export와 import를 사용하기 위해서 Babel 
  - [이건 나중에 참고할 글](https://github.com/codepink/codepink.github.com/wiki/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EB%AA%A8%EB%93%88,-%EB%AA%A8%EB%93%88-%ED%8F%AC%EB%A7%B7,-%EB%AA%A8%EB%93%88-%EB%A1%9C%EB%8D%94%EC%99%80-%EB%AA%A8%EB%93%88-%EB%B2%88%EB%93%A4%EB%9F%AC%EC%97%90-%EB%8C%80%ED%95%9C-10%EB%B6%84-%EC%9E%85%EB%AC%B8%EC%84%9C)

  ---

  - ObjectParser 을 구성하였다.
  - 그런데, 결국은 상호참조가 되어버림.
  - 어떻게 다시 돌리기 힘들어서, import export 를 많이 검색함
  - ES6의 코드가 안돌아감 `대체 왜?`
  - 그래서 npm 중 Babel module 을 설치해서 돌려봄 = `안됨`
  - 결국은 함수를 통해서 생성해서 반환시켜줌 (__)
  - arrayParser 에서 objectParser 을 분리하다가, 계속 넘겨준 데이터가 초기화되는 버그가 발생
  - 원인은 생성자에서 this.mergeData = data 로 받고 맨 뒤에 this.mergeData = "" 하는 어이없는 실수를 발생

  ---

  - 원인이 무엇인지 모르겠는데, module.exports = Lexer; 로 클래스를 바로 넘겨버리면
  - 다른쪽에서 lexer.js의 메서드들을 사용할 수가 없는 문제가 발생
  - 생성자에서 `this.Lexer = new Lexer();` 을 통해서 생성했음에도 메서드에 접근이 안됨
  - 일단은 `const lexer = new Lexer();` 전역변수를 통해서 해결



- #### 질문사항

  비슷한 두개의 함수의 관계를 통합해서 해볼 수 있는 방법은 없을까?

  [현재 나의 코드에서 `createObject Method` 와 `createCurlyObject Method`]
