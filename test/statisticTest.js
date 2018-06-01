const {test} = require('../utility/test.js');
const {expect} = require('../utility/test.js');
const {parser} = require('../src/parser.js');
const {statistic} = require('../src/statistic.js');

test(' child 없는 통계 TEST ', () => {
    const str = "[123, 'crong', null, undefined, {}, true]";
    const data = [parser.dataParser(str)];
    const result = new statistic(data).statistic;
    const answer = { number : 1, string : 1, null : 1, undefined : 1, boolean : 1, array : 1, object : 1};
    return expect(answer).toBe(result);
})

test(' child 있는 통계 TEST ', () => {
    const str = "[1, 'crong', {whale : { pobi : null}, woogie : true}, undefined]";
    const data = [parser.dataParser(str)];
    const result = new statistic(data).statistic;
    const answer = { number : 1, string : 1, null : 1, undefined : 1, boolean : 1, array : 1, object : 2};
    return expect(answer).toBe(result);
})