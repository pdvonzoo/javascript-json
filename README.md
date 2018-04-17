> ### 코드스쿼드에서 진행하는 Array Parser Repasitory 입니다.



1. ### 설계

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

   - ### 구현하면서 느낀 점

     - Javascript 를 구현하면서도 type 에 대한점을 항상 신경쓸 것

       - 배열에 String 넣는 실수를 하면서 느낌 (계속 다른 반환값이 뜨면서도 몰랐음 하하)

     - 정규식이 와닿지 않는다 (하.. 개인적으로 싫은것일까? 별로 쓰고싶지 않다, crong한테 물어봐야겠다)

       - 그래서 숫자를 판별할 때, `parseInt` 메서드를 사용해 `NaN` 이 나오는것으로 판별하였다

       ```javascript
       console.log(parseInt("123")); // 123
       console.log(parseInt("!23")); // NaN
       console.log(parseInt(" 23")); // 23
       ```

     - `foreach​` 는 `continue` 가 적용되지 않음

   ​

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

  - ### every, some

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

  ​

  ​

  ​







































​