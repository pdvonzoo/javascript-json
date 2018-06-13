> ### STEP4 : 여러가지 타입 분석

- #### 요구사항

  - 숫자타입이외에 string, boolean, null 타입도 지원하도록 구현한다.

    > ['1a3',[null,false,['11',[112233],112],55, '99'],33, true]"

  - 올바른 문자열이 아닌 경우 오류를 발생한다. (아래 실행결과 참고)

  - 타입체크를 정규표현식을 사용하는 경우, backreference를 활용하는 것을 추천.

  - 복잡한 세부로직은 함수로 분리해본다.

  - 중복된 코드역시 함수로 분리해서 일반화한다.



- #### 실행결과

  ```javascript
  var s = "['1a3',[null,false,['11',[112233],112],55, '99'],33, true]";
  var result = ArrayParser(str);
  console.log(JSON.stringify(result, null, 2)); 
  
  var s = "['1a'3',[22,23,[11,[112233],112],55],33]";  //'1a'3'은 올바른 문자열이 아닙니다.
   var result = ArrayParser(str);
   ==>  //'1a'3'은 올바른 문자열이 아닙니다.
  
   var s = "['1a3',[22,23,[11,[112233],112],55],3d3]";  // 3d3은 알수 없는 타입입니다
  var result = ArrayParser(str);
   ==> // 3d3은 알수 없는 타입입니다
  ```