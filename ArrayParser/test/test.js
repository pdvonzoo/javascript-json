const {describe, test, expect} = require('../src/util/testUtil')
const {parseString} = require('../parseString')
const {IdentityObject, IdentityObjObject} = require('../src/IdentityObject/IdentityObject')


testCaseList = {
    inputStringList:['[1,2,3]']
}


describe('parseString 테스트', ()=>{
    test('parseString 기본값 테스트',()=>{
        //given
        const inputString = '[1,2,3]'
        const expectedValue = {
            type: 'array',
            value: 'ArrayObject',
            child: 
             [ { type: 'number', value: '1', child: [] },
               { type: 'number', value: '2', child: [] },
               { type: 'number', value: '3', child: [] } ] } 
        //when
        parseString(inputString)
        expect(parseString(inputString)).toEqual(expectedValue) 
    })
    // Error는 어떻게 테스트해야 하지???
    // test('parseString string값이 아닐때 ',()=>{
    //     const inputString = 3
    //     const inputType = ''
    //     const expectedValue = `문자열 입력해주세요 Error` 
    //     expect(parseString(inputString,inputType)).toBe(expectedValue) 
    // })
    test('배열이 아닌 문자열 test number',()=>{
        const inputString = '3'
        const expectedValue = { type: 'number', value: '3', child: [] }
        expect(parseString(inputString)).toEqual(expectedValue) 
    })
    test('배열이 아닌 문자열 test string',()=>{
        const inputString = '\'b\''
        const expectedValue = { type: 'string', value:  '\'b\'', child: [] }
        expect(parseString(inputString)).toEqual(expectedValue) 
    })
    test('배열이 아닌 문자열 test undefined',()=>{
        const inputString = 'undefined'
        const expectedValue = { type: 'undefined', value:  'undefined', child: [] }
        expect(parseString(inputString)).toEqual(expectedValue) 
    })
    test('배열이 아닌 문자열 test null',()=>{
        const inputString = 'null'
        const expectedValue = { type: 'null', value:  'null', child: [] }
        expect(parseString(inputString)).toEqual(expectedValue) 
    })
    test('배열이 아닌 문자열 test boolean',()=>{
        const inputString = 'true'
        const expectedValue = { type: 'boolean', value:  'true', child: [] }
        expect(parseString(inputString)).toEqual(expectedValue) 
    })
    test('배열이 아닌 문자열 test object',()=>{
        const inputString = '{a: \'b\'}'
        const expectedValue = { 
            type: 'object', 
            key: 'a',
            value: { type: 'string', value: '\'b\'', child: [] } 
        }
        expect(parseString(inputString)).toEqual(expectedValue) 
    })
    test('중첩된 결과들 테스트 ',()=>{
        const inputString = '{a: [1,2,{b: 3}]}'
        const childObj = { 
            type: 'object', 
            key: 'b',
            value: { type: 'number', value: '3', child: [] } 
        }
        const expectedValue = { 
            type: 'object', 
            key: 'a',
            value: {
                type: 'array',
                value: 'ArrayObject',
                child: [
                    { type: 'number', value: '1', child: [] } ,
                    { type: 'number', value: '2', child: [] } ,
                    childObj
                ]
              
            }
        }
        expect(parseString(inputString)).toEqual(expectedValue) 
    })
})







