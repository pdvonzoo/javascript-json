/*
    TEST JS
*/

exports.test = function(testMsg, testFunction) {
    process.stdout.write(testMsg + " : ");
    testFunction();
};