const {describe, test, expect} = require('../src/util/testUtil')
const {parseString} = require('../parseString')
const {IdentityObject, IdentityObjObject} = require('../src/IdentityObject/IdentityObject')

// var s = "['1a3',[null,false,['11',112,'99']], {a:'str', b:[912,[5656,33]]}, true]";
//정상출력

// var s = "['1a3',[null,false,['11',112,'99' , {a:'str', b:[912,[5656,33]]}, true]";
// 정상적으로 종료되지 않은 배열이 있습니다.

// var s = "['1a3',[null,false,['11',112,'99']], {a:'str', b: [912,[5656,33]], true]";
// 정상적으로 종료되지 않은 객체가 있습니다.

// var s = "['1a3',[null,false,['11',112,'99']], {a:'str', b  [912,[5656,33]]}, true]";
// ':'이 누락된 객체표현이 있습니다.

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
        const parsedStringResult = parseString(inputString);
        //then
        expect(parsedStringResult).toEqual(expectedValue) 
    })
    test('배열이 아닌 문자열 test number',()=>{
        //given
        const inputString = '3'
        const expectedValue = { type: 'number', value: '3', child: [] }
        // when 
        const parsedStringResult = parseString(inputString);
        // then 
        expect(parsedStringResult).toEqual(expectedValue) 
    })
    test('배열이 아닌 문자열 test string',()=>{
        //given
        const inputString = '\'b\''
        const expectedValue = { type: 'string', value:  '\'b\'', child: [] }
        // when
        const parsedStringResult = parseString(inputString);
        // then 
        expect(parsedStringResult).toEqual(expectedValue) 
    })
    test('배열이 아닌 문자열 test undefined',()=>{
        //given
        const inputString = 'undefined'
        const expectedValue = { type: 'undefined', value:  'undefined', child: [] }
        // when
        const parsedStringResult = parseString(inputString);
        // then 
        expect(parsedStringResult).toEqual(expectedValue) 
    })
    test('배열이 아닌 문자열 test null',()=>{
        //given
        const inputString = 'null'
        const expectedValue = { type: 'null', value:  'null', child: [] }
        // when
        const parsedStringResult = parseString(inputString);
        // then 
        expect(parseString(inputString)).toEqual(expectedValue) 
    })
    test('배열이 아닌 문자열 test boolean',()=>{
        //given
        const inputString = 'true'
        const expectedValue = { type: 'boolean', value:  'true', child: [] }
        //when 
        const parsedStringResult = parseString(inputString);
        //then
        expect(parseString(inputString)).toEqual(expectedValue) 
    })
    test('배열이 아닌 문자열 test object',()=>{
        //given
        const inputString = '{a: \'b\'}'
        const expectedValue = { 
            type: 'object', 
            key: 'a',
            value: { type: 'string', value: '\'b\'', child: [] } 
        }
        //when
        const parsedStringResult = parseString(inputString);
        //then 
        expect(parseString(inputString)).toEqual(expectedValue) 
    })
    test('중첩된 결과들 테스트 ',()=>{
        //given
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
        //when 
        const parsedStringResult = parseString(inputString);
        //then
        expect(parseString(inputString)).toEqual(expectedValue) 
    })
   
})


