const {describe, test, equal, expect} = require('../testUtil')
const {isObjClosed} = require('../modules')

equal(isObjClosed('{{}'), true)
     

describe('isObjClosed Test', ()=>{
    test('기본 {} 테스트',()=>{
        equal(isObjClosed('{}'), true)
    })
    test('중첩 obj {{}} 테스트',()=>{
        equal(isObjClosed('{{2}}'), true)
    })
    test('첫번째 클로즈드에서는 검출되지 않는 에러값 테스트',()=>{
        equal(isObjClosed('{{}'), true)
    })
    test('오브젝트가 아닌 값 테스트',()=>{
        equal(isObjClosed('asd[]das'),false)
    })
    test('오브젝트와 값이 붙어있는 에러값 테스트',()=>{
        equal(isObjClosed('{}a'), false)
    })
  
})

