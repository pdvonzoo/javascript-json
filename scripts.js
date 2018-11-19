const dataType = require('./dataType.js');

"use strict";

const _root = new WeakMap();
class Parser{
  constructor(dataType){
    _root.set(this, []);
    this.dataType = dataType;
  }
  processData(data){
    let target = 0, value, child, parent, curr = _root.get(this);
    for(let v of data){
      target++;
      if(v === '[' || v === ']' || v === ','){
        value = this.getvalue(data, target);
        if(value === undefined) break;
        [curr, child, parent] = this.setValue(value, curr, child, parent, v);
      }
    }
    return _root.get(this);
  }
  getvalue(data, target){
    const openingBracket = data.indexOf('[', target),
          closingBracket = data.indexOf(']', target),
          rest = data.indexOf(',', target),
          compareValues = [openingBracket, closingBracket, rest];
    
    const stopPoint = compareValues.reduce((acc, curr) => {
      if(curr === -1) return acc;
      if(acc === -1 || acc > curr) return curr;
      return acc;
    })    
    if(stopPoint === -1) return;
    return data.substring(target, stopPoint);
  }
  setValue(value, curr, child, parent, input){
    const trimValue = this.trimData(value),
          type =  this.dataType.check(trimValue);
    if(input  === '['){
      curr.push({ type: 'array', child: [], parent: parent, });
      child = curr.slice(-1)[0].child;
      parent = curr;
    }
    if(input  === ']'){
      child = curr.slice(-1)[0].parent;
      parent = child.slice(-1)[0].parent;
    }
    if(trimValue !== '') {
      child.push({ value: trimValue, type,  child: [], parent: parent, });
    }
    if(input  === '[' || input  === ']') curr = child;
    return [curr, child, parent];
  }
  trimData(data){
    return  data.split("")
                .map(v => v.trim())
                .filter(v => v !== "")
                .join("");
  }
}

function replacer(key, value){
  if (key === "parent") return;
  return value;
}

const str = "['1a3',[null,false,['11',[112233],112],55, '99'],33, true]";
const ArrayParser = (str) => new Parser(dataType).processData(str);
const result = ArrayParser(str);
console.log(JSON.stringify(result, replacer, 2));
