const {describe, test, equal, expect} = require('../testUtil')
const {_isArrayClosed} = require('../modules')
  
describe('is Array String Test', ()=>{
    test('정상값 [] 테스트',()=>{
        equal(_isArrayClosed('[]'), true)
    })
    test('중첩 배열 테스트 [[]]',()=>{
        equal(_isArrayClosed('[[2]]'), true)
    })
    test('첫번째 클로즈드에서는 검출되지 않는 에러값 테스트 [[]',()=>{
        equal(_isArrayClosed('[[]'), true)
    })
    test('배열과 섞여 있는 값 테스트',()=>{
        equal(_isArrayClosed('asd[]das'),false)
    })
    test('배열이 아닌 값 테스트 1',()=>{
        equal(_isArrayClosed('{}'), false)
    })
    test('배열이 아닌 값 테스트 2',()=>{
        equal(_isArrayClosed('123'), false)
    })
})
