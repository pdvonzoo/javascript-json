class IdentityObject {
    constructor(type, value, child=[]){
        this.type = type;
        this.value = value;
        this.child = child;
    }
    addChild(item){
        this.child.push(item)
    }
}

class IdObjObj{
    constructor(key,value){
        this.type= 'Object',
        this.key = key,
        this.value = value
    }
}

class IdObjArray extends IdentityObject{
    constructor(){
        super('Array', 'ArrayObject')
    }
}

class IdObjNumber extends IdentityObject{
    constructor(value){
        super("Number", value)
    }
}
class IdObjString extends IdentityObject{
    constructor(value){
        super("String", value)
    }
}
class IdObjBoolean extends IdentityObject{
    constructor(value){
        super("Boolean", value)
    }
}

class IdObjNull extends IdentityObject{
    constructor(value){
        super("Null", value)
    }
}
class IdObjUndefiend extends IdentityObject{
    constructor(value){
        super('Undefined', value)
    }
}


module.exports = Object.freeze({
    IdentityObject,
    IdObjNumber,
    IdObjArray,
    IdObjString,
    IdObjNull,
    IdObjBoolean,
    IdObjUndefiend,
    IdObjObj,
})