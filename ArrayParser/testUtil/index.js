const {_each} = require('../functionalUtil')
const typeChecks = require('../typeCheck')


const equal = (a,b, msg = true)=> {
    if(a!== b) throw Error(`: FAIL  targetValue is ${a}, expectValue is ${b}`)
    if(msg) console.log(`: OK  target Value : ${a} expectedValue : ${b}`)
    return true;
}

const isArrayOrObject = input => typeChecks.isArray(input) || typeChecks.isObject(input)

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
        if(typeChecks.isArray(this.targetValue)) return  this.toBeArrayValue(expectValue)
        if(typeChecks.isObject(this.targetValue)) return this.toBeObjectValue(expectValue)
        equal(this.targetValue, expectValue)
    }
    toBeArrayValue(expectValue, targetValue= this.targetValue, msg = true){
        debugger;
        const result = targetValue.every((v, i)=> {
            return equal(v, expectValue[i], false)
        })
        console.log(`${msg}`)
        if(result && msg) console.log(`실행 값 ${targetValue} 예상 결과 값과 ${expectValue} 같습니다`)
    }
    toBeObjectValue(expectedValue){
        const targetKeys = Object.keys(this.targetValue)
        const targetValues = Object.values(this.targetValue)
        const expectKeys = Object.keys(expectedValue)
        const expectValues = Object.values(expectedValue)
        this.toBeArrayValue(expectKeys, targetKeys, 'key값 비교')
        this.toBeArrayValue(expectValues, targetValues, 'value값 비교')
    }
}

const expect = function(targetValue){
    return new Expect(targetValue)
}

const describe = (testParagraph, fn)=>{
    console.log(testParagraph, "\t")
    fn();
}

// expect(3).toBe(3)
// expect([1,2,3]).toBe([1,2,3])
// expect({'a':'b'}).toBe({'a':'b'})


module.exports = Object.freeze({
    test,
    expect,
    equal,
    describe
 });