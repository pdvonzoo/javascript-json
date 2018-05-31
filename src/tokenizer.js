const {pipe} = require('../utility/util.js');
const {openBracketError, closeBracketError, colonError} = require('./error.js');
class tokenizer{

	arrayFromString(str){

		let newArray = Array.from(str)
		newArray = newArray.slice(1,newArray.length - 1);
		return newArray;
	}

	checkBracket(newArray){

		if(newArray.includes("{")&&newArray.includes("[")){
			return newArray.indexOf("{") > newArray.indexOf("[") ? ["[","]"] : ["{","}"];
		}
		if(newArray.includes("["))return ["[","]"];
		if(newArray.includes("{"))return ["{","}"];
		return false;
	}

	plusCount(count){
		return ++count;
	}

	minusCount(count){
		openBracketError(count);
		return --count;
	}

	spliceStr(newArray, key, combineType){
		const startIndex = newArray.indexOf(combineType[0]);
		const lastIndex = +key;
		const combineElement = newArray.slice(startIndex, lastIndex+1).reduce( (prev, curr) => prev+curr);
		newArray.splice(startIndex, combineElement.length, combineElement);
		return this.combineBrackets(newArray);
	}

	combineBrackets(newArray){

		const combineType = this.checkBracket(newArray);
		if( !combineType )return newArray;

		const dic = newArray.reduce( (prev, curr, i ) => {
			if( curr === combineType[0] || curr === combineType[1] ){
				prev[i] = curr;
				return prev;
			}else{ return prev; }
		},{});
		let count = 0;
		for( let key in dic ){
			if( dic[key] === combineType[0]) count = this.plusCount(count);
			if( dic[key] === combineType[1]) count = this.minusCount(count);
			if( count === 0 ) return this.spliceStr(newArray, key, combineType);
		}
		closeBrackeyError(count);
	}

	makeElement(newArray){

		let valueOfArray = "";
		const makeElement = [];
		for(let i = 0; i < newArray.length; i++){
			if(newArray[i] === ","){
				makeElement.push(valueOfArray.trim());
				valueOfArray = "";
				continue;
			}
			valueOfArray += newArray[i];
		}
		makeElement.push(valueOfArray.trim());
		return makeElement.filter( v => v.length > 0);

	}

	makeObject(newArray){
		if( newArray.length === 0){ return {}}
		else {colonError(newArray)};
		let keyOfObject = "";
		let result = "";
		let dic = {};

		for(let value of newArray){
			if( value === ":" ){
				keyOfObject = result.trim();
				result = "";
				continue;
			}
			if( value === "," ){
				dic[keyOfObject] = result.trim();
				result = "";
				continue;
			}
			result += value;
		}
		dic[keyOfObject] = result.trim();
		return dic;
	}
	
	combineElements(str){
		return pipe(this.arrayFromString, this.combineBrackets)(this, str);
	}
	convertArray(str){
		return pipe(this.combineElements, this.makeElement)(this, str);
	}
	convertObject(str){
		return pipe(this.combineElements, this.makeObject)(this, str);
	}
}

exports.tokenizer = new tokenizer();