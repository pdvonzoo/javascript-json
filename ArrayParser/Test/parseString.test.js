const {describe, test, equal, expect} = require('../testUtil')
const {parseString} = require('../08_CountType')
const {IdentityObject,IdentityObjObject} = require('../class/IdentityObject')

describe('parseString 테스트', ()=>{
    test('parseString type값이 없을 떄 ',()=>{
        const inputString = '[1,2,3]'
        const inputType = ''
        const expectedValue = {
            type: 'array',
            value: 'ArrayObject',
            child: 
             [ { type: 'number', value: '1', child: [] },
               { type: 'number', value: '2', child: [] },
               { type: 'number', value: '3', child: [] } ] } 
        expect(parseString(inputString,inputType)).toBe(expectedValue) 
    })
})



