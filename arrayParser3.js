/* 
  ArrayParser3 무한 중첩 분석
  무한중첩 구조도 동작하게 한다. [[[[[]]]]]
  배열의 원소에는 숫자타입만 존재한다.
  복잡한 세부로직은 함수로 분리해본다.
  중복된 코드역시 함수로 분리해서 일반화한다.
  프로그래밍 설계를 같이 PR한다.
  hint : 중첩문제를 풀기 위해 stack구조를 활용해서 구현할 수도 있다.

  Class
  ArrayParser : 배열을 분석하는 Class
    0. constuctor : 비어 있음
    1. parse : 메인 함수
      a. 입력된 string값을 배열의 '['와']'의 개수가 일치하는지 체크하고 불일치하면 error리턴
      b. string을 array로 만들어주고 reduce함수를 이용하여 array안의 모든 원소를 분석
      c. 분석은 array형식일 떄와 number형식일 떄로 나누어 처리한다
      d. 분석이 끝난 후 reduce가 리턴한 값을 최종적으로 리턴한다
    2. processArray : array타입의 값을 객체로 만들어 반환하는 함수,
      하위 값이 array타입일 경우 parse함수를 재귀적으로 호출한다
    3. processNubmer : number타입의 값을 객체로 만들어 반환하는 함수
    4. changeToArrayStructure : string타입 값을 array로 만들어 반환하는 함수

  FiddleString : 문자 분석을 담당하는 Class
    0. constructor : 비어 있음
    1. isEmpty : 입력값이 비어있으면 1(true)를 반환
    2. isArray : 입력된 string값이 array의 형태이면 1(true)를 반환
    3. isPairBracket : '['와']'가 쌍을 이루고 있는지, 최소 1개의 괄호는 있는지 체크
    4. removeBracket : 맨왼쪽의 '[' 와 맨 오른쪽의 ']' 를 제거
  
  Process
    1. 입력값을 받으면 입력된 string타입의 값을 array타입으로 변환시킨다
    2. 변환된 array를 분석한다 (분석은 array값인지, number값인지를 분석)
      a.array값이면 array를 처리하는 함수를 사용해 객체화 시키고 최종 배열에 push한다
      단, 하위값이 또 다시 배열이면 parse를 재귀로 호출하여 하위값에 배열이 없을 때까지 계속한다
      b. number값이면 number값을 처리하는 함수를 사용해 객체화 시키고 최종 배열에 push한다
    3. 2의 과정이 모두 끝나면 최종 배열을 리턴한다

*/
const str = "[[123, [1,[1,2,3],2], 2], 1, 2]";

const ERROR_MESSAGE = {
  NON_PAIR: '배열의 괄호 개수 오류'
}
class CreateObject {
  constructor(context) {
    this.context = context;
  }
  objective(value) {
    let type = FiddleString.isArray(value);
    return type ? {
      type: 'array',
      value: 'ArrayObject',
      child: this.context.parse(value)
    } : {
      type: 'number',
      value: value,
      child: []
    }
  }
}
class ArrayParser {
  constructor() {
    this.generateObject = new CreateObject(this);
  }

  parse(str) {
    if (!FiddleString.isArray(str)) return ERROR_MESSAGE.NON_PAIR;
    let arrayed = this.changeToArrayStructure(str);
    let fixedArray = arrayed.reduce((ac, cv) => {
      ac.push(this.generateObject.objective(cv));
      return ac;
    }, []);
    return fixedArray;
  }

  changeToArrayStructure(str) {
    str = FiddleString.removeBracket(str);
    const obj = {
      checkedArr: [],
      normalString: '',
      arrayString: '',
      count: 0
    };
    for (let i = 0; i < str.length; i++) {
      if (FiddleString.isEmpty(str[i])) continue;
      if (str[i] === '[') obj.count++;
      if (str[i] === ']') {
        obj.count--;
        this.pushArrayString.call(obj, str[i]);
      }
      this.pushNormalString.call(obj, str[i]);
      this.addStringByCount.call(obj, str[i]);
    }
    this.pushLastString.call(obj);
    return obj.checkedArr;
  }

  pushLastString() {
    this.checkedArr.push(this.normalString);
  }
  addStringByCount(currentValue) {
    if (this.count) {
      this.arrayString += currentValue;
    } else {
      if (isNaN(currentValue)) return;
      this.normalString += currentValue;
    }
  }

  pushArrayString(currentValue) {
    if (this.count === 0) {
      this.checkedArr.push(this.arrayString + currentValue);
      this.arrayString = '';
    }
  }

  pushNormalString(currentValue) {
    if (this.count === 0 && currentValue === ',' && this.normalString !== '') {
      this.checkedArr.push(this.normalString);
      this.normalString = '';
    }
  }
}




const FiddleString = {

  isEmpty(str) {
    if (str === ' ') return 1;
  },

  isArray(str) {
    if (!this.isPairBracket(str)) return undefined;
    return 1;
  },

  isPairBracket(str) {
    let minimumBracket = false;
    let count = str.split('').reduce((ac, cv) => {
      if (cv === '[') {
        ac += 1;
        minimumBracket = true;
      }
      if (cv === ']') ac -= 1;
      return ac;
    }, 0);
    if (!minimumBracket) return undefined;
    return count ? undefined : 1;
  },

  removeBracket(str) {
    return str.substring(1, str.length - 1);
  }
}
const ap = new ArrayParser();
const result = ap.parse(str);
console.log(JSON.stringify(result, null, 2));