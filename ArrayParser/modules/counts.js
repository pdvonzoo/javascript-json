const typeCheck = require('../typeCheck');


class TypeCounter {
    constructor(){
        this.string = 0;
        this.number = 0;
        this.boolean = 0;
        this.undefined = 0;
        this.null = 0;
        this.array = 0;
        this.object = 0;
        this.function = 0;
    }
    addCount(type){
        this[type]+=1
    }
}

const totalcounter = function(target){
    if(target.constructor!==IdentityObject) throw Error('잘못된 값을 입력하였습니다 ')
    const typeCounter = new TypeCounter()
    const counter = function(input){
        typeCounter.addCount(input.type)
        if(input.type==='array')input.child.forEach(v=> counter(v))
        if(input.type==='object') counter(input.value)
    }
    counter(target);
    return typeCounter;
}

module.exports = totalcounter;
// console.log(Totalcounter(result));