class test {
  constructor(child = []) {
    this.child = child;
  }

  filterData(data) {
    const delOutsideArr = data.substring(1, data.length - 1);

    let splitData = delOutsideArr.split('');

    let filteringData = splitData.filter(element => {
      return element !== ' ' && element !== ',';
    }).reduce((accData, index) => {
      return accData + index;
    });
    return filteringData;
  }

  secondChild(element) {
    let secondChildObj = {
      type: 'Number',
      value: element,
      child: []
    }
    arr.push(secondChildObj);
    return arr;
  }

  getCheckNumberType(wordData) {
    return wordData.search(/(0-9)/) ? 'Number' : false;
  }

  arrParser(filterData) {
    const splitStr = filterData.split('');
    console.log(filterData)
    console.log(splitStr)
    let result = [];

    for (let key in splitStr) {
      let strElement = splitStr[key];

      if(this.nextElement(strElement)) {
        if(this.openArr(strElement)) result[result.length-1].push(strElement);
      }

      if(this.isNumber(strElement)) result.push([strElement]);
      // if(this.closeArr(strElement)) strElement = result.pop();
      console.log(result);
    }
  }

  isNumber(element){
    return element.match(/[0-9]/g);
  }

  openArr(element) {
    return element === '[';
  }

  nextElement(element) {
    return element === ',';
  }

  closeArr(element) {
    return element === ']';
  }
}

const str = '[1, 2,[3,4, 5]]';
const result = new test();
const filter = result.filterData(str);
const arrParser = result.arrParser(filter);
// result.secondChild(arrParser);
console.log(JSON.stringify(result, null, 2));
