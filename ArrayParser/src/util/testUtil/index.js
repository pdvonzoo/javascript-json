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
        const targetValue = this.targetValue
        if(targetValue!== expectValue) throw Error(`: FAIL  targetValue is ${targetValue}, expectValue is ${expectValue}`)
        return msg===true ? console.log(`: OK  targetValue : ${targetValue} expectedValue : ${expectValue}`) : true;
    }
    toEqual(expectedValue, msg = true){
        const {targetValue, checkEqualArrayValue, checkEqualObjValue, toBe}= this;
        if(typeChecks.isArray(targetValue)) return  checkEqualArrayValue(targetValue, expectedValue);
        if(typeChecks.isObject(targetValue)) return checkEqualObjValue(targetValue, expectedValue, checkEqualArrayValue);
        return toBe(targetValue, expectedValue);
    }
    checkEqualArrayValue(targetValue, expectedValue, msg=false){
        console.log(msg)
        const result = targetValue.every((v,i)=> new Expect(v).toBe(expectedValue[i], false))
        if(result) console.log(`OK: ${targetValue} is Equal ${expectedValue}`)
    }

    checkEqualObjValue(targetValue, expectedValue, checkEqualArrayValue){
        const targetKeys = Object.keys(targetValue)
        const targetValues = Object.values(targetValue)
        const expectKeys = Object.keys(expectedValue)
        const expectValues = Object.values(expectedValue)
        checkEqualArrayValue(targetKeys, expectKeys,'key값 비교')
        checkEqualArrayValue(targetValues, expectValues, 'value값 비교')
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
    describe
 });