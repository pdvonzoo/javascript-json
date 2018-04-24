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

class IdentityObjObject{
    constructor(key,value){
        this.type= 'object',
        this.key = key,
        this.value = value
    }
}

module.exports = Object.freeze({
    IdentityObject,
    IdentityObjObject,
})