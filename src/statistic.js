const {parser} = require('./parser.js');

class statistic{
    constructor(data){
        this.data = data;
        this.state = {
            number : 0,
            string : 0,
            null : 0,
            boolean : 0,
            undefined : 0,
            array : 0,
            object : 0
        }
    }
    calculateState(data){
        if(data.length === 0 ) return ;
        for( let value of data ){
            this.state[value.type]++;
            this.calculateState(value.child);
        }
    }
    printState(){
        this.calculateState(this.data);
        for(let key in this.state){
            console.log(key + '는 ' + this.state[key] + '개');
        }
    }
    get statistic(){
        this.calculateState(this.data);
        return this.state;
    }
}
exports.statistic = statistic;

// let str = "[1,2,3]";
// let data = [parser.dataParser(str)];
// console.log(new statistic(data).statistic);
// new statistic(data).printState();

// str = "['1a3',[null,false,['11',[112233],{easy : ['hello', {a:'a'}, 'world']},112],55, '99'],{a:'str', b:[912,[5656,33],{key : 'innervalue', newkeys: [1,2,3,4,5]}]}, true]";
// data = [parser.dataParser(str)];
// console.log(new statistic(data).statistic);
// new statistic(data).printState();