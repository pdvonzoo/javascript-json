const {describe, test, equal, expect} = require('../testUtil')
const parseString = require('../08_CountType')

describe('parseString 테스트', ()=>{
    test('parseString type값이 없을 떄 ',()=>{
        const inputString = '[1,2,3,4]'
        const inputType = '' 
        const expectedValue = ''
        expect(parseString(inputString,inputType)).toBe(expectedValue) 
    })
   
})



