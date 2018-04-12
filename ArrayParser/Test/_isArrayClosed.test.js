const {describe, test, equal, expect} = require('../testUtil')
const _isArrayClosed = require('../modules/_isArrayClosed')

describe('is Array String Test', ()=>{
    test('정상값[]',()=>{
        equal(_isArrayClosed('[]'), true)
        equal(_isArrayClosed(' [[] '), true)
        equal(_isArrayClosed('[[2]]'), true)
    })
    test('오류값 잘못된 값',()=>{
        equal(_isArrayClosed('asd[]das'),false)
        equal(_isArrayClosed('{}'), false)
        equal(_isArrayClosed('123'), false)
    })
})
