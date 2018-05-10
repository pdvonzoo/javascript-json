/* Design
  ArrayParser4 여러가지 타입 분석

  요구사항
  숫자타입이외에 string, boolean, null 타입도 지원하도록 구현한다.
  ['1a3',[null,false,['11',[112233],112],55, '99'],33, true]"
  올바른 문자열이 아닌 경우 오류를 발생한다.
  타입체크를 정규표현식을 사용하는 경우, backreference를 활용하는 것을 추천.
  복잡한 세부로직은 함수로 분리해본다.
  중복된 코드역시 함수로 분리해서 일반화한다.

  1. Class
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

  CreatObject : type에 맞는 object값을 반환하는 일을 하는 Class

  2. Object
  FiddleString : 문자 분석을 담당하는 Class
    0. constructor : 비어 있음
    1. isEmpty : 입력값이 비어있으면 1(true)를 반환
    2. isArray : 입력된 string값이 array의 형태이면 1(true)를 반환
    3. isPairBracket : '['와']'가 쌍을 이루고 있는지, 최소 1개의 괄호는 있는지 체크
    4. removeBracket : 맨왼쪽의 '[' 와 맨 오른쪽의 ']' 를 제거
  
  3. Process
    1. 입력값을 받으면 입력된 string타입의 값을 array타입으로 변환시킨다
    
*/

const ERROR_MESSAGE = {
  NON_PAIR: '배열의 괄호 개수 오류'
}
class CreateObject {
  constructor(context) {
    this.context = context;
  }
  getObjectBytype(value) {
    let type = FiddleString.getType(value);
    return type === 'array' ? {
      type: type,
      value: 'ArrayObject',
      child: this.context.parse(value)
    } : {
      type: type,
      value: value,
      child: []
    }
  }
}
class ArrayParser {
  constructor() {
    this.generateObject = new CreateObject(this);
    this.initializeData();
  }
  initializeData() {
    this.parsedData = {
      checkedArr: [],
      arrayString: '',
      letterString: '',
      arrayCount: 0,
    };
  }
  parse(str) {
    if (!FiddleString.isArray(str)) return ERROR_MESSAGE.NON_PAIR;
    let arrayed = this.changeToArrayStructure(this.parsedData, str);
    this.initializeData();
    let fixedArray = arrayed.reduce((ac, cv) => {
      ac.push(this.generateObject.getObjectBytype(cv));
      return ac;
    }, []);
    return fixedArray;
  }

  changeToArrayStructure(parsedData, str) {
    str = FiddleString.removeBracket(str);

    for (let i = 0; i < str.length; i++) {
      if (FiddleString.isEmpty(str[i])) continue;
      this.addStringByCount(this.parsedData, str, i);
      let beforeComma = str.substr(i).search(',');
      if (beforeComma === -1) break;
      i += beforeComma;
    }
    return parsedData.checkedArr;
  }

  pushLastString(parsedData) {
    parsedData.checkedArr.push(this.normalString);
  }
  addStringByCount(parsedData, str, idx) {
    let currentValue = str[idx];
    let lengthBeforeMeetComma = str.substr(idx).search(',');
    let beforeMeetComma = '';
    if (lengthBeforeMeetComma === -1) beforeMeetComma = str.substr(idx);
    for (let i = idx; i < idx + lengthBeforeMeetComma; i++) {
      if (str[i] === '[') parsedData.arrayCount++;
      if (str[i] === ']') {
        parsedData.arrayCount--;
        if (!parsedData.arrayCount) {
          parsedData.checkedArr.push(parsedData.arrayString + beforeMeetComma + str[i]);
          return;
        };
      }
      beforeMeetComma += str[i];
    }
    this.checkWrongType(beforeMeetComma);
    if (parsedData.arrayCount) {
      parsedData.arrayString += beforeMeetComma + ',';
    } else {
      // if (isNaN(currentValue)) return;
      parsedData.checkedArr.push(beforeMeetComma);
    }
    if (lengthBeforeMeetComma === -1) lengthBeforeMeetComma = str.length;
    let trimmed = beforeMeetComma.trim();

  }

  checkWrongType(str) {
    str = removeSideBracket(str);
    if (str.match(/[0-9]\D|\D[0-9]/)) throw `${str}은 알 수 없는 타입입니다`;
  }
  pushArrayString(parsedData, currentValue) {
    if (parsedData.arrayCount === 0) {
      parsedData.checkedArr.push(parsedData.arrayString + currentValue);
      parsedData.arrayString = '';
    }
  }

  pushNormalString(parsedData, currentValue) {
    if (parsedData.arrayCount === 0 && currentValue === ',' && parsedData.normalString !== '') {
      parsedData.checkedArr.push(parsedData.normalString);
      parsedData.normalString = '';
    }
  }
}

const FiddleString = {

  getType(str) {
    if (str === 'null') return 'null';
    if (str === 'true') return 'true';
    if (str === 'false') return 'false';
    if (this.isArray(str)) return 'array';
    if (this.isNumber(str)) return 'number';
    else return 'string';

  },
  isNumber(str) {
    return !isNaN(+str) ? 1 : undefined;
  },
  isString(str) {
    return str.match(/\D/) ? 1 : undefined;
  },
  isEmpty(str) {
    if (str === ' ') return 1;
  },

  isArray(str) {
    if (!this.isPairBracket(str)) return undefined;
    return 1;
  },

  isPairBracket(str) {
    if (!str) return;
    let minimumBracket = false;
    let arrayCount = str.split('').reduce((ac, cv) => {
      if (cv === '[') {
        ac += 1;
        minimumBracket = true;
      }
      if (cv === ']') ac -= 1;
      return ac;
    }, 0);
    if (!minimumBracket) return undefined;
    return arrayCount ? undefined : 1;
  },

  removeBracket(str) {
    return str.substring(1, str.length - 1);
  }
}

function removeSideBracket(str) {
  str = str.replace(/\[|\]/g, '');
  return str;
}
const str = "['wef',[13,null,true,'a', [1,[1,2,3],2], 2],false, 1,2]";

const ap = new ArrayParser();
const result = ap.parse(str);
console.log(JSON.stringify(result, null, 2));

console.log(FiddleString.getType('1d2'));