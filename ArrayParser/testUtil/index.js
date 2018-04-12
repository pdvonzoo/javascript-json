const equal = (a,b)=> {
    if(a===b) console.log(`input ${a} 예상 Output ${b} 값이 같습니다`)
    else{ throw Error(`input ${a} 예상 Output ${b} 값이 다릅니다.`)}
}

const test = (testMsg, fn)=>{
    console.log(testMsg, "\t")
    fn();
}

class Expect {
    constructor(targetValue){
        this.targetValue = targetValue;
    }
    toBe(expectValue){
        debugger;
        if(this.targetValue === expectValue){
            return console.log(': OK')
        }
        else{
            throw Error(`: FAIL  targetValue is ${this.targetValue}, expectValue is ${expectValue}`)
        }
    }
}


const expect = function(targetValue){
    return new Expect(targetValue)
}

const describe = (testParagraph, fn)=>{
    console.log(testParagraph, "\t")
    fn();
}


module.exports = Object.freeze({
    test,
    expect,
    equal,
    describe
 });