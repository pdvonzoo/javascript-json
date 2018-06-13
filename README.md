# Array Parser

문자열을 입력 받고 입력 받은 문자열을 분석하여

새로운 자료구조로 만들어서 반환한다

**Input**

```js
"['whale',  1, true]";
```

**Output**

```js
{
  "type": "array",
  "value": "ArrayObject",
  "child": [
    {
      "type": "string",
      "value": "whale",
      "child": []
    },
    {
      "type": "number",
      "value": 1,
      "child": []
    },
    {
      "type": "boolean",
      "value": true,
      "child": []
    }
  ]
}
```

## 기능

- [[[[]]]]와 같은 다중 중첩배열 구조도 분석할 수 있다

- 7가지 타입을 분석할 수 있다 (Object, Array, String, Number, True, False, Null)
- 문법적 오류가 있다면 검출해낸다 (컴마 없음, 괄호 개수 안맞음, 문자+숫자 혼합과 같은 오류)
- 분석한 배열의 모든 원소의 타입을 체크해 타입별 개수를 출력한다

## 동작 흐름

크게 세 가지 과정을 거쳐서 파싱한다

1. Materializer : 문자열인 배열을 배열로 실체화한다
2. Checker : Materializer과정 안에서 문법적 오류를 검출해낸다
3. Tokenizer: 2까지 과정을 마친 배열을 새로운 구조(객체 구조)로 매핑시킨다

```js
const input = "I am input";
const materializer = Mateializer(input); // 1.Materializer + 2.Checker (Materializer 내부에 Checker과정이 있다)
const tokenized = Tokenizer(arrayed); // 3.Tokenizer
return tokenized;
```



### 1. Materializer

String type으로 되어 있는 배열형태 문자열을 유효한 배열로 만든다

이 과정이 가장 핵심적이며 가장 많은 루프가 돈다

#### 분석 Logic

1. 입력된 문자열을 split('')을 이용해 문자열을 배열로 만든다

```js
"['whale',1,null]"
-> ["[","'","w","h","a","l","e",",","1",",","n","u","l","l","]"]
```
2. 배열화된 문자열을 모두 분석한다

**분석 순서**

A. 양쪽의 Bracket "[" 와 "]"를 제거한다

B. 배열화된 모든 문자열이 반복문을 돌며 임시 변수에 저장된다

C. "," 문자열을 만나게 되면 ","를 만나기 전까지 B를 반복하며 누적된 값을 Checker모듈을 이용하여 문법적 오류를 검사한다

> 여기서 **한 가지 문제**가 생긴다
>
> 배열과 객체 타입도 문자열에 포함되어 있기 때문에 배열과 객체 안의 ","를 만나면
>
> "[whale"과 같은 문자열이 만들어지는 것이다
>
> 그래서 배열과 객체는 "["와 "{"가 시작될 때부터 "]"와 "}"로 종료될 때지 분석해서 누적한다 중첩배열인 경우엔 "["와 "]" 개수를 카운트해서 같은 수로 종료될 때까지 분석한다
>
> **결론적으로 배열은 통째로 하나의 완성 문자열이 되는 것이다**

D. 문법적 오류가 발생했다면 에러메세지를 throw하고 문제가 없다면 최종적으로 반환할 배열에 임시변수에 누적된 값을 PUSH하고 임시 변수는 초기화 시킨다

E. 누적된 값이 배열이나 객체라면 재귀를 이용해 다시 분석한다

중첩이 계속되어도 재귀함수가 있기 때문에 배열이나 객체가 없을 때까지 계속한다

그리고 재귀를 거쳐 완성된 배열이나 객체 값을 최종배열에 PUSH한다

F. A-E과정을 거쳐 완성된 최종배열을 반환한다



**Parser("['whale',1,[1,2,3,['a','b',nulll]],false]") 분석 과정 모식도**

<img src="./images/process1.png" width="550">

**[1] 배열 "[1,2,3,['a','b',null]]"가 완성되었을 때 로직**

<img src="./images/process2.png" width="550">

**[2] "[1,2,3,['a','b',null]]"를 재귀를 이용해 처리한다 배열을 또 완성되면 위와 같이 재귀로 처리**

<img src="./images/process3.png" width="550">

**[3] "['a','b',null]"를 재귀를 이용해 처리한다 더이상 배열이 없어서 재귀가 끝난다**

<img src="./images/process4.png" width="550">

**[4] 완성된 배열 ['a','b',null] 을 리턴한다**

<img src="./images/process5.png" width="550">

**[5] 완성된 배열 "[1,2,3,['a','b',null]]"를 리턴하고 나머지 원소 false까지 분석하고 마친다**

<img src="./images/process6.png" width="550">

**[6] 최종 결과 배열**



---


### 2. Checker

Materializer과정에서 누적된 하나의 값이 완성될 때에 배열에 PUSH하기 전에 그 값에 문법적 오류가 있는지 체크한다

오류가 있으면 에러를 throw한다

**에러 체크 내용**

- '1'23'와 같은 quote 개수 오류
- 123a와 같은 타입 오류
- "[]","{}" 괄호 개수가 맞지 않는 경우 ex) [1,2]]
- 객체 안에서 ":"가 빠진 경우
- quote('')없이 문자열인 경우



추가적으로 분석 과정에서 불필요한 문자열들을 제거하고 입력된 값의 타입을 문자열로 반환하는 기능도 한다

**추가 기능**

- Materializer과정에서 문자열 누적에 오류를 생기게 하는 불필요한 문자들(Comma, Bracket, Equal, Quote)을 제거해주는 기능



### 3. Tokenizer

1-2번 과정을 거친 배열이 입력된다

입력된 배열의 모든 원소에 루프를 돌며 객체구조로 매핑한다

입력 예를 통해 매핑되는 객체구조는 다음과 같다

```js
Tokenizer([1,null,'whale'])
->
{ type: 'array'
  value: 'ArrayObject'
  child: 
   [ { type: 'number', value: 1, child: [] },
     { type: 'null', value: null, child: [] },
     { type: 'string', value: 'whale', child: [] } 
    ] 
}
```
- 매핑할 때 타입 체크는 내부에 원소별로 타입을 반환하는 함수를 이용한다
- 배열, 객체 중첩구조가 입력될 때에는 재귀를 이용하여 무한 중첩까지 매핑한다

Tokenizer과정이 모두 끝난다면 최종적으로 완성된 객체를 반환한다



### 추가 기능

- Statistic 모듈을 이용하여 분석된 배열의 타입 개수를 통계하는 기능

- TestCode를 사용하여 위의 3가지 모듈 안의 함수들을 개별적으로 테스트하는 기능

  