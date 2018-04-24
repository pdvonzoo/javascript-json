# parseString 

parseString은 문자열의 타입과 값을 분석합니다 :D

* [How to Use](### How to Use) 

## OverView

parseString모듈은 string값을 받아 string안에 가지고 있는 타입 형태들을 분석해서 알려주는 모듈 입니다.<br> javascript가 가지고 있는 type(es6 이전) function을 제외한 타입들을 판별해줍니다. (추후에 update 할 예정)<br>

```example.js
const stringInput = '[1,2,3]'
const result = parseString(stringInput)
console.log(JSON.stringify(result, null, 2));
// result
{
  "type": "array",
  "value": "ArrayObject",
  "child": [
    {
      "type": "number",
      "value": "1",
      "child": []
    },
    {
      "type": "number",
      "value": "2",
      "child": []
    },
    {
      "type": "number",
      "value": "3",
      "child": []
    }
  ]
}

```

### FolderStructure & Instruction


* FolderStructure

구조를 간략히 설명합니다.

```example.js
ArrayParser
 - parseString        parseString Main Function ( 문자열 분석 )
              
 -- index.js
 
 - src                parseString에서 필요한 함수 모음들
      
 -- checkClosed       닫힘상태 체크 함수
 -- typeCounter       결과값을 받아 type 을 세어 주는 함수
 -- IdentiyObject     결과의 형태를 가지는 클래스 
 -- makePrimitiveType 원시타입일때 결과를 만들어주는 함수
 -- splitItem *       문자열들을 분리해서 개별아이템 모음으로 만들어주는 함수

 -- util              함수 , 타입체크, 테스트 util들 

 - test               testCase들
 --- splitItem.test.js                               
 --- typeCounter.test.js...등  
```

### Flow 및 주요 함수들 기능 설명 

* Flow 
* Functions

> Flow 

1. parseString이 문자열을 받으면 우선 문자열인지 아닌지 체크를 합니다.<br> 
문자열인 경우에 `trim`을 한 후에 `makeIdObjByType`으로 받은 문자열을 넘겨줍니다.<br> 

2. `makeIdObjByType`은 문자열의 'edge'를 체크하면서 `objString` 인지 `arrayString` 인지 판별하고 내부구조를 살펴봐야 되는 `array`나 , `obj`인 경우에 array나 Obj가 제대로 닫혀있는지를 체크 한 후에 정상적인 경우  `parseObjandArray` 함수로 문자열을 보내줍니다. 원시타입String인 경우에는 
`makePrimitiveType`함수에서 바로 결과값을 기록합니다. <br>

3. arrayString이나 objString이면 parseObjandArray 에서 함수형 util `pipe`를 통하여 `removeBrackets`과 `splitItem`을  순차적으로 실행해줍니다. 그리고 splitItem에서 받은 분리된 항목들에 타입에 따라 결과를 담아주는 arrayString의 경우에는 `getResultToObjArrayString`가, ObjString의 경우에는 `getResultToObjObjString` 함수 를 실행합니다. <br>

* `getResultToObjArrayString, getResultToObjObjString`에서는 중첩된 내부 구조에 따라 다시 한 번 같은 로직을 수행해야 되므로 결과를 쓸 때 마다 
arrayString의 경우에는 자식에 `makeIdObjbyType`을 다시 호출하며 값을 기록해주고 마찬가지로 ObjString의 경우네는 value값에 `makeIdObjbyType`을 호출하여 값을 기록해줍니다. <br>

* splitItem  각각의 아이템들을 분리하는 핵심로직인 `splitItem`에서는 `,`와 
```[,],{,},'`',"'",'"',``` 와 같은  중첩이 가능한  String들을 체크해주면서 ,이를 바탕으로 닫힘상태를 체크해가며 닫혀있고 ,를 만났을 때 분리된 하나의 아이템의 마지막을 나타내므로 이를 체크하여 분리된 ItemList들을 기록하여 최종적으로 이 ItemList를 반환합니다. <br>

<br>

> Functions

간략히 함수들의 기능 및 Flow 설명

* pareString 
* checkClosed

문자열 String을 분석하는 최종 Function pareString


#### pareString

``` 

parseString -> makeIdObjByType -> 
i) makePrimitiveType
ii) parseObjandArray -> pipe(makeItemList, methodsByType[type].result)(str) -> 
getResultToObjArrayString or getResultToObjObjString-> makeIdObjByType

```
#### checkClosed 

*  isArrayClosed Array Edge 양끝으로 닫혀있는지 판별 함수
*  isObjClosed  Obj Edge로 닫혀있는지 판별 함수 

#### IdentityObject

IdentityObject `{type: number value:1 child: []}` type, value, child 값을 가진 object`<br>
IdObject `{type: object, key:'a', value: b}` type, key, value를 가진 object 

#### makePrimitiveType

```` example.js
const makeIdObjPrimitiveType = str => {
  if(hasStringEdge(str)) return checkClosedString(str)
  if(!isNaN(str)) return new IdentityObject('number', str)
  if(isBooleanString(str)) return new IdentityObject('boolean', str)
  if(isNullString(str)) return new IdentityObject('null', str)
  if(isUndefinedString(str)) return new IdentityObject('undefined', str) 
  throw new Error(`${str} 는 알 수 없는 타입입니다`) 
}
````
각 타입별로 IdentityObject 를 반환해주는 함수 

#### splitItem *

`array, object`같은 중첩이 가능한 string내에서 ```[,],{,},'`',"'",'"',``` 토큰과 `,`를 이용하여 개별 아이템 리스트를 만들어주는 함수 

```example.js
 const input = '[1,2,3],[1,[4,5]]'
 const splitItemResult = splitItem(input)
 // splitItemResult
['[1,2,3]','[1,[4,5]]']
```

#### typeCounter
 
parseString으로 결과 값을 받아서 type별 Counts를 분석해주는 함수  

``` example.js
  const parseStringResult = parseString[1,2,3,4,5]
  const countsResult = typeCounter(parseStringResult)
   
   // countsResult
       {
            type: {
                "array": 1,
                "number": 5,
            }
        }
```

### util

* functional map, filter, each, pipe등 함수형 프로그래밍 util <br>

* test expect, describe, test등 테스트를 도와주는 util

* typeCheck javascript에 8가지(es6이전) type들을 체크해주는 함수들 test


### How to Use

```example.js
bad
한꺼번에 여러타입이 있는 문자열을 test를 할 수 없습니다 
'[1,2,3],{a:[1,2,{b: 3}]}'

good

const stringInput = '[1,2,3]'
const result = parseString(stringInput)
console.log(JSON.stringify(result, null, 2));
// result
{
  "type": "array",
  "value": "ArrayObject",
  "child": [
    {
      "type": "number",
      "value": "1",
      "child": []
    },
    {
      "type": "number",
      "value": "2",
      "child": []
    },
    {
      "type": "number",
      "value": "3",
      "child": []
    }
  ]
}

중첩된 내부 문자열들은 test할 수 있습니다.
const stringInput = [[1,2,3],{a:[1,2,{b: 3}]}]
const result = parseString(stringInput)
console.log(JSON.stringify(result, null, 2));

// result
{
  "type": "array",
  "value": "ArrayObject",
  "child": [
    {
      "type": "array",
      "value": "ArrayObject",
      "child": [
        {
          "type": "number",
          "value": "1",
          "child": []
        },
        {
          "type": "number",
          "value": "2",
          "child": []
        },
        {
          "type": "number",
          "value": "3",
          "child": []
        }
      ]
    },
    {
      "type": "object",
      "key": "a",
      "value": {
        "type": "array",
        "value": "ArrayObject",
        "child": [
          {
            "type": "number",
            "value": "1",
            "child": []
          },
          {
            "type": "number",
            "value": "2",
            "child": []
          },
          {
            "type": "object",
            "key": "b",
            "value": {
              "type": "number",
              "value": "3",
              "child": []
            }
          }
        ]
      }
    }
  ]
}

```

### how to Test

테스트 유틸에는 사용할 수 있는 함수는 `describe`, `test`, `expect`가 있습니다. <br>

`describe`,`test`를 통해서 테스트 단락, 테스트 구문을 작성하고 <br>

`expect` 인스턴스를 통해서 테스트의 통과 유무 테스트 결과 값을 출력해줍니다. <br>


* describe
* test
* expect


#### expect

expect 인스턴스는 `not, toBe, toEqual`3가지 메소드를 가지는 테스트를 위한 가벼운 인스턴스입니다. 이 3가지 메소드를 살펴보면


* toBe  === 값 비교
```ToBe.js

toBe는 targetValue와 expectValue값이 같은지 판별해줍니다.

ex) expect(targetValue).toBe(expectedValue)
```

* not 

`expect.not`은
`expect`가 가지고 있는 `targetValue`를 반전시켜줍니다.

* toEqual
`toEqual`은 `targetValue`와 `expectValue` 내부 순수 밸류들을 비교해주어서 내부 값들이 같은지 비교해줍니다. 
`array`, `obj`값들을 비교할 때 사용됩니다.

```toEqual_example.js

const targetValue = {a:b}
const expectedValue = {a:b}
expect(targetValue).toEqual(expectedValue) 

```

testModule을 

test Folder에서 예제를 쉽게 찾을 수 있을 것입니다.


#### TestCase example

```example.js
describe('parseString 테스트', ()=>{
    test('parseString 기본값 테스트',()=>{
        //given
        const inputString = '[1,2,3]'
        const expectedValue = {
            type: 'array',
            value: 'ArrayObject',
            child: 
             [ { type: 'number', value: '1', child: [] },
               { type: 'number', value: '2', child: [] },
               { type: 'number', value: '3', child: [] } ] } 
        //when
        const parsedStringResult = parseString(inputString);
        //then
        expect(parsedStringResult).toEqual(expectedValue) 
    })

```

### 이슈 

*  Equal문자열 Object key,value값 비교 ! 유니코드 기준으로 sort필요 

countTest에서 ? aobnu순으로 나온 것을 보면 어찌해줘야 될지 알아보고 수정  

* testCase 함수들 더 추가 및 리팩토링 + toThrow error Test 추가

[프로젝트_Repo](https://github.com/amorfati0310/javascript-json/tree/amorfati0310)
