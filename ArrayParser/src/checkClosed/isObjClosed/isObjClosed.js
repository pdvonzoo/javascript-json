const isObjClosed = str => {
  str = str.trim();
  return str[0]==='{' && str[str.length-1] ==='}'
}


module.exports = isObjClosed