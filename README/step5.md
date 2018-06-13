> ### STEP 5 : Object Type 지원

- #### 요구사항

  - Object 타입 ( { key: value} ) 도 지원한다.
  - 배열안에 object, object안에 배열이 자유롭게 포함될 수 있다.
  - 지금까지의 코드를 리팩토링한다.
    - 복잡한 세부로직은 반드시 함수로 분리해본다.
    - 최대한 작은 단위의 함수로 만든다.
    - 중복된 코드역시 함수로 분리해서 일반화한다.
    - 객체형태의 class로 만든다.



- #### 실행결과

  ```javascript
  var s = "['1a3',[null,false,['11',[112233],{easy : ['hello', {a:'a'}, 'world']},112],55, '99'],{a:'str', b:[912,[5656,33],{key : 'innervalue', newkeys: [1,2,3,4,5]}]}, true]";
  var result = ArrayParser(str);
  console.log(JSON.stringify(result, null, 2));
  ```





- #### 구현과정

  1. 알 수 없는 타입에 걸림
  2. 현재 코드에서 쪼개지는 방식
     1. ['1a3',**[null,false,['11',[112233],{easy : ['hello', {a:'a'}, 'world']},112],55, '99']**,{a:'str', b:[912,[5656,33],{key : 'innervalue', newkeys: [1,2,3,4,5]}]}, true] 
     2. [null,false,**['11',[112233],{easy : ['hello', {a:'a'}, 'world']},112]**,55, '99']
     3. ['11',[112233],**{easy : ['hello', {a:'a'}, 'world']}**,112]
     4. `{easy : ['hello', {a:'a'}, 'world']}`
        - {easy : ['hello', {a:'a'}, 'world'] : 2개의 괄호에 조건이 걸림

  ```javascript
  {
      "type": Object
      "Key": easy
      "Value: ['hello', {a:'a'}, 'world']
  }
  
  {
      "type": Object
      "Key": easy
      "Value: [
          {
              "type": "String"
              "value": "'hello'"
              "child": []
          },
          {
              "type": "Object"
              "key": "a"
              "value": "'a'"
          },
          {
              "type": "String"
              "value": "'world'"
              "child": []
          }
      ]
  }
  ```

  - foreach 에서 continue 를 원한다면 `return;` 해주면 됨
    - createObject 의 구문을 전부 수정
    - 바로 return 될 수 있는 부분을 처리하여 간소화
  - `[]` 를 모으는 과정에서 `{}` 가 걸림
    - 그래서 `{}` 조건문을 맨 최상단으로 빼고 바로 return
    - `{` 와 `}` 의 count 갯수를 통해서 최종적으로 `{ ... }` 구문만 따로 메서드로 처리할 계획
  - Object 안에 있는 배열을 분석하는 과정에서 createObject 메서드를 재사용하는 부분으로 하려니 머리가 깨질듯 함
  - 새로운 class로 파지 않는 이상, createObject 메서드에서 dividedCharacterDatas 의 foreach 문이 수행되기 때문에, `{ }` 를 분석하기가 힘듬
  - 재귀로 해결해보자
  - 원래 `[]` 로 시작했던 구문을 따로 빼서 재귀로 돌렸던 것 처럼
  - `{}` 도 똑같이 createObject에 들어오게 함
    - 문제가, createObject의 사이즈가 커져버림
    - 그리고, 똑같은 구문에 걸려서 무한루프가 발생함
    - 모드를 구분, 클래스 만들 때 같이 넘겨줘야겠음
  - 일단은, createCurlyObject 메서드에서 `[]` 부분을 따로 빼서, createObejct의 재귀를 이용해보자
  - getResult 메서드에서 createObject 메서드를 호출하는 대신 createCurlyObject 메서드를 호출
  - 재귀에 재귀를 물고, 꼬리에 꼬리를 물어가지고 한번 디버깅을 놓치면 끝장남... 정신 똑띠차리자!
  - 하아 디버깅도 어렵고, 한번 풀면 다시 재현해내는것도 ... shit
  - 두번 째 쪼개지는 방식
    1. ['1a3',[null,false,['11',[112233],{easy : ['hello', {a:'a'}, 'world']},112],55, '99'],**{a:'str', b:[912,[5656,33],{key : 'innervalue', newkeys: [1,2,3,4,5]}]}**, true] 
    2. {a:'str', b:**[912,[5656,33],{key : 'innervalue', newkeys: [1,2,3,4,5]}]**}
       - key가 2개 이상 존재하는 조건들을 구분해줘야함
  - 한 Object 안에 key가 2개 들어갈 경우
  - key1 - value1, key2 - value2, ... 이런식으로 분류하는게 맞는데
  - 숫자로 모드를 구분?
  - 어차피 mergeData를 넣는것이므로, 한 메서드에서 처리
  - createCurlyObject 메서드에서도 `]` 를 두번 체크해야 함