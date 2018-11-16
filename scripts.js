"use strict";

class Parser{
  constructor(){
    _root.set(this, []);
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
          type =  this.checkType(value);
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

const _root = new WeakMap();
const str = "[123,[22,23,[11,[112233],112],55],33]";
const ArrayParser = (str) => new Parser().processData(str);
const result = ArrayParser(str);
console.log(JSON.stringify(result, replacer, 2));
