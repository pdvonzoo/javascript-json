class ErrorChecker{
    validateClosing(data){
        let openingObj = 0, 
            closingObj = 0, 
            openingArr = 0, 
            closingArr = 0,
            StrSpecialChar = 0;
        for(let v of data){   
            if(v === '{') ++openingObj;
            if(v === '}') ++closingObj;
            if(v === '[') ++openingArr;
            if(v === ']') ++closingArr;
            if(v === '\'') ++StrSpecialChar;
        }
        if(openingObj !== closingObj) throw "올바르지 않은 객체가 포함되어 있습니다.";
        if(openingArr !== closingArr) throw "올바르지 않은 배열이 포함되어 있습니다.";
        if(StrSpecialChar % 2 !== 0) throw "올바르지 않은 문자열이 포함되어 있습니다.";
    }
    validateColon(data){
        if(data.slice(-1)[0].status !== 'object_value') throw "객체 안에 콜론이 생략되어 있습니다.";
    }
}

module.exports = ErrorChecker;