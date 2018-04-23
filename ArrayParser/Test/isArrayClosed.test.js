const {describe, test, expect} = require('../src/util/testUtil')
const {isArrayClosed} = require('../src/checkClosed')
  
describe('is Array String Test', ()=>{
    test('정상값 [] 테스트',()=>{
        expect(isArrayClosed('[]')).toBe(true)
    })
    test('중첩 배열 테스트 [[]]',()=>{
        expect(isArrayClosed('[[2]]')).toBe(true)
    })
    test('첫번째 클로즈드에서는 검출되지 않는 에러값 테스트 [[]',()=>{
        expect(isArrayClosed('[[]')).toBe(true)
    })
    test('배열과 섞여 있는 값 테스트',()=>{
        expect(isArrayClosed('asd[]das')).toBe(false)
    })
    test('배열이 아닌 값 테스트 1',()=>{
        expect(isArrayClosed('{}')).toBe(false)
    })
    test('배열이 아닌 값 테스트 2',()=>{
        expect(isArrayClosed('123')).toBe(false)
    })
})
