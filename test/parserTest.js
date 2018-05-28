const {test} = require('../utility/test.js');
const {expect} = require('../utility/test.js');
const {parser} = require('../src/parser.js');

test('child가 있는 배열 Test', () => {
    const data = "[1,2,3]";
    const result = parser.dataParser(data);
    const answer = 
    {    
        type: 'array',
        value: 'object Array',
        child: 
        [ 
            { type: 'number', value: '1', child: [] },
            { type: 'number', value: '2', child: [] },
            { type: 'number', value: '3', child: [] } 
        ]
    }
    return expect(answer).toBe(result);
})

test('child가 있는 객체 Test', () => {
    const data = "{a : 'crong', b : 'pobi', c : 'JK'}";
    const result = parser.dataParser(data);
    const answer = 
    { 
        type: 'object',
        value: 'object Object',
        child: 
        [ 
            { type: 'string', value: "'crong'", key: 'a', child: [] },
            { type: 'string', value: "'pobi'", key: 'b', child: [] },
            { type: 'string', value: "'JK'", key: 'c', child: [] } 
        ]
    }
    return expect(answer).toBe(result);
})

test('2중 배열 Test', () => {
    const data = '[[]]';
    const result = parser.dataParser(data);
    const answer = 
    {
        type: "array",
        value: "object Array",
        child: [
          {
            type: "array",
            value: "object Array",
            child: []
          }
        ]
    }
    return expect(answer).toBe(result);
})

test('2중 객체', () => {
    const data = "{a : { b : 'crong'}}";
    const result = parser.dataParser(data);
    const answer = 
    {
        type: "object",
        value: "object Object",
        child: [
          {
            type: "object",
            value: "object Object",
            key: "a",
            child: [
              {
                type: "string",
                value: "'crong'",
                key: "b",
                child: []
              }
            ]
          }
        ]
    }
    return expect(answer).toBe(result);
})