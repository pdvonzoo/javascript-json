/*
    TEST JS
*/

exports.test = function(testMsg, testFunction) {
    // console.log(testMsg);
    process.stdout.write(testMsg + " : ");
    testFunction();
};