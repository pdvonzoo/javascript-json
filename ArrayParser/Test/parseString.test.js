const {describe, test, expect} = require('../src/util/testUtil')
const {parseString} = require('../parseString')
const {IdentityObject, IdentityObjObject} = require('../src/IdentityObject/IdentityObject')


testCaseList = {
    inputStringList:['[1,2,3]']
}

describe('parseString 테스트', ()=>{
    test('parseString 기본값 테스트'+
        `[1,2,3] 이 입력되면 결과 값으로  type: 'array',
        value: 'ArrayObject',
        child: 
         [ { type: 'number', value: '1', child: [] },
           { type: 'number', value: '2', child: [] },
           { type: 'number', value: '3', child: [] } ] } 이 나와야 한다`,()=>{
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
    test('배열이 아닌 문자열 test => 문자열 "3"이 입력되면 number이고 value가 문자열 3 child: []인 결과가 나와야 한다',()=>{
        //given
        const inputString = '3'
        const expectedValue = { type: 'number', value: '3', child: [] }
        // when 
        const parsedStringResult = parseString(inputString);
        // then 
        expect(parsedStringResult).toEqual(expectedValue) 
    })
    test('배열이 아닌 문자열 test string =>'
            +`"b" 가 입력되면 { type: 'string', value:  '\'b\'', child: [] }인 객체가 결과 값으로 나와야 한다.`
        ,()=>{
        //given
        const inputString =  '\'b\''
        const expectedValue = { type: 'string', value:  '\'b\'', child: [] }
        // when
        const parsedStringResult = parseString(inputString);
        // then 
        expect(parsedStringResult).toEqual(expectedValue) 
    })
    test('배열이 아닌 문자열 test undefined'
            +'undefined가 입력되면 { type: "undefined", value:  "undefined", child: [] }인 결과 값으로 나와야 한다.',
    ()=>{
        //given
        const inputString = 'undefined'
        const expectedValue = { type: 'undefined', value:  'undefined', child: [] }
        // when
        const parsedStringResult = parseString(inputString);
        // then 
        expect(parsedStringResult).toEqual(expectedValue) 
    })
    test('배열이 아닌 문자열 test null'+
         `null이 입력되면 결과 값으로 { type: 'null', value:  'null', child: [] }이 나와야 한다`,
         ()=>{
        //given
        const inputString = 'null'
        const expectedValue = { type: 'null', value:  'null', child: [] }
        // when
        const parsedStringResult = parseString(inputString);
        // then 
        expect(parseString(inputString)).toEqual(expectedValue) 
    })
    test('배열이 아닌 문자열 test boolean'
        +'boolean true값이 입렫되면 { type: "boolean", value:  "true", child: [] }인 객체가 결과 값으로 나와야 한다.',
        ()=>{
        //given
        const inputString = 'true'
        const expectedValue = { type: 'boolean', value:  'true', child: [] }
        //when 
        const parsedStringResult = parseString(inputString);
        //then
        expect(parseString(inputString)).toEqual(expectedValue) 
    })
    test('배열이 아닌 문자열 test object'
         +'obejct {a: "b"}인 객체가 입력되면 결과값으로는 type:object key: a'
         +`value: { type: 'string', value: '\'b\'', child: [] }인 결과가 나와야 한다`,
         ()=>{
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
    test('중첩된 결과들 테스트 '+
         `{a: [1,2,{b: 3}]}이 입력되면 결과 값으로 { 
            type: 'object', 
            key: 'a',
            value: {
                type: 'array',
                value: 'ArrayObject',
                child: [
                    { type: 'number', value: '1', child: [] } ,
                    { type: 'number', value: '2', child: [] } ,
                    { 
                        type: 'object', 
                        key: 'b',
                        value: { type: 'number', value: '3', child: [] } 
                    }
                ]
              
            }이 나와야 한다`,
         ()=>{
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



// simpleTest StringInput
const str1 = "[1,2,3]";
const str2 = "[[1,2,3],[2],{a:'str', b:[1,2,3]},true, undefined, false]";
const str3 = '[1,2,3]'
const str4 = '{a: \'b\'}'
const str5 = '[[1,2,3],{a:[1,2,{b:3}]}]'

// var s = "['1a3',[null,false,['11',112,'99']], {a:'str', b:[912,[5656,33]]}, true]";
//정상출력

// var s = "['1a3',[null,false,['11',112,'99' , {a:'str', b:[912,[5656,33]]}, true]";
// 정상적으로 종료되지 않은 배열이 있습니다.

var s = "['1a3',[null,false,['11',112,'99']], {a:'str', b: [912,[5656,33]], true]";
// 정상적으로 종료되지 않은 객체가 있습니다.

// var s = "['1a3',[null,false,['11',112,'99']], {a:'str', b  [912,[5656,33]]}, true]";
// ':'이 누락된 객체표현이 있습니다.
// parseString(s);

// ThrowError 추가할 예정...

 // Error는 어떻게 테스트해야 하지???
    // test('parseString string값이 아닐때 ',()=>{
    //     const inputString = 3
    //     const inputType = ''
    //     const expectedValue = `문자열 입력해주세요 Error` 
    //     expect(parseString(inputString,inputType)).toBe(expectedValue) 
    // })

