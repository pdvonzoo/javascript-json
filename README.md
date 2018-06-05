# javascript-json

레벨 2

## STEP 1

* ArrayParser 함수를 만든다.
* 배열안에는 숫자데이터만 존재한다.
* 배열형태의 문자열을 token 단위로 해석한 후, 이를 분석한 자료구조를 - 만든다.
* 정규표현식 사용은 최소한으로 한다.(token 의 타입체크에 한해 사용가능)

> Result

```
{ type: 'array',
  child:
   [ { type: 'number', value: '123', child: [] },
     { type: 'number', value: '22', child: [] },
     { type: 'number', value: '33', child: [] }
    ]
}
```
