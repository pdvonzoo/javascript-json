const tokenizer = require('./tokenizer.js').tokenizer;
const Syntax = require('./checker.js').Syntax;
const ObjectStructure = require('./checker.js').ObjectStructure;

// class GenerateObject {
//   constructor(context) {
//     this.context = context;
//     this.objected = new ObjectStructure();
//   }

//   getObjectBytype(value) {
//     let type = this.objected.getType(value);
//     let finalObject = null;
//     switch (type) {
//       case 'array':
//         finalObject = {
//           type: type,
//           value: 'ArrayObject',
//           child: this.context.parse(value)
//         }
//         break;
//       case 'object':
//         finalObject = {
//           type: type,
//           value: 'Object',
//           child: this.context.parse(value)
//         }
//         break;
//       default:
//         finalObject = {
//           type: type,
//           value: value,
//           child: []
//         }
//         break;
//     }
//     return finalObject;
//   }
// }
class ArrayParser {
  constructor() {
    this.objectStructure = new ObjectStructure(this);
    this.parsedData = null;
    this.errorMessage = null;
    this.syntaxChecker = new Syntax();
  }

  parse(str) {

    let arrayed = tokenizer(str);
    // if (this.errorMessage) return this.errorMessage;
    let fixedArray = arrayed.reduce((ac, cv) => {
      ac.push(this.objectStructure.getObjectBytype(cv));
      return ac;
    }, []);
    // return fixedArray;
  }

  pushStringByCount(str) {
    if (!this.parsedData.arrayCount) {
      this.parsedData.finishArrayFlag = true;
      return this.parsedData.arrayString + str;
    }
    return str;
  }

  addStringByArrayCount(chunkedString) {
    if (this.parsedData.arrayCount) {
      this.parsedData.arrayString += chunkedString + ',';
    } else {
      this.parsedData.checkedArr.push(chunkedString);
    }
  }

  isErrorInString(chunkedString) {
    FiddleString.checkPairQuote(chunkedString);
    FiddleString.checkWrongType(chunkedString);
    return this.errorMessage ? 1 : 0;
  }

}

const str = "['wef',['sd',null,true,'a', [1,[1,32,3],12], 2],false, 1,2]";
const ap = new ArrayParser();
const result = ap.parse(str);
console.log(JSON.stringify(result, null, 2));