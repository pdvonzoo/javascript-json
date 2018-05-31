const {test} = require('../utility/test.js');
const {expect} = require('../utility/test.js');
const {tokenizer} = require('../src/tokenizer.js')
const {errorMessage} = require('../src/error.js');
test(' 문자열을 문자하나하나 쪼개는 함수 Test', () => {
    const data = '[1,2,3]';
    const result = tokenizer.arrayFromString(data);
    return expect(['1',',','2',',','3']).toBe(result);
})

test(' bracket이 있을 때 bracket안에 원소합쳐주는 함수 Test(배열)', () => {
    const data = ['1',',','2',',','[','3',',','4',']'];
    const result = tokenizer.combineBrackets(data);
    return expect(['1',',','2',',','[3,4]']).toBe(result);
})

test(' bracket이 있을 때 bracket안에 원소합쳐주는 함수 Test(객체)', () => {
    const data = ['{','a',':',"'crong'",'}'];
    const result = tokenizer.combineBrackets(data);
    return expect(["{a:'crong'}"]).toBe(result);
})

test(' 객체를 만들어주는 함수 Test', () => {
    const data = ['a',':',"'crong'"];
    const result = tokenizer.makeObject(data);
    return expect({a : "'crong'"}).toBe(result);
})

test(' 배열테스트 [] ',() => {
    const data = '[1,2,3]';
    const result = tokenizer.convertArray(data);
    return expect(['1','2','3']).toBe(result);
})

test(' 이중배열테스트 [[]] ',() => {
    const data = '[1,[2,3],4]'
    const result = tokenizer.convertArray(data);
    return expect(['1','[2,3]','4']).toBe(result);
})

test(' 객체테스트{} ',() => {
    const data = "{a : 'a'}";
    const result = tokenizer.convertObject(data);
    return expect({ a : "'a'" }).toBe(result);
})

test(' 이중 객체테스트{{}} ',() => {
    const data = "{a : { b : 'c'}}";
    const result = tokenizer.convertObject(data);
    return expect({ a : "{ b : 'c'}" }).toBe(result);
})

test(' closeBracketError Test ', () => {
    const data = ["[","[","]"]
    try{
        tokenizer.combineBrackets(data);
    }catch{
        const result = errorMessage.closeBracketError;
        const answer = "bracket이 정상적으로 닫히지 않았습니다.";
        return expect(answer).toBe(result);
    }
})

test(' openBracketError Test ', () => {
    const data = ["]","["]
    try{
        tokenizer.combineBrackets(data);
    }catch{
        const result = errorMessage.openBracketError;
        const answer = "bracket이 정상적으로 열리지 않았습니다.";
        return expect(answer).toBe(result);
    }
})

test(' colonError  Test ', () => {
    const data = ["{","a","}"]
    try{
        tokenizer.makeObject(data);
    }catch{
        const result = errorMessage.colonError;
        const answer = ":이 누락된 객체표현이 있습니다.";
        return expect(answer).toBe(result);
    }
})