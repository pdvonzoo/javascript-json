var votes = ["kim", "hong", "lee", "hong", "lee", "lee", "hong"];

var reducer = function(accumulator, value, index, array) {
  if (accumulator.hasOwnProperty(value)) {
    accumulator[value] = accumulator[value] + 1;
  } else {
    accumulator[value] = 1;
  }
  return accumulator;
}

var initialValue = {};
var result = votes.reduce(reducer, initialValue);
console.log(result); // { kim: 1, hong: 3, lee: 3 }