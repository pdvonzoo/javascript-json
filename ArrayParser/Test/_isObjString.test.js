const {describe, test, equal, expect} = require('../testUtil')
const _isObjString = require('../modules/_isObjString')


describe('_isObjString Test', ()=>{
    test('정상 값 test',()=>{
        equal(_isObjString('{}'), true)
        equal(_isObjString('{{}'), true)
        equal(_isObjString('{{2}}'), true)
    })
    test('오류값 잘못된 값',()=>{
        equal(_isObjString('asd[]das'),false)
        equal(_isObjString('{}a'), false)
    })
})

