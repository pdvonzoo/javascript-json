# javascript-json

레벨 2

## STEP 1

- ArrayParser 함수를 만든다.
- 배열안에는 숫자데이터만 존재한다.
- 배열형태의 문자열을 token 단위로 해석한 후, 이를 분석한 자료구조를 - 만든다.
- 정규표현식 사용은 최소한으로 한다.(token 의 타입체크에 한해 사용가능)

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

## STEP 2

- 배열안에 배열이 있는 경우도 분석한다.

  > var s = "[123,[22],33]";

- 중첩된 배열 원소도 역시, 숫자데이터만 존재한다.
- 중첩된 결과는 child 부분에 추가해서 결과가 표현돼야 한다.

실행결과

```
var str = var s = "[123,[22],33. [1,2,3,4,5]]";
var result = ArrayParser(str);
console.log(JSON.stringify(result, null, 2));
//배열안의 배열 같은경우, 다음과 같이 표현될 수 있다(예시)
{ type: 'array', value: ArrayObject, child: [{type:'number', value:22, child:[]}] }
```
