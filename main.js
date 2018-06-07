/*
    Main JS
*/

const {ArrayParser} = require('./function/arrayParser');

const testCase1 = "[123, [22], 33]";
const testCase2 = "[123, [1,2,3,4,5], 33]";
const testCase3 = "[123,[22,23,[11,[112233],112],55],33]";
const testCase4 = "['1a3',[null,false,['11',[112233],112],55, '99'],33, true]";
const testCase5 = "['1a'3',[22,23,[11,[112233],112],55],33]";
const testCase6 = "['1a3',[22,23,[11,[112233],112],55],3d3]";
const testCase7 = "['1a3',[null,false,['11',[112233],{easy : ['hello', {a:'a'}, 'world']},112],55, '99'],{a:'str', b:[912,[5656,33],{key : 'innervalue', newkeys: [1,2,3,4,5]}]}, true]";

const arrayParser = ArrayParser(testCase4);
const result = arrayParser.getResult();

console.log(JSON.stringify(result, null, 2));