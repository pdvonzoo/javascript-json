const {describe, test, expect} = require('../src/util/testUtil')
const {isObjClosed} = require('../src/checkClosed')

     
describe('isObjClosed Test', ()=>{
    test('기본 {} 테스트',()=>{
        expect(isObjClosed('{}')).toBe(true)
    })
    test('중첩 obj {{}} 테스트',()=>{
        expect(isObjClosed('{{2}}')).toBe(true)
    })
    test('첫번째 클로즈드에서는 검출되지 않는 에러값 테스트',()=>{
        expect(isObjClosed('{{}')).toBe(true)
    })
    test('오브젝트가 아닌 값 테스트',()=>{
        expect(isObjClosed('asd[]das')).toBe(false)
    })
    test('오브젝트와 값이 붙어있는 에러값 테스트',()=>{
        expect(isObjClosed('{}a')).toBe(false)
    })
})

