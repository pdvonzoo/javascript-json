const {describe, test, equal, expect} = require('../testUtil')
const splitItem = require('../modules/splitItem')



describe('splitItem 테스트', ()=>{
    test('기본 값 테스트 ',()=>{
        const targetValue = '[1,2,3]'
        const expectedValue = ['[1,2,3]']
        expect(splitItem(targetValue)).toEqual(expectedValue) 
    })
    test('[] 중첩 배열 test',()=>{
        const targetValue = '[1,2,3],[1,[4,5]]'
        const expectedValue = ['[1,2,3]','[1,[4,5]]']
        expect(splitItem(targetValue)).toBeArrayValue(expectedValue)  
    })
    test('"[][][[[]]]] 여러 중첩 테스트",',()=>{
        const targetValue = "1,[1,[1,[2,[2,3]]]],3"        
        const expectedValue = ['1','[1,[1,[2,[2,3]]]]','3']
        expect(splitItem(targetValue)).toBeArrayValue(expectedValue) 
    })
    test("{a:b} 일반 객체 테스트",()=>{
        const targetValue = "{a:b}"        
        const expectedValue = ['{a:b}']
        expect(splitItem(targetValue)).toBeArrayValue(expectedValue) 
    })
    test("{a:b},{c:[1,2,3],d:{a:b}} 객체 및 배열 혼합 테스트",()=>{
        const targetValue = "{a:b},{c:[1,2,3],d:{a:b}}"        
        const expectedValue = ['{a:b}','{c:[1,2,3],d:{a:b}}']
        expect(splitItem(targetValue)).toBeArrayValue(expectedValue) 
    })
   
})


