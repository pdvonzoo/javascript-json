const {describe, test, expect} = require('../src/util/testUtil')
const totalCounter = require('../src/counts/counts')
const sample = require('../parseString')
const {IdentityObject, IdentityObjObject} = require('../src/IdentityObject/IdentityObject')


describe('totalCounter 테스트', ()=>{
    test('기본 값 테스트 [1,2,3,4,5]',()=>{
        // given
        const targetValue = sample.sampleResult1 
        const expectedValue = {
            type: {
                "array": 1,
                "number": 5,
            }
        }
        // when
        const countsResult = totalCounter(targetValue)
        // then
        expect(countsResult).toEqual(expectedValue) 
    })
    test('기본 값 테스트 \"[[1,2,3],[2],{a:\'str\', b:[1,2,3]},true, undefined, false]\"',()=>{
        //given
        const targetValue = sample.sampleResult2 
        const expectedValue = {
                type: {
                    'array': 4,  
                    'number': 7, 
                    'object': 1,                                                           
                    'boolean': 2,                                      
                    'undefined': 1,
                }
            }
         // when
         const countsResult = totalCounter(targetValue)
         // then
         expect(countsResult).toEqual(expectedValue) 
    })
   
})



