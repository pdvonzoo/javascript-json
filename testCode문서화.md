# TEST CODE

### 목표

---

* 테스트코드를 짜기위해 test함수를 만들어야한다. 
* test함수를 핵심기능과 구현방법을 설명할 수 있어야한다.



#### 실행결과

---



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

#### 결과 console창

```js
두 개의 서로다른 양의 정수의 합이 올바르게 나온다  : OK
양의 정수와 음의 정수의 합이 올바르게 나온다 : FAIL (targetValue is 10, expectValue is 0)
```



### 테스트함수를 만들기 위해서는 어떤 기능이 있어야할까?

---

test함수의 첫번째 인자로는 테스트케이스인 문자열이고, 

두번째 인자로는 expect값과 toBe의 값을 비교하여, 같은 값을 비교하는 것이다. 

* 값을 비교해주는 equal메서드

* 값이 배열인 경우에 비교해주는 arrayEqual메서드

* 값이 객체일 경우에 비교해주는 objectEqual메서드

* 비교한 값이 같을 경우 "OK"라는 문자열을 반환하고, 

  다를 경우 "FAIL"과 비교하는 값을 반환하는 toBe메서드

  

###기능을 만들기 위해서 어떻게 해야할까?

---

* #### expect 클래스

  비교해야할 두 개의 인자값을 받는데 첫번째 비교할 값으로 constuctor에 result값을 받는다.

  두번째 값은 toBe메소드에서 인자로 받는다. 

  그리고 exports할 때는 ( result ) => new expect( result )함수의 형태로 다른 파일에 보낸다.

  ```js
  exports.expect = ( result ) => new expect(result)
  ```

  

* #### toBe 메소드

  비교해야할 두 개의 값 중 expect값이 아닌 구현한 함수의 결과값을 인자값으로 받는다. 

  비교한 두 값이 같을 시에는 "OK"라는 문자열을 반환하고,

  두 값이 다를 시에는 "FAIL" 과 두 값이 함께 반환된다. 

  ~~~json
  const sum = (a,b) => a+b;
  expect(30).toBe(sum(10,20))	//OK
  expect(30).toBe(sum(15,20)) //FAIR, expectValue 15, targetValue 20
  ~~~

  

* #### equal 메소드

  두 값을 비교하기 위한 메서드이다.

  같으면 true, 다르면 false를 반환한다.

  만약 배열일 때는 arrayEqual을 호출해서 비교하고,

  객체일 경우에는 objectEqual을 호출해서 비교한다.

  

* #### arrayEqual 메소드

  두 값이 배열일 때 비교해주는 메서드인데, 같은 인덱스의 모든 원소값을 비교해준다. 

  모두 같다면 true를 반환하고, 한개의 원소라도 같지 않다면 false를 반환한다. 

  ~~~js
  const expect = [1,2,3]
  const target = [1,2,3]
  expect.every( (v,i) => v === target[i]) //모든 원소가 같으면 true, 아닌경우엔 false를 반환한다.
  ~~~

  

* #### objectEqual 메소드

  두 값이 객체일 경우에 비교해주는 메서드이다.

  두 값의 모든 key값과 value값이 같으면 true를 반환,

  아닐 경우에는 false를 반환한다.

  ~~~js
  const expect = { a : 'crong' , b : 'pobi'}
  const target = { a : 'crong' , b : 'pobi'}
  
  for( key in expect ){
      if(expect[key] === target[key])
  }//모든 원소의 key값과 value값이 같으면 true, 아닌경우엔 false를 반환한다.
  ~~~



> 주의할 점 
>
> 1. 두 객체 혹은 두 배열의 길이는 같아야한다.
>
> 2. 배열의 원소나 객체의 value값이 또 배열이나 객체일 경우에는 
>
>    두 비교 원소가 인자값으로 equal함수를 또 호출한다.
>
>    ex)
>
>    ~~~js
>    for( key in expect ){
>        if( expect[key] === target[key] )continue;
>        if( typeof expect[key] === "object")equal(expect[key], target[key]);
>    }
>    ~~~
>
>    

