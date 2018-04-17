> ### 코드스쿼드에서 진행하는 Array Parser Repasitory 입니다.



1. ### 설계

   ![](https://imgur.com/UIoBy3m.png)

   - #### 함수

     1. **function arrayParser(str)**

        입력 값 : 문자열 (String)

        반환 값 : 정해지진 않았지만, `JSON.stringify` 형태에 맞게끔 출력

        ```javascript
        { type: 'array',
          child: 
           [ { type: 'number', value: '123', child: [] },
             { type: 'number', value: '22', child: [] },
             { type: 'number', value: '33', child: [] } 
            ] 
        }
        ```

        일단은, 전체적으로 생각하기 보다는 (type 에 대한 고려부터 시작하고 있었음, 그러나 4번에 있어서 일단 arrayParser 에 맞게 배열만 생각) form 에 대한 생각부터 수정

        ​