const _isArrayClosed = str => {
    return str[0]==='[' && str[str.length-1] ===']'
}

module.exports = _isArrayClosed