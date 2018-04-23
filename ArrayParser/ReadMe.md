### parseString 

* OverView

parseString모듈은 string값을 받아 string안에 가지고 있는 타입 형태들을 분석해서 알려주는 모듈 입니다. javascript가 가지고 있는 type(es6 이전) function을 제외한 타입들을 판별해줍니다. (추후에 update 할 예정)


* folderStructure 

```
parseString     parseString 함수

--- parseString -> makeIdObjByType -> 
i) makePrimitiveType
ii) parseObjandArray -> pipe(makeItemList, methodsByType[type].result)(str) ->

src             parseString에 필요한 function들 
- checkClosed   
--- isArrayClosed Array Edge 양끝으로 닫혀있는지 판별 함수
--- isObjClosed  Obj Edge로 닫혀있는지 판별 함수 

- counts 

parseString으로 결과 값을 받아서 type별 Counts를 분석해주는 함수  

- IdentityObject IdObject ex) {type: number value:1 child: []} 타입, value, child 값을 가진 object

- makePrimitiveType

const makeIdObjPrimitiveType = str => {
  if(hasStringEdge(str)) return checkClosedString(str)
  if(!isNaN(str)) return new IdentityObject('number', str)
  if(isBooleanString(str)) return new IdentityObject('boolean', str)
  if(isNullString(str)) return new IdentityObject('null', str)
  if(isUndefinedString(str)) return new IdentityObject('undefined', str) 
  throw new Error(`${str} 는 알 수 없는 타입입니다`) 
}
각 타입별로 IdentityObject 를 반환해주는 함수 


- splitItem *
```
`[,],{,},',",`` 중첩이 가능한  String들을 체크해주면서 , 와 같이 닫힘상태를 체크해가며 닫혀있고 ,를 만났을 때 각각의 분리된 아이템으로 분리해주는 함수 
``` 

- util

---- functional

map, filter, each, pipe등 함수형 프로그래밍 util

---- test

expect, describe, test등 테스트를 도와주는 util

---- typeCheck
javascript에 8가지(es6이전) type들을 체크해주는 함수들
test

```


* Flow Instruction

1. parseString이 문자열을 받으면 문자열인지 아닌지 체크와 트림을 한 후에 ->makeIdObjByType으로 받은 문자열을 넘겨줍니다.<br> 

2. makeIdObjByType으로 'edge'를 체크하면서 objString인지 arrayString인지 판별하고 내부구조를 살펴봐야 되는 array나 , obj인 경우 parseObjandArray로 닫힘 체크를 하고 보내주고 아닌 경우 원시타입으로 바로 결과를 내는 함수에 보내줍니다.<br>

3. arrayString이나 objString이면 parseObjandArray 에서  pipe함수를 통하여 bracket제거 splitItem함수 그리고 splitItem에서 받은 분리된 항목들에 타입에 따라 결과를 담아주는 resultObj함수를 실행합니다. <br>

* resultObj에서는 중첩된 내부 구조에 따라 다시 한 번 같은 로직을 수행하므로 결과를 쓸 때 마다 makeIdObjbyType을 호출해줍니다. 재귀 

* splitItem 핵심로직 각각의 아이템들을 분리 

```

const typeString = {
    '[': {'type': 'array', 'closed': addOpenState},
    ']': {'type': 'array', 'closed': addCloseState},
    '{': {'type': 'object', 'closed': addOpenState},
    '}': {'type': 'object', 'closed': addCloseState},
    "'": {'type': 'single', 'closed': toggleState},
    '"': {'type': 'double', 'closed': toggleState},
    '`': {'type': 'backTick', 'closed': toggleState}, 
}
특수한 typeString을 열고 닫고를 나타내는 string들을 통해서 열려있고 닫혀있는지 상태를 순차적으로 닫힌 상태를 update해줍니다. [], {}, 배열 오브젝트는 CLOSED로  ''문자열 열고 닫고는 true로 닫힘 상태를 구분합니다. 
닫힘상태와 ,가 나왔을 경우 각각의 독립된 아이템을 뜻하므로  그 떄까지 순회하며 기록한 아이템을 splitItemList에 넣어주고 다시 처음부터 기록할 수 있게  splitItem을 update을 해줍니다.
이 과정을 문자열이 끝날 때 까지 순회하며 splitItemList를 채우고 값을 반환합니다. 
``` 

* 사용법 
```
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

테스트 유틸에는 describe, test, expect가 있습니다. 

describe , test를 통해서 테스트 단락, 테스트 구문을 작성하고 

expect인스턴스를 통해서 테스트의 통과 유무 테스트 결과 값을 출력해줍니다. 

```
expect 인스턴스는

not 

expect에는 

toBe

Equal 3가지만 가지는 가벼운 인스턴스입니다.

ex) expect(targetValue).toBe(expectedValue)

기본적인 사용법은 
expect안에 targetValue를 넣어주며 인스턴스를 생성하고  expect 메소드에 expectedValue값을 넣어주면서 
테스트 통과 여부를 진행합니다

expect.not은
expect가 가지고 있는 targetValue를 반전시켜줍니다.

toBe는 targetValue와 expectValue값이 같은지 판별해줍니다.

Equal은 targetValue와 expectValue 내부 순수 밸류들을 비교해주어서 내부 값들이 같은지 비교해줍니다. 
array, obj값들을 비교할 때 사용됩니다.


```
testModule을 


test Folder에서 예제를 쉽게 찾을 수 있을 것입니다.


#### TestCase example

```
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