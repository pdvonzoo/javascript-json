> ### 기술적인 부분을 정리합니다



- ### 정규표현식

  - `gist` [regex.js](https://gist.github.com/antaehyeon/d80d4b90225ce86c269f26bc1c65cc97)

  - 문자열 조작과 정규표현식 (코드스쿼드 강의)

    - 코드의 양을 획기적으로 줄일 수 있다

    - 실무에서의 사용은?

    - 회원가입 (이메일, 주소, 전화번호 등) 에서의 규칙 검증

    - Textarea 에 입력된 것 중 불필요한 입력값 추출

    - 트랜스파일링

      - 최근의 자바스크립트 개발이 6,7,8 로 나아가지만
      - 현재의 브라우저에 바로 적용되지 않기 때문에
      - 실제 브라우저에 동작할 수 있게끔 소스코드를 변환하는
      - 이것 역시 `문자열 조작`이므로 정규표현식이 사용될 수 있음

    - `"1".match(/1/);`

    - `"a52b".match(/52/);`

      - 52 의 index 를 알아낼 수 있음

    - 문자열안에 있는 모든 두자리 숫자를 찾고 싶다

      - `"a99b".match(/\d\d/);`

      ```javascript
      var target = "abc32zzz";
      var r = /\d\d/;
      var result = target.match(r);
      result && result[0]; // "32"
      ```

    - [JavaScript Regex Cheatsheet](https://www.debuggex.com/cheatsheet/regex/javascript)

    - 한장에 요약되어 있는 Regex가 많으니, 잘 찾아서 출력해서 보면 개발할 때 편함 `cheatSheet`

      ```javascript
      "123-123".match(/\d\d\d-\d\d\d/)[0];
      /* 중복을 제거하자 */
      "113-123".match(/\d{3}-\d{3}/)[0];
      /* 우편번호는 5자리로 바뀌었다던데 */
      "19323".match(/\d{5}/)[0];
      /* 잠깐 OR 연산자좀 .. */
      "a".match(/(a|b)/)[0];
      "c".match(/(a|b)/)[0]; // null
      /* 본격적으로 OR 연산자를 통해서 우편번호를 */
      "123-323".match(/(\d{3}-\d{3}|\d{5})/)[0];
      "52423".match(/(\d{3}-\d{3}|\d{5})/)[0]; // 하위표현식 Sub Expression
      /* 우편번호 시작이 '9'로 이뤄지지 않도록 */
      "12323".match(/(\d{3}-\d{3}|[^9]\d{4})/)[0];
      "42323".match(/(\d{3}-\d{3}|[^5^9]\d{4})/)[0]; // 5도 해볼까?
      "42323".match(/(\d{3}-\d{3}|[0-46-8]\d{4})/)[0];
      /* 핸드폰 번호를 시작해봅시다 */
      "010-2006-2116".match(/01[01789]-\d{4}-\d{4}/)[0];
      ```

      ```javascript
      /* 코드에서 function 을 찾아볼까요 */
      \(?function\s+[a-zA-Z_$]+
      \s?(var|const|let)\s+[$_a-zA-Z]+
      /*
      \s = 공백
      \s? = 공백이 있거나 없거나
      + = 연속적인
      */
      /* 
      Replace var => const 
      괄호 하나를 $로 표현한다
      */
      Find : (\s?)(var)(\s+[$_a-zA-Z]+)
      Replace : $1const$3
      /*
      Replace
      $1 은 (\d{2}) 를 타겟함
      그
      */
      "011-021-0011".replace(/(\d{2})\d/, "$10");
      "010-021-0011"
      "$$$iloveyou###".replace(/.*([a-zA-Z]{8}).*/, "$1");
      "iloveyou"
      ```

    - 탐욕적(greedy), 게으른(lazy) 수량자

      - 뒤에서 부터 찾거나, 앞에서 부터 찾거나 (lazy를 써서 앞에서 부터 찾도록 하자)
      - greedy : *, +, {n,}
      - lazy : *?, +?, {n,}?

      ```javascript
      "011-021-0011-12312-123".match(/\d.*-/)[0];
      /*
      	우리가 찾고싶은 것은 '011-' 일 수 있음
      	그러나 탐욕적(greedy)이게도 반환되는 값은
      	'011-021-0011-12312-' 임
      */
      "011-021-0011-12312-123".match(/\d.*?-/)[0];
      /*
      	그래서, .* 에 ? 문자를 넣어주면 lazy(게으른) mode로 동작함
      	반환되는 값은	'011-' 임
      */
      ```

    - 정규표현식 추가로 알면 좋은 내용

      - backReference
      - 매칭되는 HTML 태그 찾기
      - () 부분을 뒤에서 \1, \2 로 찾아감

      ```javascript
      "<h1>abcd</h1><h2>두번째 제목입니다</h2>".match(/<h1>.*<\/h\d>/)[0];
      "<h1>abcd</h3><h2>두번째 제목입니다</h2>".match(/<h(\d)>[^(<\/h)].*?<\/h\1>/)[0]; // 올바른 HTML 태그를 찾는다
      "<h1>abcd</h3><h2>두번째 제목입니다</h2><h3>세번째 제목입니다</h3>".match(/<h(\d)>[^(<\/h)].*?<\/h\1>/g); // 글로벌 옵션 (전체 문자열을 타겟한다)
      ```

      - lookAhead `(?=)`

        ```javascript
        "<h1>abcd</h3><h2>두번째 제목입니다</h2><h3>세번째 제목입니다</h3>".match(/<h(\d)>[^(<\/h)]*?(?=<\/h\1>)/g);
        
        // Array [ "<h2>두번째 제목입니다", "<h3>세번째 제목입니다" ]
        ```

        `?=` 부분만 제외하고 나머지 부분을 (앞, 뒤) 유용하게 뽑아낼 수 있음

      ```javascript
      "ABV abc$ abc#".match(/abc/gi);
      /*
      	맨 끝 'i'는 ignore 형식으로 진행됨 (대소문자를 전부 거름)
      */
      "ABV abc$ abc#".match(/abc\$/gi);
      Array [ "abc$" ]
      "ABV abc$ abc#".match(/abc(?=\$)/gi);
      Array [ "abc" ] // 결과에서 $를 생략하고 싶을 때
      
      "ABV abc$ abc#".match(/\w{3}(?=\$)/gi);
      Array [ "abc" ]
      ```

    - A dot is any character

      ```javascript
      let reg = /CS.4/;
      
      alert( "CSS4".match(reg) ); // CSS4
      alert( "CS-4".match(reg) ); // CS-4
      alert( "CS 4".match(reg) ); // CS 4 (space is also a character)
      ```

    - [Sets](https://javascript.info/regexp-character-sets-and-ranges#sets)

      ```javascript
      For instance, [eao] means any of the 3 characters: 'a', 'e', or 'o'.
      // find "V", then [o or i], then "la"
      alert( "Voila".match(/V[oi]la/) ); // null, no matches
      // So there would be a match for Vola or Vila.
      ```

    - [And](https://stackoverflow.com/questions/5176384/regexp-logic-and-or)

      ```javascript
      earth|world
      /(?=.*earth)(?=.*world).*/
      ```



- ### [typeOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof)

  - https://cimfalab.github.io/deepscan/2016/07/typeof
  - `typeOf` 의 타입에는 `Array` 가 **존재하지 않음**
  - `typeof` 의 반환 값
    - undefined
    - object
    - boolean
    - number
    - string
    - function
    - symbol
  - 그래서 Array를 판별할때는 `Array.isArray(arrayData)` 을 사용



- ### [forEach, map](https://medium.com/@hongkevin/js-1-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EB%B0%B0%EC%97%B4-%EB%A9%94%EC%84%9C%EB%93%9C-1-foreach-map-b1cb1c2237d1)

  ```javascript
  let data= [1, 2, 3, 4, 5]
  
  // forEach 를 사용해서 원소의 값들을 각각 3씩 증가시키기
  let result = [];
  data.forEach(x => { result.push(x + 3) });
  console.log(result);
  
  // map 을 사용해서 원소의 값들을 각각 3씩 증가시키기
  let result2 = data.map(x => { return x + 3});
  console.log(result2);
  ```

  - return 의 차이 유/무
  - [forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) 는 **return value** 가 `undefined` 인 반면, [map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) 은 **콜백 함수의 결과 값**들로 구성된 `새로운 배열(A new array with each element being the result of the callback function)`을 **return** 한다
  - 원소들의 합이나, 평균을 구하고자 한다면, 그리고 원래 배열과는 길이가 다른 배열 결과를 받고 싶다면 `forEach`
  - 배열을 순회하며 원소의 값들을 각각 가공해서 수정된/새로운 배열(원래 배열과 길이가 똑같은)을 return `map`



- ### [filter, reject, every, some](https://medium.com/@hongkevin/js-2-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EB%B0%B0%EC%97%B4-%EB%A9%94%EC%84%9C%EB%93%9C-2-filter-reject-every-some-4517f99fc998)

  - #### filter

    ```javascript
    const data = [1, 2, 3, 4, 5]
    const oddNumber = data.filter(val => { return val % 2 != 0 });
    
    console.log(oddNumber); // [1, 3, 5]
    console.log(data); // [1, 2, 3, 4, 5]
    ```

    호출한 배열에 대한 변화가 없으며, 새로운 배열로 반환됨

    - `_.isNil(value)` : Checks if `value` is `null` or `undefined`.
    - `_.isNull(value)` : Checks if `value` is `null`.
    - `_.isNumber(value)` : Checks if `value` is classified as a `Number` primitive or object.

    1. 클라이언트로 부터 전달받은 검색조건에 따라 필터가 적용된 쿼리결과를 return 하고 싶을 때
    2. null 값이나 특정 자료형을 걸러내고 싶을 때 사용
    3. filter 메서드는 희소배열의 경우, **`빈 원소를 건너뛰기 때문`**에 return 되는 배열에는 빈 원소가 없다(때문에 빈 원소를 제거하고 싶을 때 쓰면 굳)

  - #### every, some

    ```javascript
    const data = [1, 2, 3, 4, 5];
    
    const isAllOdd = data.every(val => { return val % 2 != 0 });
    console.log(isAllOdd); // false
    
    const isSomeOdd = data.some(val => { return val % 2 != 0 });
    console.log(isSomeOdd); // true
    ```

    every 와 some 메서드는 배열을 순회하면서 **`특정 조건을 배열의 값들이 만족`**시키는지 검사하는 메서드로서 호출한 배열이 결론적으로 조건을 만족시키는지(true), 만족시키지 못하는지(false)를 알려준다. every 와 some 의 차이는 **`every 가 배열의 모든 값이 조건을 만족해야, some 은 일부만 만족해도 true 를 return`** 한다.

    every, some 메서드는 **`반환 값이 결정되면 원소 순회를 중단`**한다.



- ### [Reduce](https://medium.com/@hongkevin/js-3-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EB%B0%B0%EC%97%B4-%EB%A9%94%EC%84%9C%EB%93%9C-reduce-100-%ED%99%9C%EC%9A%A9%EB%B2%95-feat-egghead-io-97c679857ece)

  ```javascript
  var votes = ["kim", "hong", "lee", "hong", "lee", "lee", "hong"];
  
  var reducer = function(accumulator, value, index, array) {
    if (accumulator.hasOwnProperty(value)) {
      accumulator[value] = accumulator[value] + 1;
    } else {
      accumulator[value] = 1;
    }
    return accumulator;
  }
  
  var initialValue = {};
  var result = votes.reduce(reducer, initialValue);
  console.log(result); // { kim: 1, hong: 3, lee: 3 }
  ```

  `accumulator` 은 `빈 객체` 로 시작함

  `return accumulator` 이 진행되면서 `accumulator` 이라는 `Object` 에 **데이터가 추가됨**

  `value` 에서는 votes 의 데이터를 순차적으로 받음 (즉, votes[index] 와 같음)

  `index` 에서는 0 부터 시작해서 1씩 증가함

  `array` 는 votes 와 똑같은 데이터가 받아짐