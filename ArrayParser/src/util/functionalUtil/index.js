const each = (list, iter) => {
    for(item of list){
        iter(item)
    }
    return list;
} 

const map = (list, mapper) =>{
    const new_list = [];
    for(item of list){
            new_list.push(mapper(item));
    }
    return new_list;
}

const filter = (list, predicate) => {
    const new_list = [];
    for(item of list){
        if(predicate(list[i])) new_list.push(item);
    }
    return new_list;
}

const curry = (fn)=>{
    return function(a,b){
         return arguments.length===2 ? fn(a,b) :function(b){return fn(a,b);}
    }
}

const curryR = (fn)=>{
    return function(a,b){
        return arguments.length===2 ? fn(a,b) :function(b){return fn(b,a);}
   }
}


const pipe = (...fns) => (value) => fns.reduce((acc, fn) => fn(acc), value)


module.exports = Object.freeze({
    pipe,
    map,
    each
})