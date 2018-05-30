function typeError(value){
    if( value.match(/\'/) === null ) throw value + errorMessage.typeError;
}
function stringError(value){
    if( !!value.slice(1,value.length-1).match(/\'/)) throw value + errorMessage.stringError;
}
function closeBracketError(count){
    if( count !== 0 )throw errorMessage.closeBracketError;
}
function openBracketError(count){
    if( count <= 0 )throw errorMessage.openBracketError;
}
function colonError(newArray){
    if(newArray.indexOf(":") === -1) throw errorMessage.colonError;
}
const errorMessage = {
    typeError : "는 알 수 없는 타입입니다.",
    stringError : "는 올바른 문자열이 아닙니다.",
    openBracketError : "bracket이 정상적으로 열리지 않았습니다.",
    closeBracketError : "bracket이 정상적으로 닫히지 않았습니다.",
    colonError : ":이 누락된 객체표현이 있습니다."
}

module.exports = {
    typeError,
    stringError,
    closeBracketError,
    openBracketError,
    colonError,
    errorMessage
};
