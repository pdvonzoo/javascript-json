### parseString 

* OverView

parseString모듈은 string값을 받아 string안에 가지고 있는 타입 형태들을 분석해서 알려주는 모듈 입니다. javascript가 가지고 있는 type(es6 이전) function을 제외한 타입들을 판별해줍니다. (추후에 update 할 예정)


* folderStructure 

```
parseString     parseString 함수
src             parseString에 필요한 function들 
- checkClosed   
- IdentityObject
- makePrimitiveType
- splitItem 
- util
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


[프로젝트_Repo](https://github.com/amorfati0310/javascript-json/tree/amorfati0310)

* 사용법 
```
bad
한꺼번에 여러타입이 있는 문자열을 test를 할 수 없습니다 
'[1,2,3],{a:[1,2,{b: 3}]}'

good

const stringInput = '[1,2,3]'
parseString(stringInput)
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
parseString(stringInput)


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

