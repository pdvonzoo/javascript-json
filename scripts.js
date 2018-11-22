const dataType = require('./dataType.js');

"use strict";

const _root = new WeakMap();
class Parser{
  constructor(dataType){
    _root.set(this, []);
    this.dataType = dataType;
    this.boundary = ['[', ']', '}', '{', ':', ','];
  }
  processData(data){
    let target = 0, value, parent, curr = _root.get(this);
    for(let v of data){
      target++;
      if(this.boundary.includes(v)){
        value = this.getvalue(data, target);
        if(value === undefined) break;
        [curr, parent] = this.setValue(value, curr, parent, v);
      }
    }
    return _root.get(this);
  }
  getvalue(data, target){
    const compareValues = this.boundary.map(v => data.indexOf(v, target));
    const stopPoint = compareValues.reduce((acc, curr) => {
      if(curr === -1) return acc;
      if(acc === -1 || acc > curr) return curr;
      return acc;
    });
    if(stopPoint === -1) return;
    return data.substring(target, stopPoint);
  }
  setValue(value, curr, parent, input){
    const trimValue = this.trimData(value),
          type =  this.dataType.check(trimValue);
    if(input === ']' || input === '}'){
      parent = parent.parent;
      curr = parent.child;
    }
    if(input  === '{' || input === '['){
      const status = this.checkObjStatus(parent, curr);
      curr.push({ status, type: (input === '[')? 'array': 'object', child: [], parent: parent, });
      parent = curr.slice(-1)[0];
      curr = curr.slice(-1)[0].child;
    }
    if(trimValue !== '') {
      const status = this.checkObjStatus(parent, curr);
      curr.push({ status, value: trimValue, type, child: [], parent: parent, });
    }
    return [curr, parent];
  }
  checkObjStatus(parent, curr){
    let status;
    if(parent && parent.type === 'object') {
        status = 'object_key';
        if(curr.slice(-1)[0] && curr.slice(-1)[0].status === 'object_key') status = 'object_value';
        if(curr.slice(-1)[0] && curr.slice(-1)[0].status === 'object_value') status = 'object_key';
    }     
    return status;
  }
  trimData(data){
    return  data.split("")
                .map(v => v.trim())
                .filter(v => v !== "")
                .join("");
  }
}

function replacer(key, value){
  return (key !== "parent")? value: undefined;
}

const str = "['1a3',[null,false,['11',[112233],{easy : ['hello', {a:'a'}, 'world']},112],55, '99'],{a:'str', b:[912,[5656,33],{key : 'innervalue', newkeys: [1,2,3,4,5]}]}, true]";
const ArrayParser = (str) => new Parser(dataType).processData(str);
const result = ArrayParser(str);
console.log(JSON.stringify(result, replacer, 2));