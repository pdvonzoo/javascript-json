/* 
    요구사항
    1. ArrayParser 함수
    
    2. 배열안에는 숫자데이터만 존재
    
    3. 배열형태의 문자열을 token 단위로 해석
       이를 분석한 자료구조를 만든다
    
    4. 정규표현식 사용은 최소한으로 한다 (token 타입체크에 한해 사용가능)
*/

function arrayParser(str) {

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
  }

  tempToken();