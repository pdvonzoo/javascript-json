class testObj{
  constructor(value){
    this.result = value; 
  }
  toBe(value){
    return this.result === value;
  }
}

const expect = (value) => {
  return new testObj(value);
}


console.log(expect(30).toBe(30));