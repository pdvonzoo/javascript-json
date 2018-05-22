class ErrorMessage {
  NON_PAIR() {
    return `배열의 괄호 개수 오류`
  }
  UNKNOWN_TYPE(str) {
    return `${str}은 알 수 없는 타입입니다`
  }
  NOT_PAIR_QUOTE(str) {
    return `${str}은 올바른 문자열이 아닙니다`
  }
}
class Syntax {
  constructor() {
    this.ERROR_MESSAGE = new ErrorMessage();
    this.errorMessage = null;
  }

  checkError(targetString, key) {
    this.isMixedType(targetString);
    this.isStringAndNoQuote(targetString, key);
    if (this.errorMessage) throw this.errorMessage;
  }
  isMixedType(targetString) {
    if (targetString.match(/[0-9]\D|\D[0-9]/)) {
      this.errorMessage = this.ERROR_MESSAGE.UNKNOWN_TYPE(targetString);
      return 0;
    } else return 1;
  }
  isStringAndNoQuote(targetString, key) {
    if (key) return;
    if (targetString === 'null' || targetString === 'true' || targetString === 'false') return;
    if (!Number.isInteger(+targetString) && !this.isString(targetString)) {
      this.errorMessage = this.ERROR_MESSAGE.UNKNOWN_TYPE(targetString);
    }
  }

  checkPairQuote(str) {
    str = this.removeSideBracket(str);
    let countQuote = (str.match(/\'/g) || []).length;
    if (countQuote === 0 || countQuote === 2) {
      return 1;
    } else {
      this.errorMessage = this.ERROR_MESSAGE.NOT_PAIR_QUOTE(str);
      return 0;
    }
  }
  isNumber(str) {
    return !isNaN(+str) ? 1 : undefined;
  }
  isString(str) {
    if (str[0] === "'" && str[str.length - 1] === "'") return 1;
  }
  isEmpty(str) {
    if (str === ' ') return 1;
  }

  isArray(str) {
    if (this.isPairBracket('square', str)) return 1;
    if (str[0] !== '[' || str[str.length - 1] !== ']') return;
  }
  isObject(str) {
    if (this.isPairBracket('brace', str)) return 1;
    if (str[0] !== '{' || str[str.length - 1] !== '}') return;
  }

  isPairBracket(bracket, str) {
    if (!str) return;
    let minimumBracket = false;
    let leftBracket, rightBracket = null;
    if (bracket === 'square') {
      leftBracket = '[';
      rightBracket = ']';
    } else if (bracket === 'brace') {
      leftBracket = '{';
      rightBracket = '}';
    }
    let arrayCount = str.split('').reduce((ac, cv) => {
      if (cv === leftBracket) {
        ac += 1;
        minimumBracket = true;
      }
      if (cv === rightBracket) ac -= 1;
      return ac;
    }, 0);
    if (!minimumBracket) return undefined;
    if (!arrayCount) {
      return 1;
    } else {
      this.errorMessage = ERROR_MESSAGE.NON_PAIR();
      return 0;
    }
  }
  removeLastComma(str) {
    return (str[str.length - 1] === ',') ? str.substr(0, str.length - 1) : str;
  }
  removeLastEqual(str) {
    return (str[str.length - 1] === ':') ? str.substr(0, str.length - 1) : str;
  }
  removeBracket(str) {
    return str.substring(1, str.length - 1);
  }
  removeSideBracket(str) {
    str = str.replace(/\[|\]/g, '');
    return str;
  }
}
exports.Syntax = Syntax;
const f = new Syntax();
console.log(f.isStringAndNoQuote("1"));
console.log(Number.isInteger(+"1"));