const {describe, test, equal, expect} = require('../testUtil')
const _isObjString = require('../modules/_isObjString')

equal(_isObjString('{{}'), true)
     

describe('_isObjString Test', ()=>{
    test('기본 {} 테스트',()=>{
        equal(_isObjString('{}'), true)
    })
    test('중첩 obj {{}} 테스트',()=>{
        equal(_isObjString('{{2}}'), true)
    })
    test('첫번째 클로즈드에서는 검출되지 않는 에러값 테스트',()=>{
        equal(_isObjString('{{}'), true)
    })
    test('오브젝트가 아닌 값 테스트',()=>{
        equal(_isObjString('asd[]das'),false)
    })
    test('오브젝트와 값이 붙어있는 에러값 테스트',()=>{
        equal(_isObjString('{}a'), false)
    })
  
})

