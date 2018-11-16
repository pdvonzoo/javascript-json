 # ArrayParser
======

 ## 목표

- 숫자 데이터로 이루어진 배열 형태의 문자열을 json형태로 파서한다.
- 무한중첩 구조를 시각화한다.
- 최상위 Root 배열의 참조를 통한 구조 설계를 한다.

 ## key point

- curr, child, parent로 이루어진 세가지 변수가 가변적으로 값을 참조하여 Root배열에 값을 추가한다.
- 데이터를 정제한다.
- '[', ']', ','의 특수한 형태에 따라서 분기한다.
- 숫자 데이터를 받기 위한 stop point를 설계한다.

 ## 설계

 ### 1. 새 객체 생성 & 문자열 데이터 입력
- ArrayParser 함수를 통해 문자열(str)을 입력받은 후 객체 생성 및 객체 내부 메소드 실행.

 ### 2. 배열을 순환하며 '[',']',','의 특수한 상황에 따라 value를 얻는다.
- getvalue 메서드에서 해당 value 이후 가장 빨리 특수 상황이 나올때까지의 인덱스를 기준으로 반환.

 ### 3. 특수한 상황에 따른 root 객체의 값을 조정한다. 
- setValue 메서드에서 '['일 경우 자식 배열 추가, ']'일 경우 부모 배열로 돌아가게 하며 공백이 아닌 다른 문자들에 대해서 현재 curr가 위치한 배열에 값을 추가.

 ### 4. 참조에 의해 나온 최종 결과값을 출력한다. 

## test

 ### 1. 입력

- Parser가 클래스 이름이며 processData메서드를 통하여 실행된다. 

```javascript
    const str = "[123,[22,23,[11,[112233],112],55],33]";
    const ArrayParser = (str) => new Parser().processData(str);
    const result = ArrayParser(str);
    console.log(JSON.stringify(result, replacer, 2));
```

 ### 2. 결과

```text
[
  {
    "type": "array",
    "child": [
      {
        "value": "123",
        "type": "number",
        "child": []
      },
      {
        "type": "array",
        "child": [
          {
            "value": "22",
            "type": "number",
            "child": []
          },
          {
            "value": "23",
            "type": "number",
            "child": []
          },
          {
            "type": "array",
            "child": [
              {
                "value": "11",
                "type": "number",
                "child": []
              },
              {
                "type": "array",
                "child": [
                  {
                    "value": "112233",
                    "type": "number",
                    "child": []
                  }
                ]
              },
              {
                "value": "112",
                "type": "number",
                "child": []
              }
            ]
          },
          {
            "value": "55",
            "type": "number",
            "child": []
          }
        ]
      },
      {
        "value": "33",
        "type": "number",
        "child": []
      }
    ]
  }
]
```