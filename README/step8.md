> ### STEP 8 : 통계

- #### 요구사항

  - ArrayParser를 클래스 형태로 구현해서 객체를 통해서 접근할 수 있게 한다.
  - 모든 타입 갯수를 분석해서 출력한다.
  - 객체안의  value의 타입까지 합쳐서 계산한다.

  

- #### 실행결과

  ```javascript
  var s = "['1a3',[null,false,['11',112,'99'], {a:'str', b:[912,[5656,33]]}, true]]";
  var ap = new ArrayParser(str);
  var stats = ap.getStats();
  
  //숫자 n개, 문자열 n개, null n개, boolean n개, 배열 n개, 객체 n개.
  //숫자 4개, 문자열 4개, null 1개, boolean 2개, 배열 5개, 객체 1개.
  ```

  

- #### 구현사항

  - **정규식을 이용하는 방법**

    - 가장 독자적인 규격을 찾자
      - String Regex `/\'[a-z0-9]+\'/g;`
      - Null Regex `/null/g;`
      - Boolean(true, false) Regex `/(true|false)+/g;`
      - Array Regex `/\[/g;`
      - Object Regex `/\{/g;`
      - Number Regex `/[^\']\d+[^\']/g;`

  - 아니면 typeDecesion 메서드에서 카운트하고, 객체의 경우만 따로 뽑아내서 카운트

    - 객체 안에 배열이 들어있는 경우 카운트되므로, 예외사항이 하나 더 생기긴 함

  - 만약 해당 데이터가 없을 경우 `null` 을 반환하므로, null 처리할 것

    

- #### 에러사항

  - `null` 일 경우 0 으로 리턴해주어야 한다.
  - 그 전에, length 메서드가 `null` 을 만나면 에러를 뿜뿜하므로, 예외처리 필요