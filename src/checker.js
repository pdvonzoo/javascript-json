exports.ErrorMessage = class ErrorMessage {
  NON_PAIR(bracket) {
    return `배열의 ${bracket} 개수 오류`
  }
  UNKNOWN_TYPE(str) {
    return `${str}은 알 수 없는 타입입니다`
  }
  NOT_PAIR_QUOTE(str) {
    return `${str}은 올바른 문자열이 아닙니다`
  }
}
class Syntax {
  constructor(errorMessage) {
    this.ERROR_MESSAGE = errorMessage;
    this.errorMessage = null;
  }
  checkError(targetString, key) {
    if (this.isString(targetString)) this.checkPairQuote(targetString);
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
    const countQuote = (str.match(/\'/g) || []).length;
    if (countQuote === 0 || countQuote === 2) {
      return 1;
    } else {
      this.errorMessage = this.ERROR_MESSAGE.NOT_PAIR_QUOTE(str);
    }
  }
  isNumber(str) {
    if (str === '') return;
    if (!isNaN(+str)) return 1;
  }
  isString(str) {
    if (str[0] === "'" && str[str.length - 1] === "'") return 1;
  }
  isEmpty(str) {
    if (str === ' ') return 1;
  }

  isArray(str) {
    if (str[0] === '[' && str[str.length - 1] === ']') return 1;
  }
  isObject(str) {
    if (str[0] === '{' && str[str.length - 1] === '}') return 1;
  }

  isPairBracket(str) {
    if (!str) return;
    let minimumBracket = false;
    const arrayCount = str.split('').reduce((ac, cv) => {
      if (cv === '[') {
        ac.square += 1;
        minimumBracket = true;
      } else if (cv === ']') {
        ac.square -= 1;
      } else if (cv === '{') {
        ac.brace += 1;
        minimumBracket = true
      } else if (cv === '}') {
        ac.brace -= 1;
      }
      return ac;
    }, {
      square: 0,
      brace: 0
    });
    if (!minimumBracket) return;
    if (!arrayCount.brace && !arrayCount.square) return 1;
    else if (arrayCount.square) this.errorMessage = this.ERROR_MESSAGE.NON_PAIR('대괄호');
    else if (arrayCount.brace) this.errorMessage = this.ERROR_MESSAGE.NON_PAIR('중괄호');
  }
  removeLastComma(str) {
    const removed = (str[str.length - 1] === ',') ? str.substr(0, str.length - 1) : str;
    return removed;
  }
  removeLastEqual(str) {
    const removed = (str[str.length - 1] === ':') ? str.substr(0, str.length - 1) : str;
    return removed
  }
  removeBracket(str) {
    const removed = str.substring(1, str.length - 1);
    return removed;
  }
  removeSideBracket(str) {
    const removed = str.replace(/\[|\]/g, '');
    return removed;
  }
  removeSideQuote(str) {
    let removed = str.replace(/^\'|\'$/g, '')
    return removed;
  }
}
exports.Syntax = Syntax;