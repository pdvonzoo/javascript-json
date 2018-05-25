
exports.test = test;
exports.expect = (result) => new expect(result);

function test(testMessage, testFunc){
	console.log(testMessage + " : " + testFunc());
}

class expect{
	
	constructor(result){
		this.result = result;
	}

	equal(target, expect){
		if( Array.isArray(target) ){
			return this.arrayEqual(target, expect);
		}
		if( target.constructor === Object ){
			return this.objectEqual(target, expect);
		}
		return target === expect;
	}

	arrayEqual(target, expect){
		return target.every( (v,i) => {
			if( typeof v === "object" )return this.equal(v,expect[i]);
			return v === expect[i];
		})
	}

	objectEqual(target, expect){
		const targetLength = Object.keys(target).length;
		const expectLength = Object.keys(expect).length;
		if(targetLength !== expectLength)return false;
		for( let key in target){
			if(target[key] === expect[key]) continue;
			if( typeof target[key] === "object" )this.equal(target[key],expect[key]);
			else return false;
		}
		return true;
	}

	toBe(answer){
		const targetMessage = `targetValue is ${JSON.stringify(this.result)}`;
		const expectMessage = `expectValue is ${JSON.stringify(answer)}`;
		if( this.equal(answer, this.result) )return 'OK';
		return `FAIL (${targetMessage}, ${expectMessage})`;
	}

}