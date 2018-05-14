/* Design
  ArrayParser4 여러가지 타입 분석

  요구사항
  숫자타입이외에 string, boolean, null 타입도 지원하도록 구현한다.
  ['1a3',[null,false,['11',[112233],112],55, '99'],33, true]"
  올바른 문자열이 아닌 경우 오류를 발생한다.
  
  ArrayParser : 배열을 분석하는 Class
    [0] constuctor
      - generateObject : 객체 생성을 담당하는 GenerateObject의 인스턴스를 담는 변수
      - parsedData : parsing하는데 필요한 변수들을 담는 객체
      - initalizeData : parsedData를 초기화
      - errorMessage : 에러가 발생하면 에러메세지를 담아두는 변수
    [1] initializeParsedData
      : parsing에 필요한 데이터들을 초기화하는 함수
      - checkedArr : 최종적으로 return할 배열을 담아두는 배열 변수
      - arrayString : arrayCount가 1이상일 때 즉 array문자열 안에를 읽고 있을 때,
      임시적으로 담아둘 문자열 변수
      - arrayCount : '['이 나오면 1을 증가시키고 ']'를 만나면 1을 감소시킨다
      0이 되는 순간, 즉 array 한 개가 완성되는 순간을 알기 위해 있는 변수
      
    [2] parse
    들어온 문자열을 배열화시키고 원소들은 타입별로 객체로 매핑한 후 리턴하는 함수

    Flow
      1. 문자열의 제일 오른쪽에 '[', 제일 왼쪽에 ']'가 있는지를 체크하고 이것에 불일치한다면
      errorMessage를 저장한다
      2. errorMessage변수에 값이 들어와 있다면 에러메세지를 리턴한다
      3. 문자열을 크게 array타입과 나머지 타입으로 구분하여 배열화해서 arrayed변수에 담는다
      4. 배열화가 끝나면 parsedData는 초기화한다
      5. arrayed변수에 담긴 원소들을 reduce를 사용하여 타입별로 객체화하여 fixedArray(최종값)에 담는다
      6. 객체화가 마무리된 fixedArray를 리턴한다
    
    [3] changeToArrayStructure(parsedData, str)
    문자열을 배열화해서 리턴한다

    Flow
      1. 입력받은 문자열의 양쪽의 Bracket을 제거한다
      2. for문으로 문자열 분석
        a. 빈 문자열이 나오면 건너뛴다 (continue)
        b. addString함수를 이용해 ','를 기준으로 문자열을 덩어리로 나누고 나눠진 것들을 checkedArr에 추가한다
      3. 문자열 분석이 완료되면 분석된 문자열이 추가된 checkedArr를 리턴한다

    [4] addString(str, idx)
    문자열을 ','를 기준으로 나누고 나눠진 문자열덩어리에 오류가 있는지 체크하고
    오류가 나온다면 분석을 멈추고 에러메세지를 담은 후 리턴한다
    
    variable
      -lengthBeforeMeetComma : 다음 ','까지의 길이
      - chunked : ','전까지 문자열을 파싱하며 임시로 담아줄 변수
    Flow
      1. for문 안에서 호출되기 때문에 전체 문자열과 인덱스를 매개변수로 받는다
      2. lengthBeforeMeetComma 전까지만 반복문을 사용하도록 해서 분석한다
      3. lengthBeforeMeetComma === -1인 경우, 즉 문자열의 끝일 경우는 문자열 끝까지 chunked에 담는다
      4. for문
        a. '['문자열이 들어온 경우 arrayCount를 증가시켜 지금은 배열 안의 문자열을 분석하고 있음을 알린다
        arrayCount가 1이상일 때만 arrayString에 따로 담아주기 위함
        b. ']'문자열이 들어온 경우는 arrayCount를 감소시킨다
        arrayCount가 0이 되는 경우, 즉 배열이 끝나는 경우 그동안 arrayString에 저장된 문자열을 checkedArr에 push한다
      5. for문이 끝나 한 덩어리가 된 chunked문자열에 오류가 있는지 체크한 후 있다면 에러를 리턴한다
      6. arrayCount > 0 이면 arrayString에 문자열을 추가하고 arrayCount가 0이면 checkedArr에 push한다
    
    [5] addStringByArrayCount(chunkedString)
    문자열을 arrayCount값에 따라서 추가하는 함수
    
    Flow
      1. arrayCount > 0 이면 arrayString에 문자열을 추가하고 arrayCount가 0이면 checkedArr에 push한다

    [6] isErrorInString(context, chunkedString)
    문자열이 올바른 문자열인지 체크하고 에러가 있으면 1을 리턴하는 함수

    Flow
      1. checkPairQuote를 이용해 '의 개수가 올바르지 않을 때 errorMessage변수에
      에러메세지 전달
      2. checkWrongType 이용해 1d3과 같은 틀린 문자열이 잇으면 errorMessage변수에
      에러메시지 전달
      3. 에러가 검출되어서 errorMessage에 한 개라도 메세지가 추가된다면 1을 리턴한다
  
*/

const ERROR_MESSAGE = {
  NON_PAIR() {
    return `배열의 괄호 개수 오류`
  },
  UNKNOWN_TYPE(str) {
    return `${str}은 알 수 없는 타입입니다`
  },
  NOT_PAIR_QUOTE(str) {
    return `${str}은 올바른 문자열이 아닙니다`
  }
}
class GenerateObject {
  constructor(context) {
    this.context = context;
  }
  getObjectBytype(value) {
    let type = FiddleString.getType(this, value);
    let finalObject = (type === 'array') ? {
      type: type,
      value: 'ArrayObject',
      child: this.context.parse(value)
    } : {
      type: type,
      value: value,
      child: []
    }
    return finalObject;
  }
}
class ArrayParser {
  constructor() {
    this.generateObject = new GenerateObject(this);
    this.parsedData = null;
    this.initializeParsedData();
    this.errorMessage = null;
  }
  initializeParsedData() {
    this.parsedData = {
      checkedArr: [],
      arrayString: '',
      arrayCount: null,
    };
  }
  parse(str) {
    if (!FiddleString.isArray(this, str)) return this.errorMessage;
    let arrayed = this.changeToArrayStructure(str);
    if (this.errorMessage) return this.errorMessage;
    this.initializeParsedData();
    let fixedArray = arrayed.reduce((ac, cv) => {
      ac.push(this.generateObject.getObjectBytype(cv));
      return ac;
    }, []);
    return fixedArray;
  }

  changeToArrayStructure(str) {
    str = FiddleString.removeBracket(str);
    const splited = str.split('');
    let nextComma = 0;
    splited.forEach((v, i, a) => {
      if (nextComma === -1) return;
      if (this.errorMessage) return;
      this.addString(str, nextComma + i);
      if (str.substr(nextComma + i).search(',') === -1) nextComma = -1;
      else nextComma += str.substr(nextComma + i).search(',');
    })
    return this.parsedData.checkedArr;
  }

  addString(str, idx) {
    let lengthBeforeMeetComma = str.substr(idx).search(',');
    let chunked = '';
    let isArrayFlag = false;
    if (lengthBeforeMeetComma === -1) chunked = str.substr(idx);
    for (let i = idx; i < idx + lengthBeforeMeetComma; i++) {
      if (FiddleString.isEmpty(str[i])) continue;
      if (str[i] === '[') {
        this.parsedData.arrayCount++;
        isArrayFlag = !isArrayFlag;
      }
      if (str[i] === ']') {
        this.parsedData.arrayCount--;
        FiddleString.checkWrongType(this, chunked);
        this.pushStringByCount(this.parsedData.arrayString + chunked + str[i]);
      }
      chunked += str[i];
    }
    if (this.isErrorInString(this, chunked)) return;
    this.addStringByArrayCount(chunked);
  }
  pushStringByCount(str) {
    if (!this.parsedData.arrayCount) this.parsedData.checkedArr.push(str);
  }

  addStringByArrayCount(chunkedString) {
    if (this.parsedData.arrayCount) {
      this.parsedData.arrayString += chunkedString + ',';
    } else {
      this.parsedData.checkedArr.push(chunkedString);
    }
  }

  isErrorInString(context, chunkedString) {
    FiddleString.checkPairQuote(context, chunkedString);
    FiddleString.checkWrongType(context, chunkedString);
    return this.errorMessage ? 1 : 0;
  }

}

const FiddleString = {
  getType(context, str) {
    if (['null', 'true', 'false'].indexOf(str) > -1) return str;
    if (this.isArray(context, str)) return 'array';
    if (this.isNumber(str)) return 'number';
    else return 'string';

  },
  isNumber(str) {
    return !isNaN(+str) ? 1 : undefined;
  },

  checkWrongType(context, str) {
    str = removeSideBracket(str);
    if (str.match(/[0-9]\D|\D[0-9]/)) {
      context.errorMessage = ERROR_MESSAGE.UNKNOWN_TYPE(str);
      return 0;
    };
    return 1;
  },
  checkPairQuote(context, str) {
    str = removeSideBracket(str);
    let countQuote = (str.match(/\'/g) || []).length;
    if (countQuote === 0 || countQuote === 2) {
      return 1;
    } else {
      context.errorMessage = ERROR_MESSAGE.NOT_PAIR_QUOTE(str);
      return 0;
    }
  },
  isEmpty(str) {
    if (str === ' ') return 1;
  },

  isArray(context, str) {
    if (!this.isPairBracket(context, str)) return undefined;
    return 1;
  },

  isPairBracket(context, str) {
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
    if (!arrayCount) {
      return 1;
    } else {
      context.errorMessage = ERROR_MESSAGE.NON_PAIR();
      return 0;
    }
  },

  removeBracket(str) {
    return str.substring(1, str.length - 1);
  }
}

function removeSideBracket(str) {
  str = str.replace(/\[|\]/g, '');
  return str;
}
const str = "['wef',['sd',null,true,'a', [1,[1,32,3],12], 2],false, 1,2]";

const ap = new ArrayParser();
const result = ap.parse(str);
console.log(JSON.stringify(result, null, 2));