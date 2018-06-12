# Array Parser

### ArrayParser Do

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

## ArrayParser의 기능

- [[[[]]]]와 같은 다중 중첩배열 구조도 분석할 수 있다

- 7가지 타입을 분석할 수 있다 (Object, Array, String, Number, True, False, Null)
- 문법적 오류가 있다면 검출해낸다 (컴마 없음, 괄호 개수 안맞음, 문자+숫자 혼합과 같은 오류)
- 분석한 배열의 모든 원소의 타입을 체크해 타입별 개수를 출력한다

## Flow

크게 세 가지 과정을 거쳐서 파싱한다

```js
const input = "I am input";
const arrayed = Arrayer(input); // 1.Arrayer + 2.Checker (Arrayer 내부에 Checker과정이 있다)
const tokenized = Tokenizer(arrayed); // 3.Tokenizer
return tokenized;
```



### 1. Arrayer

문자열로 되어 있는 입력값을 배열형태로 만든다

이 과정이 가장 핵심적이며 가장 많은 루프가 돈다

#### 분석 Logic

1 입력된 문자열을 split('')을 이용해 문자열을 배열로 만든다

```js
"['whale',1,null]"
-> ["[","'","w","h","a","l","e",",","1",",","n","u","l","l","]"]
```
2 배열화된 문자열을 모두 분석한다

> 분석 과정

1. 문자열 ","를 만나기 전까지 문자열을 임시 변수에 계속 누적하며 진행한다

2. ","를 만날 때 누적된 문자열을 반환한다 그리고 임시 변수를 초기화하는 방법으로 모든 문자열을 분석한다
   여기서 **한 가지 문제**가 생긴다
   배열과 객체 타입도 문자열에 포함되어 있기 때문에 배열과 객체 안의 ","를 만나면
   "[whale"과 같은 문자열이 만들어지는 것이다
   그래서 배열과 객체는 "["와 "{"가 시작될 때부터 "]"와 "}"로 종료될 때지 분석해서 누적한다
   중첩배열은 "["와 "]" 개수를 카운트해서 페어로 종료될 때까지 분석한다
   **결론적으로 배열은 통째로 누적되는 것이다**

3. 분석이 완료되어서 하나의 누적 문자열이 탄생한다 (이 때에 Checker가 실행된다)

4. 문자열이 배열이나 객체라면 재귀를 이용해 다시 한 번 문자열을 분석한다
   이것은 더이상 배열이나 객체가 없을 때 까지 계속된다
   누적된 문자열이 배열이나 객체일 때에 전체 분석을 멈추고
   배열, 객체를 분석을 끝내고 다시 전체 문자열 분석을 시작하는 것이다

   

**++Parser("['whale',1,[1,2,3,['a','b',nulll]],false]") 분석 과정++**

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

Arrayer과정에서 하나의 원소가 완성될 때에 그 원소에 문법적 오류가 있는지 체크한다

오류가 있으면 에러를 throw한다

**에러 체크 내용**

- '1'23'와 같은 quote 개수 오류
- 123a와 같은 타입 오류
- "[]","{}" 괄호 개수가 맞지 않는 경우 ex) [1,2]]
- 객체 안에서 ":"가 빠진 경우
- quote('')없이 문자열인 경우



### 3. Tokenizer

1번과정(Arrayer)을 거친 배열이 입력된다

입력된 배열의 원소마다 루프를 돌며 객체 자료구조로 매핑한다

자료구조는 다음과 같다

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
Tokenizer과정이 끝나 최종적으로 완성된 객체를 반환한다



### 추가 기능

- Statistic 모듈을 이용하여 분석된 배열의 타입 개수를 통계하는 기능

- TestCode를 사용하여 위의 3가지 모듈의 함수들을 개별적으로 테스트하는 기능

  