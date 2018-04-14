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
        if(this.targetValue !== expectValue) throw Error(`: FAIL  targetValue is ${this.targetValue}, expectValue is ${expectValue}`)
        console.log(`: OK  target Value : ${this.targetValue} expectedValue : ${expectValue}`)
    }
}


const expect = function(targetValue){
    return new Expect(targetValue)
}

const describe = (testParagraph, fn)=>{
    console.log(testParagraph, "\t")
    fn();
}

expect(3).toBe(3)

module.exports = Object.freeze({
    test,
    expect,
    equal,
    describe
 });