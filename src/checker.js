class Syntax {
  constructor() {
    this.ERROR_MESSAGE = {
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
    this.errorMessage = null;
  }

  isNumber(str) {
    return !isNaN(+str) ? 1 : undefined;
  }

  checkError(targetString) {
    this.checkWrongType(targetString);
    this.checkWrongType(targetString);
    if (this.errorMessage) throw this.errorMessage;
  }
  checkWrongType(targetString) {
    targetString = this.removeSideBracket(targetString);
    if (targetString.match(/[0-9]\D|\D[0-9]/)) {
      this.errorMessage = this.ERROR_MESSAGE.UNKNOWN_TYPE(targetString);
      return 0;
    };
    return 1;
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

  isEmpty(str) {
    if (str === ' ') return 1;
  }

  isArray(str) {
    if (str[0] !== '[' || str[str.length - 1] !== ']') return;
    if (this.isPairBracket('square', str)) return 1;
  }
  isObject(str) {
    if (str[0] !== '{' || str[str.length - 1] !== '}') return;
    if (this.isPairBracket('brace', str)) return 1;
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
const st = new Syntax();
exports.Syntax = Syntax;