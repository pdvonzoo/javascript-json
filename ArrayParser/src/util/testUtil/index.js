const {_each} = require('../functionalUtil')
const typeChecks = require('../typeCheck')

// jest
// expect Methods 
// ToBe  exact equality  so check same primitive type
//
// toEqual -> Object and Array recursively checks

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
    not(){
        return this.targetValue = !this.targetValue
    }
    toBe(expectValue, msg=true){
        let result =``
        const targetValue = this.targetValue
        if(targetValue!== expectValue) throw Error(`: FAIL  targetValue is ${targetValue}, expectValue is ${expectValue}`)
        if(msg) console.log(`: OK  targetValue : ${targetValue} expectedValue : ${expectValue}`)
    }
    toEqual(expectedValue, msg = true){
        const {targetValue}= this;
        if(typeChecks.isArray(targetValue)) return  this.checkEqualArrayValue(targetValue, expectedValue);
        if(typeChecks.isObject(targetValue)) return this.checkEqualObjValue(targetValue, expectedValue);
        return this.toBe(expectedValue, msg);
    }
    checkEqualArrayValue(targetValue, expectedValue, msg=false){
        if(msg) console.log(msg)
        targetValue.forEach((v,i)=> {
            new Expect(v).toEqual(expectedValue[i],false)
        })
       console.log(`OK: ${targetValue} is Equal ${expectedValue}`)
    }

    checkEqualObjValue(targetValue, expectedValue){
        debugger;
        const targetKeys = Object.keys(targetValue)
        const targetValues = Object.values(targetValue)
        const expectKeys = Object.keys(expectedValue)
        const expectValues = Object.values(expectedValue)
        this.checkEqualArrayValue(targetKeys, expectKeys,'key값 비교')
        this.checkEqualArrayValue(targetValues, expectValues, 'value값 비교')
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
    describe
 });