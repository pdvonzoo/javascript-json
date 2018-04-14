const {describe, test, equal, expect} = require('../testUtil')
const splitItem = require('../modules/splitItem')

const targetValue = '[1,2,3],[1,[4,5]]'
const expectedValue = ['[1,2,3]','[1,[4,5]]']

describe('splitItem 테스트', ()=>{
    test('[]중첩 배열 test',()=>{
        expect(splitItem(targetValue)).toBeArrayValue(expectedValue)
        
    })
})


