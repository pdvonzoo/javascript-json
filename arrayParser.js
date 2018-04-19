/* 
    요구사항
    1. ArrayParser 함수
    
    2. 배열안에는 숫자데이터만 존재
    
    3. 배열형태의 문자열을 token 단위로 해석
       이를 분석한 자료구조를 만든다
    
    4. 정규표현식 사용은 최소한으로 한다 (token 타입체크에 한해 사용가능)
*/

function arrayParser(str) {

    // 0. variable
    let resultObject = new Object();
    resultObject.type = null;
    resultObject.child = new Array();

    let dividedCharacterDatas = [];

    const strDataLength = parseInt(str.length);    

    // 1. String 찢기
    for (let i=0; i<strDataLength; i++) {
        dividedCharacterDatas.push(str[i]);
     }

     // 1-1. type check
     // 입력받은 데이터(str)의 맨 앞,뒤 문자를 구분하여
     // type을 결정합니다
     let firstCharacter = str[0];
     let lastCharacter = str[strDataLength-1];
     resultObject.type = checkType(str);

    let mergeData = "";

    dividedCharacterDatas.forEach(element => {
        if (element === ',') {

            let dataObject = {
                type: checkType(mergeData),
                value: mergeData,
                child: []
            };

            resultObject.child.push(dataObject);
            mergeData = "";
        }

        mergeData += element
        
    });

    // 5. return resultObject
    return resultObject;
}

function checkType(str) {

    if (str.includes("[") && str.includes("]")) {
        return 'array';
    }

    if (parseInt(str) !== NaN) {
        return 'number';
    }
}

function createStringObject() {

}

function run() {
    var str = "[123, 22, 33]";
    var result = arrayParser(str);
    console.log(JSON.stringify(result, null, 2));
}

run();