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

    // 0-1. variable 출력 테스트
    // 결과 : {"type":"array","child":[]}
    console.log(JSON.stringify(resultObject));
    

    // 1. String 찢기
    for (let i=0; i<strDataLength; i++) {
        dividedCharacterDatas.push(str[i]);
     }

     // 1-1. type check
     // 입력받은 데이터(str)의 맨 앞,뒤 문자를 구분하여
     // type을 결정합니다
     let firstCharacter = str[0];
     let lastCharacter = str[strDataLength-1];

    //  resultObject.type = checkType(firstCharacter, lastCharacter);
     resultObject.type = checkType(str);

    // // 2. 데이터 갯수만큼 반복
    // for (let i=0; i<strDataLength; i++) {
        
    //     // 3. 배열에 넣을(resultObject.child) 임시 객체 생성
    //     // 저번시간에 배운 call Method 를 통한 함수재사용에 대한 내용을
    //     // 적용해볼 수 있으면 적용해야겠다고 생각이 듬
    //     // 데이터만 넣으면 객체가 반환되도록
    //     let tempObject = new Object();

    //     // 4. ',' 문자가 나올때 데이터를 만들면 됨
    //     // 공백을 주의할 것 (공백은 그대로 넘기는 식으로)
    //     if (data === ',') {
    //         // resultObject.child 에 추가 (배열에 객체를 추가)
    //     }
    // }

    let mergeData = "";

    dividedCharacterDatas.forEach(element => {
        if (element === ',') {

            // child 는 아직 어떻게 처리해야할 지 모르겠다
            // 일단 보류..
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
    // if (data1 == '[' && data2 == ']') {
    //     return 'array';
    // }

    // 해당 함수를 재활용 할 수 있도록 재구성 해야할 필요를 느낌

    // console.log(String.includes.call(str, "["));
    if (str.includes("[") && str.includes("]")) {
        return 'array';
    }

    // const onlyNumberRegex = '/[^0-9]/g';

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

// var str = "[1,2]"; 
// 문자열 str을 한글자씩 탐색하면서 '[' , ']' 를 출력해보기 (반복문을 사용한다) 
// 또는 숫자형태의 문자만(1,2) 출력해보기
function tempToken() {
  const str = "[1,2]";
  
  console.log(" 문자형태 출력");
  
  // 문자형태 출력
  for (let i=0; i<str.length; i++) {
      if (str[i] > '0' && str[i] < '9') {
          continue;
      } else {
          console.log(str[i]);
      }
  }

  console.log(" 숫자형태 출력");

  // 숫자형태 출력
  for (let i=0; i<str.length; i++) {
      if (str[i] > '0' && str[i] < '9') {
          console.log(str[i]);
      }
  }

  // JSON.stringify 테스트
  console.log(JSON.stringify('[]'));    // "[]"
  console.log(JSON.stringify([]));      // []
  console.log(JSON.stringify({}));      // {}
}

tempToken();
run();