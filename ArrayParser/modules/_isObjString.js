const _isObjString = str => {
    str = str.trim();
    return str[0]==='{' && str[str.length-1] ==='}'
}

module.exports = _isObjString;