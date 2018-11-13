"use strict";

class Parser{
  constructor(){
    this.root = [];
  }
  processData(data){
    let target = 0, curr = this.root, child, parent, value;
    for(let v of data){
      target++;
      if(v === '[' || v === ']' || v === ','){
        value = this.getvalue(data, target);
        if(value === undefined) break;
        [curr, child, parent] = this.setValue(value, curr, child, parent, v);
      }
    }
    return this.root;
  }
  getvalue(data, target){
    let openingBracket = data.indexOf('[', target),
        closingBracket = data.indexOf(']', target),
        rest = data.indexOf(',', target),
        compareValues = [openingBracket, closingBracket, rest];
    
    let stopPoint = compareValues.reduce((acc, curr) => {
      if(curr === -1) return acc;
      if(acc === -1 || acc > curr) return curr;
      return acc;
    })
    if(stopPoint === -1) return;
    return data.substring(target, stopPoint);
  }
  setValue(value, curr, child, parent, input){
    let trimValue = this.trimData(value);
    let type =  this.checkType(value);

    if(input  === '['){
      curr.push({ type: 'array', child: [], parent: parent, });
      child = curr.slice(-1)[0].child;
      parent = curr;
    }
    if(input  === ']'){
      parent = curr.slice(-1)[0].parent;
      child = parent;
    }
    if(trimValue !== '') child.push({ value: trimValue, type,  child: [], parent: parent, });
    if(input  === '[') curr = child;
    if(input  === ']') curr = parent;

    return [curr, child, parent];
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
  if (key === "parent") return;
  return value;
}

const parser = new Parser();
let result = parser.processData("[ 123,14, 56, 55]");
console.log(JSON.stringify(result, replacer, 2));
