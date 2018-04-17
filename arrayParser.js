/* 
    요구사항
    1. ArrayParser 함수
    
    2. 배열안에는 숫자데이터만 존재
    
    3. 배열형태의 문자열을 token 단위로 해석
       이를 분석한 자료구조를 만든다
    
    4. 정규표현식 사용은 최소한으로 한다 (token 타입체크에 한해 사용가능)
*/

function arrayParser(str) {

    // 구현이 아닌 설계코드입니다 :)

    // 0. variable
    let resultObject = new Object();
    resultObject.type = "array";
    resultObject.child = new Array();

    // 0-1. variable 출력 테스트
    // 결과 : {"type":"array","child":[]}
    console.log(JSON.stringify(resultObject));
    

    // 1. String 찢기
    for () {

        let dividedCharacterDatas = [];
     }

    // 2. 데이터 갯수만큼 반복
    for () {
        
        // 3. 배열에 넣을(resultObject.child) 임시 객체 생성
        // 저번시간에 배운 call Method 를 통한 함수재사용에 대한 내용을
        // 적용해볼 수 있으면 적용해야겠다고 생각이 듬
        // 데이터만 넣으면 객체가 반환되도록
        let tempObject = new Object();

        // 4. ',' 문자가 나올때 데이터를 만들면 됨
        // 공백을 주의할 것 (공백은 그대로 넘기는 식으로)
        if (data === ',') {
            // resultObject.child 에 추가 (배열에 객체를 추가)
        }
    }

    // 5. return resultObject

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
arrayParser("");