const {describe, test, equal, expect} = require('../testUtil')
const splitItem = require('../modules/splitItem')

const result = splitItem('[2],[1,2,3],[[1]]')

describe('splitItem 테스트', ()=>{
    test('[]중첩 배열 test',()=>{
        // expect(splitItem('[2],[1,2,3],[[1]]')).toBe(result)
        // expect(splitItem('[2],[1,2,3],[[1]]')).toBe(['[2]', '[1,2,3]', '[[1]]'])
       
    })
})


