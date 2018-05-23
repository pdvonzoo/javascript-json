const {test} = require('./test.js');
const {expect} = require('./test.js');
const {tokenizer} = require('../src/tokenizer.js')

test(' 문자열을 문자하나하나 쪼개는 함수 Test', () => {
    const result = tokenizer.arrayFromString('[1,2,3]');
    return expect(['1',',','2',',','3']).toBe(result);
})

test(' bracket이 있을 때 bracket안에 원소합쳐주는 함수 Test(배열)', () => {
    const result = tokenizer.combineBrackets(['1',',','2',',','[','3',',','4',']']);
    return expect(['1',',','2',',','[3,4]']).toBe(result);
})

test(' bracket이 있을 때 bracket안에 원소합쳐주는 함수 Test(객체)', () => {
    const result = tokenizer.combineBrackets(['{','a',':',"'crong'",'}']);
    return expect(["{a:'crong'}"]).toBe(result);
})

test(' 객체를 만들어주는 함수 Test', () => {
    const result = tokenizer.makeObject(['a',':',"'crong'",'}']);
    return expect({a : "'crong'"}).toBe(result);
})

test(' 배열테스트 [] ',() => {
    const result = tokenizer.convertArray('[1,2,3]');
    return expect(['1','2','3']).toBe(result);
})

test(' 이중배열테스트 [[]] ',() => {
    const result = tokenizer.convertArray('[1,[2,3],4]');
    return expect(['1','[2,3]','4']).toBe(result);
})

test(' 객체테스트{} ',() => {
    const result = tokenizer.convertObject("{a : 'a'}");
    return expect({ a : "'a'" }).toBe(result);
})

test(' 이중 객체테스트{{}} ',() => {
    const result = tokenizer.convertObject("{a : { b : 'c'}}");
    return expect({ a : "{ b : 'c'}" }).toBe(result);
})
