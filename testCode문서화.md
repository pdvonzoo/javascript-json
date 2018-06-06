# TEST CODE

## 프로젝트 설명

* 테스트 가능한 코드를 구현하기 위해 테스트를 함수를 구현한다.

* 테스트 가능한 test함수와 expect.toBe 만든다.

  

  ### 실행결과

  ```js
  const sum function(a,b) {
      if(b < 0) b = 0;
      return a + b;
  }
  
  test("두 개의 서로다른 양의 정수의 합이 올바르게 나온다", function() {
     
      a = 10; b = 20;
      const result = sum(a+b);
      expect(30).toBe(result);
  });
  
  test("양의 정수와 음의 정수의 합이 올바르게 나온다", function() {
      
      a = 10; b = -10;
      const result = sum(a+b);
      expect(0).toBe(result);
  });
  
  ```

  결과 console창

  ~~~js
  두 개의 서로다른 양의 정수의 합이 올바르게 나온다  : OK
  양의 정수와 음의 정수의 합이 올바르게 나온다 : FAIL (targetValue is 10, expectValue is 0)
  ~~~



## 기능구현

####test함수

___

첫번째 인자로는 테스트설명하는 문자열이고, 두번째 인자는 리턴값이 "OK"혹은 "Fail" 함수가 들어온다.

~~~js
test( "두 정수의 합이 올바르게 나온다. ", ( ) => {
    const a = 10;
    const b = 20;
    const result = 30;
    
    return expect(30).toBe(result);
})
~~~



#### expect클래스

---

constuctor로 result값을 받고, exports할 때는 ( result ) => new expect( result )함수의 형태로 다른 파일에 보낸다.

~~~js
exports.expect = ( result ) => new expect(result)
~~~



#### equal메서드

------

answer값과 result값을 비교한다. 같으면 true값을 리턴하고 같지 않으면 false값을 리턴한다.

1. 배열일 때는 인덱스값이 같은 원소를 비교한다.
2. 객체일 때는 같은 key값의 같은 value값인지를 비교한다.
3. 그 외의 type일 경우에는 "===" 으로 비교한다.

~~~js
equal( answer, result ) // 같을 땐 true
equal( answer, result ) // 다를 땐 false
~~~



#### toBe메서드

---

메서드로는 비교를 해서 true일 때는 'OK'라는 문자열을 return하고,

false일 때는 'Fail'과 비교한 두 값을 합쳐서 return 한다.

~~~js
if( euqual( answer, result ))return 'OK' //같을 땐 'OK'를 리턴
return `Fail ${answer} , ${result}`//다를 땐 'Fail'과 두 값을 함께 리턴
~~~



## 느낀점

* 함수와 클래스를 어떻게 나눌 지에 대해 조금 해결책을 알게 된 것 같다.
* 유지보수가 정말 용이하다는 생각이 많이 들었다. 수정할 부분이 생기면 딱 그 부분만 고치면 되니깐 좋은 것 같다.
* 기능을 추가하기위해 코드를 추가할 때도 딱 어디에다가 추가하면 좋을 지 잘보이는 것 같다.

