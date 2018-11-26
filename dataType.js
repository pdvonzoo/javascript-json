class DataType{
    constructor(error){
        this.error = error;
    }
    check(data){
        if(data === '') return;
        if(this.isBoolean(data)) return 'boolean';
        if(this.isNull(data)) return 'null';
        if(this.isNumber(data)) return 'number';
        if(this.isString(data)) {
            if(!this.error.validateString(data)) return 'string';            
        }
    }
    isString(value){
        return value.includes("'") | value.includes('"');
    }
    isBoolean(value){
        return value === 'true' || value === 'false';
    }
    isNull(value){
        return value === 'null';
    }
    isNumber(value){
        return value.match(/^[0-9]*$/);
    }
}

class Error{
    validateString(value){
        // if(!value.match(/^\'/)) throw "문자열의 시작은 '이어야 합니다.";
        // if(!value.match(/\'$/)) throw "문자열의 끝은 '이어야 합니다.";
    }
}

const dataType = new DataType(new Error());
module.exports = dataType;