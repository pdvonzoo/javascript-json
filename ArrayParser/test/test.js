const {describe, test, equal, expect} = require('../src/util/testUtil')

describe('totalCounter 테스트', ()=>{
    test('기본 값 테스트 [1,2,3,4,5]',()=>{
        const targetValue =[1,2,3,4,5]
        const expectedValue = [1,2,3,4,5]
        expect(targetValue).toEqual(expectedValue) 
    })
    test('기본 값 테스트 {a:b, c:d}',()=>{
        const targetValue ={'a':'b', 'c':"d"}
        const expectedValue ={'a':'b', 'c':"d"}
        expect(targetValue).toEqual(expectedValue) 
        expect(1).toBe(1)
    })
})