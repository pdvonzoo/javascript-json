> ### STEP 1 : Array 데이터 분석

- #### 요구사항

  - ArrayParser함수를 만든다.
  - 배열안에는 숫자데이터만 존재한다.
  - 배열형태의 문자열을 token단위로 해석한 후, 이를 분석한 자료구조를 만든다.
  - 정규표현식 사용은 최소한으로 한다.(token의 타입체크에 한해 사용가능)

  

- #### 실행결과

  ```javascript
  var str = "[123, 22, 33]";
  var result = ArrayParser(str);
  console.log(JSON.stringify(result, null, 2));   //보기좋게 출력할수도 있음.
  ```

  result의 결과는 해당 배열을 분석한 형태이어야 한다. 예를들어 다음과 같은 결과일 수 있다. (꼭 이와 같은 결과일 필요가 없음)

  ```javascript
  { type: 'array',
    child: 
     [ { type: 'number', value: '123', child: [] },
       { type: 'number', value: '22', child: [] },
       { type: 'number', value: '33', child: [] } 
      ] 
  }
  ```

  - #### 참고 - token의 구현

    처음에는, 이런 식으로 동작하는 것부터 구현해보자.

    var str = "[1,2]"; // 문자열 str을 한글자씩 탐색하면서 '[' , ']' 를 출력해보기 (반복문을 사용한다) // 또는 숫자형태의 문자만(1,2) 출력해보기

    이런 과정을 하는 것을 토큰나이저(tokenizer)라고 한다. 하나의 작은 실행단위를 토큰이라고하고, 문자열에서 토큰을 추출해나가는 것이다.



- #### 설계 사항

![](https://imgur.com/UIoBy3m.png)



- #### 함수

  1. **function arrayParser(str)**

     입력 값 : 문자열 (String)

     반환 값 : 정해지진 않았지만, `JSON.stringify` 형태에 맞게끔 출력

     ```javascript
     { type: 'array',
       child: 
        [ { type: 'number', value: '123', child: [] },
          { type: 'number', value: '22', child: [] },
          { type: 'number', value: '33', child: [] } 
         ] 
     }
     ```

     일단은, 전체적으로 생각하기 보다는 (type 에 대한 고려부터 시작하고 있었음, 그러나 4번에 있어서 일단 arrayParser 에 맞게 배열만 생각) form 에 대한 생각부터 수정

​

- #### 구현 사항

  - Javascript 를 구현하면서도 type 에 대한점을 항상 신경쓸 것

    - 배열에 String 넣는 실수를 하면서 느낌 (계속 다른 반환값이 뜨면서도 몰랐음 하하)

  - 정규식이 와닿지 않는다 (하.. 개인적으로 싫은것일까? 별로 쓰고싶지 않다, crong한테 물어봐야겠다)

    - 그래서 숫자를 판별할 때, `parseInt` 메서드를 사용해 `NaN` 이 나오는것으로 판별하였다

    ```javascript
    console.log(parseInt("123")); // 123
    console.log(parseInt("!23")); // NaN
    console.log(parseInt(" 23")); // 23
    ```

  - `foreach` 는 `continue` 가 적용되지 않음