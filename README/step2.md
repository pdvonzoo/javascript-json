>### STEP 2 : 2중 중첩 배열 분석

- #### 요구사항

  - 배열안에 배열이 있는 경우도 분석한다.

    >var s = "[123,[22],33]";

  - 중첩된 배열 원소도 역시, 숫자데이터만 존재한다.

  - 중첩된 결과는 child 부분에 추가해서 결과가 표현돼야 한다.

  

- #### 실행결과

  ```javascript
  var str = var s = "[123,[22],33. [1,2,3,4,5]]";
  var result = ArrayParser(str);
  console.log(JSON.stringify(result, null, 2));
  ```

  ```javascript
  //배열안의 배열 같은경우, 다음과 같이 표현될 수 있다(예시)
       { type: 'array', value: ArrayObject, child: [{type:'number', value:22, child:[]}] }
  ```

  

- #### 구현 후 느낀점

  이때는 뭔가 if문으로 도배된 코드를 작성하고 있다고 느꼈다.

  디버깅을 진행하면서 조건문 납땜하는 느낌

  처음 설계했던 부분과는 생각하는 깊이정도가 말이 안된다.

  설계하면서 2의 깊이를 들어갔다면, 디버깅은 6~7정도의 깊이를 들어가는듯

  경험부족인가?