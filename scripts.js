"use strict";

class Parser{
  constructor(){
    this.root = [];
  }
  processData(data){
    let target = 0, count = 1, curr = this.root, child, parent;
    for(let v of data){
      target++;
      if(v === '[' || v === ']' || v === ','){
        count = this.getcount(data, count);
        if(count === -1) break;
        [curr, child, parent] = this.setValue(data, target, count, curr, child, parent, v);
      }
    }
    return this.root;
  }
  getcount(data, count){
    let openingBracket = data.indexOf('[', count+1),
        closingBracket = data.indexOf(']', count+1),
        rest = data.indexOf(',', count+1),
        compareValues = [openingBracket, closingBracket, rest];
    
    let stopPoint = compareValues.reduce((acc, curr) => {
      if(curr === -1) return acc;
      if(acc === -1 || acc > curr) return curr;
      return acc;
    })
    return stopPoint;
  }
  setValue(data, target, count, curr, child, parent, input){
    let value = data.substring(target, count);
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
  if (key === "parent") return undefined;
  return value;
}

const parser = new Parser();
let result = parser.processData("[123,14, 56]");
console.log(JSON.stringify(result, replacer, 2)); 
