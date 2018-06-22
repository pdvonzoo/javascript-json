function getFilterData(data) {
  const delOutsideArr = data.substring(1, data.length - 1);

  let splitData = delOutsideArr.split('');
  let filteringData = splitData.filter(element => {
    return element !== ' ';
  }).reduce((accData, index) => {
    return accData + index;
  });
  return filteringData;
}

function test(arr) {
  let arrTest = [];
  console.log(arr)
  const test = arr.reduce((accVal, value, index) => {
    if (value.match(',')) console.log('"," 임', value)
    if (value.match(/[0-9]/)) console.log(accVal, value);
    if (value.match(']')) console.log('"]" 임', value, index)
  });
}

function parser(str) {
  const filteringData = getFilterData(str);
  const splitData = filteringData.split('');
  // test(splitData);

  let child = [];
  let arrKey = 0;
  let strElement = '';

  for (let key in splitData) {
    const value = splitData[key];

    if (value.match(/[0-9]/) && arrKey === 0) child.push(value);
    if (value.match(/[0-9]/) && arrKey > 0) child[child.length -1].push(value);

    if (value.match(/(\[)/g)) {
      child.push(new Array());
      const arrCondition = Object.prototype.toString.call(child[child.length - 1]);
      if (arrCondition === '[object Array]') arrKey = child.length - 1;
    }
    if (value === ',') { // 함수화 (',') 발견 시
      if (strElement.match(/[0-9]/)) strElement = strElement + value;
      strElement !== '' ? child[child.length - 1].push(strElement) : null;
      strElement = '';
    }

    if (value.match(/(\])/g)) { // 함수화 (']') 발견시
      return chlid;
      strElement !== '' ? child[child.length - 1].push(strElement) : null;
      strElement = child.pop();
      if (key !== str.length - 1) {
        child[child.length - 1].push(strElement);
        strElement = '';
      }
    }


    // if (arrKey !== str.length && value.match(/[0-9]/)) child[child.length - 1].push(value);

    console.log(child);
    console.log(arrKey, value);
  }
}

const testcase1 = '[1, 2,[3,4, 5]]';
const testcase2 = '[12, [14, 55], 15]';
const testcase3 = '[1, [55, 3]]';
const testcase4 = '[1, [[2]]]';
const testcase5 = '[123,[22,23,[11,[112233],112],55],33]';
const testcase6 = '12345';
const testcase7 = '[1,3,[1,2],4,[5,6]]';
const result = parser(testcase1);
// console.log(JSON.stringify(result, null, 2));
