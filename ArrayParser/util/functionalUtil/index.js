const each = (list, iter) => {
    for(let i =0; i<list.length; i++){
        iter(list[i])
    }
    return list;
} 

const map = (list, mapper) =>{
    const new_list = [];
    for(let i =0,{length}=list; i<length; i++){
            new_list.push(mapper(val));
    }
    return new_list;
}

const filter = (list, predicate) => {
    const new_list = [];
    for(let i =0,{length}=list; i<length; i++){
        if(predicate(list[i])) new_list.push(list[i]);
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