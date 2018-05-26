const pipe = (...fns) => (objName,value) => fns.reduce( (acc, fn) => fn.call(objName, acc), value);

exports.pipe = pipe;