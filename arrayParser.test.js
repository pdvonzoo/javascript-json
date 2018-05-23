/*
    - divideString()
        - String 을 한글자씩 쪼개서 문자배열로 반환하는 메서드
        - IN : 문자열 (String)
        - OUT : 문자배열 (String[])
    - recursionCase(mergeData)
        - 재귀로 진입하는 메서드 (새로운 클래스 생성)
        - IN : mergeData (String)
        - OUT : mergeData (Object)
    - createObject()
        - 본격적인 메서드
        - Object를 만드는 메서드이다
        - recursionCase 메서드와 typeDecesion 메서드가 사용됨 (너무 메서드를 사용하는게 없는 듯 함)
        - IN : ?
        - OUT : ?
    - createCurlyObject()
        - {} 괄호를 만들 때, 사용하는 메서드인데
        - createObject랑 비슷한 부분이 많다
        - 비슷하지만 메서드로 묶기에는 너무 달라서
        - 비슷하면서도 다른 메서드 (개인적으로 아쉬운 부분)
        - IN : ?
        - OUT : ?
    - setObjectData(mode, inputData)
        - Object 일 경우, KEY-VALUE 변수에 데이터를 지정해주는 메서드
        - IN : mode ("KEY" or "VALUE"), inputData + resultObject
        - OUT : resultObject
    - typeDecision(inputData)
        - 타입을 결정해주는 메서드
    - checkCorrectString(inputData)
        - 정확한 데이터인지 확인하는 메서드
    - removeSpace(inputData)
        - 공백을 제거하는 메서드
    - removeFirstParenthesis(inputData)
        - 첫번째 괄호를 제거하는 메서드
    - checkType(params)
        - 타입을 확인하는 메서드
        - typeDecesion 메서드에서 사용된다
    - getResult()
        - 결과를 출력하는 메서드


    메서드 크기로 구분
    00
    - recursionCase(mergeData)
    - getResult()
    01
    - divideString()
    - setObjectData(mode, inputData)
    - removeSpace(inputData)
    - removeFirstParenthesis(inputData)
    02
    - createCurlyObject()
    - typeDecision(inputData)
    - checkCorrectString(inputData)
    - checkType(params)
    03
    - createObject()

    - given 어떤 상황이 들어간다
    - when 어떻게 동작한다
    - then 동작한 결과가 어떠해야 한다
*/









