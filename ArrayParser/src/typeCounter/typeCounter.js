const typeCheck = require('../util/typeCheck');
const {IdentityObject,IdentityObjObject} = require('../IdentityObject/IdentityObject')

class TypeCounter {
    constructor(){
        this.type = {}
    }
    addCount(TYPE){
        if(!this.type[TYPE]) this.type[TYPE] = 0
        this.type[TYPE]+=1
    }
}

const isIdObj = target => target.constructor!==IdentityObject && target.constructor!==IdentityObjObject

const totalcounter = function(target){
    if(isIdObj(target)) throw Error('잘못된 값을 입력하였습니다 ')
    const typeCounter = new TypeCounter()
    const counter = function(target){
        typeCounter.addCount(target.type)
        if(target.type==='array') target.child.forEach(v=> counter(v))
        if(target.type==='object') counter(target.value)
    }
    counter(target);
    return typeCounter;
}

module.exports = totalcounter;