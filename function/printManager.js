
exports.errorAbnormalArray = () => {
    console.log("ERROR");
    console.log("앗! 정상적으로 종료되지 않은 '배열'이 있어요 :(");
    process.exit();
};

exports.errorAbnormalObject = () => {
    console.log("ERROR");
    console.log("앗! 정상적으로 종료되지 않은 '객체'가 있어요 :(");
    process.exit();
};

exports.errorUnknownType = (param) => {
    console.log(param + "(은/는) 알 수 없는 타입입니다");
    process.exit();
};

exports.errorAbnormalString = (param) => {
    console.log(param + "(은/는) 올바른 문자열이 아닙니다");
    process.exit();
};

exports.errorOmissionColon = (param) => {
    console.log("ERROR");
    console.log("앗! 객체중에 ':'가 누락되었어요 :(");
    process.exit();
};

exports.notifySpaceData = () => {
    console.log("NOTIFY -*");
    console.log("데이터 중에 공백이 존재합니다.");
    console.log("제거 후, 정상적인 데이터로 반환합니다 :)");
    console.log("---------------------------------------");
};

exports.analyzeTypeData = (object) => {
    let resultString = "";
    resultString += "타입 갯수를 분석하여 결과를 출력합니다\n";
    for (let key in object) {
        let analyzedTypeData = key + ": " + object[key] + "\n";
        resultString += analyzedTypeData;
    }
    return resultString;
}

exports.printCutOffLine = () => {
    console.log("*-----------------------------------------------*");
}

exports.printToJSON = (param) => { 
    return JSON.stringify(param, null, 2);
}

exports.printData = (param) => {
    console.log(param);
}