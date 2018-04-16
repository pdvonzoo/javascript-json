const {_each} = require('../functionalUtil')

const equal = (a,b)=> {
    if(a!== b) throw Error(`: FAIL  targetValue is ${a}, expectValue is ${b}`)
    console.log(`: OK  target Value : ${a} expectedValue : ${b}`)
    return true;
}

const equalToNotMsg = (a,b)=>{
    if(a!== b) throw Error(`: FAIL  targetValue is ${a}, expectValue is ${b}`)
    return true;
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
        equal(this.targetValue, expectValue)
    }
    toBeArrayValue(expectValue){
        const result = this.targetValue.every((v, i)=> {
            return equalToNotMsg(v, expectValue[i])
        })
        if(result) console.log(`실행 값 ${this.targetValue} 예상 결과 값과 ${expectValue} 같습니다`)

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
expect([1,2,3]).toBeArrayValue([1,2,3])


module.exports = Object.freeze({
    test,
    expect,
    equal,
    describe
 });