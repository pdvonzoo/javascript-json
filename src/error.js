exports.syntaxError = (value) => syntaxError(value);

function syntaxError(value){
    if( value.match(/\'/) === null ) throw value + errorMessage.typeError;
    if( !!value.slice(1,value.length-1).match(/\'/)) throw value + errorMessage.stringError;
}

const errorMessage = {
    typeError : "는 알 수 없는 타입입니다.",
    stringError : "는 올바른 문자열이 아닙니다."
}