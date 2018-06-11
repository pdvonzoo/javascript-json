/*
    Expect JS
*/

exports.expect = (answer) => new Expect(answer);

class Expect {

    constructor(answer) {
        this.answer = answer;
    }

    equal(answer, result) {
        if (Array.isArray(answer)) {
            return this.checkEqualArray(answer, result);
        }
        if (answer === result) {
            return true;
        }
        if (typeof(answer) === "object") {
            return this.checkEqualObject(answer, result);
        }
    }

    checkEqualArray(answer, result) {
        if (!Array.isArray(result)) return false;
        return answer.every((v,i) => v === result[i]);
    }

    checkEqualObject(answer, result) {
        if (typeof(result) != "object") return false;
        answer = JSON.stringify(answer);
        result = JSON.stringify(result);
        return answer === result;
    }

    toBe(result) {
        const answer = this.answer;

        if (this.equal(answer, result)) { console.log("OK"); }
        else {
            console.log("FAIL");
            console.log("----------------------");
            console.log("TargetValue is " + answer);
            console.log("ExpectValue is " + result);
            console.log("----------------------");
        }
    }
}