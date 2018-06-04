/*
    Expect JS
*/

exports.expect = (result) => new Expect(result);

class Expect {

    constructor(result) {
        this.result = result;
    }

    toBe(answer) {

        const result = this.result;

        console.log(result, answer);
        if (result === answer) { console.log("OK"); }
        else {
            console.log("TargetValue is " + answer);
            console.log("ExpectValue is " + result);
        }
    }
}