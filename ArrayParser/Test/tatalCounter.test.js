const {describe, test, equal, expect} = require('../testUtil')
const totalCounter = require('../modules/counts')
const sample = require('../08_CountType')
const {IdentityObject} = require('../class/IdentityObject')


describe('totalCounter 테스트', ()=>{
    test('기본 값 테스트 [1,2,3,4,5]',()=>{
        debugger;
        const targetValue = sample.sampleResult1 
        const expectedValue = {
              "string": 0,
              "number": 5,
              "boolean": 0,
              "undefined": 0,
              "null": 0,
              "array": 1,
              "object": 0,
              "function": 0
            }
        expect(totalCounter(targetValue)).toBe(expectedValue) 
    })
    test('기본 값 테스트 \"[[1,2,3],[2],{a:\'str\', b:[1,2,3]},true, undefined, false]\"',()=>{
        debugger;
        const targetValue = sample.sampleResult2 
        const expectedValue = {
            'string': 0,
            'number': 7,
            'boolean': 2,
            'undefined': 1,
            'null': 0,
            'array': 4,
            'object': 1,
            'function': 0
            }
        expect(totalCounter(targetValue)).toBe(expectedValue) 
    })
    // 질문 잘못된 값들이 들어왔을 떄 에러를 발생시키는데 이 때는 테스트를 어떻게 처리해야 할지????
    test('에러값 테스트 target.Value',()=>{
        const targetValue = 'ㅁㄴㅇㄴㅇ'
        expect(totalCounter(targetValue)).toBe(Error('잘못된 값을 입력하였습니다 ')) 
    })
})



