const {_each} = require('../functionalUtil')
const typeChecks = require('../typeCheck')


const equal = (a,b, msg = true)=> {
    if(a!== b) throw Error(`: FAIL  targetValue is ${a}, expectValue is ${b}`)
    if(msg===true) console.log(`: OK  targetValue : ${a} expectedValue : ${b}`)
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
    toBe(expectValue, msg=true){
        debugger;
        if(typeChecks.isArray(this.targetValue)) return  this.toBeArrayValue(this.targetValue,expectValue)
        if(typeChecks.isObject(this.targetValue)) return this.toBeObjectValue(this.targetValue,expectValue)
        equal(this.targetValue, expectValue, msg)
    }
    toBeArrayValue(targetValue,expectedValue, msg = true){
        console.log(`${msg}`)
        targetValue.forEach((v, i)=> {
            new Expect(v).toBe(expectedValue[i])
        })
        console.log(`${targetValue, expectedValue}`)
    }
    toBeObjectValue(targetValue, expectedValue){
        const targetKeys = Object.keys(targetValue)
        const targetValues = Object.values(targetValue)
        const expectKeys = Object.keys(expectedValue)
        const expectValues = Object.values(expectedValue)
        this.toBeArrayValue(targetKeys, expectKeys, 'key값 비교')
        this.toBeArrayValue(targetValues, expectValues, 'value값 비교')
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