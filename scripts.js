"use strict";

class Parser{
  constructor(){
    this.root = {
      type: 'array',
      child: [],
    };
  }
  dataProcessing(data){
    let target = 0, count = 1, curr = this.root, child;
    for(let v of data){
      target++;
      if(v === '[') {
        child = curr.child;
        child.unshift({
          type: 'array',
          child: [],
          parent: [curr]
        })
      }
      if(v === ']' && curr.parent[0] !== this.root ) { 
          child = curr.parent[0].parent[0].child;
      }

      if(v === '[' || v === ']' || v === ','){
        count = this.getcount(data, count);
        if(count === -1) break;
        child = this.setValue(data, target, count, curr, child);
        curr = child[0];
      }
    }
    return this.root;
    // console.log(this.root);
    // this.print(this.root);
  }
  getcount(data, count){
    let openingBracket = data.indexOf('[', count+1),
        closingBracket = data.indexOf(']', count+1),
        rest = data.indexOf(',', count+1),
        compareValues = [openingBracket, closingBracket, rest],
        minPoint = Math.max(...compareValues);

    compareValues.forEach(v => {
      if(v !== -1 && minPoint > v) minPoint = v;
    })

    count = minPoint;
    return count;
  }
  setValue(data, target, count, curr, child){
    let value = data.substring(target, count);
    let trimValue = this.trimData(value);
    let type =  this.checkType(value.replace(/,/g,''));
    if(trimValue !== ''){
      child.unshift({
        value: trimValue,
        type, 
        child: [],
        parent: [curr]
      })
    }
    return child;
  }
  trimData(data){
    let convert = data.split(",");
    let trimmedData = convert.map(v => v.trim()).filter(v => v !== '').join(',');
	  return trimmedData;
  }
  checkType(data){
    if(toString.call(data) === "[object Object]") return 'object';
    if(toString.call(data) === "[object Array]") return 'array';
    if(!isNaN(data)) return 'number';
    return typeof data;
  }
}

function replacer(key, value){
  if (key === "parent") {
    return undefined;
  }
  return value;
}
const parser = new Parser();
let result = parser.dataProcessing("[123,14, [42, 53, [11, 23]], 56]");
console.log(JSON.stringify(result, replacer, 2)); 

// ArrayParser함수를 만든다.
// 배열안에는 숫자데이터만 존재한다.
// 배열형태의 문자열을 token단위로 해석한 후, 이를 분석한 자료구조를 만든다.
// 정규표현식 사용은 최소한으로 한다.(token의 타입체크에 한해 사용가능)

// var str = "[123, 22, 33]";
// var result = ArrayParser(str);
// console.log(JSON.stringify(result, null, 2));   //보기좋게 출력할수도 있음.

// { type: 'array',
//   child: 
//    [ { type: 'number', value: '123', child: [] },
//      { type: 'number', value: '22', child: [] },
//      { type: 'number', value: '33', child: [] } 
//     ] 
// }

// 
// data 처리 
//   타입체크
//   특수문자 처리
// print