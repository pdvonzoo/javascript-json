const _each = (list, iter) => {
    for(let i =0; i<list.length; i++){
        iter(list[i])
    }
    return list;
} 

const _map = (list, mapper) =>{
    const new_list = [];
    _each(list, function(val){
        new_list.push(mapper(val));
    })
    return new_list;
}

const _filter = (list, predicate) => {
    const new_list = [];
    _each(list, function(val){
        if(predicate(val)) new_list.push(val);
    })
    return new_list;
}

function _curry(fn){
    return function(a,b){
         return arguments.length===2 ? fn(a,b) :function(b){return fn(a,b);}
    }
}

const _curryR = function(fn){
    return function(a,b){
        return arguments.length===2 ? fn(a,b) :function(b){return fn(b,a);}
   }
}


const _pipe = (...fns) => (value) => fns.reduce((acc, fn) => fn(acc), value)


module.exports = Object.freeze({
    _pipe,
    _map,
    _each
})