const result = require('../08_CountType/index');

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

const Totalcounter = function(target){
    const typeCounter = new TypeCounter()
    const counter = function(input){
        typeCounter.addCount(input.type)
        if(input.type==='array')input.child.forEach(v=> counter(v))
        if(input.type==='object') counter(input.value)
    }
    counter(target);
    return typeCounter;
}

console.log(Totalcounter(result));