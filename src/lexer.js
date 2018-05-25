const {syntaxError} = require('./error.js');
exports.lexer = (value, key) => new lexer(value,key);

class lexer{
    constructor(value, key){
        this.value = value;
        this.key = key;
    }
    typeCheck(){
		if(this.value[0] === "[")return "array";
		if(this.value[0] === "{")return "object";
		if(!isNaN(+this.value))return "number";
		const dic = {
			true : "boolean",
			false : "boolean",
			undefined : "undefined",
			null : "null"
		}
		for(let key in dic){
			if( key === this.value ) return dic[key];
        }
        syntaxError(this.value);
		return "string";
    }
    valueCheck(){
        const type = this.typeCheck();
        if(type === "array")return "object Array";
        if(type === "object")return "object Object";
        return this.value;
    }
    keyCheck(){
        return this.key;
    }
    get lexer(){
        let dic = {};
        dic.type = this.typeCheck();
        dic.value = this.valueCheck();
        if(!!this.key) dic.key = this.keyCheck();
        dic.child = [];
        return dic;
    }
}