const typeCount = { object: 0, array: 0, boolean: 0, null: 0, number: 0, string: 0 };
function statistic(targetObject) {
  typeCount[targetObject.type]++;
  if (targetObject.child.length === 0) return null;
  if (targetObject.type === 'object') {
    Object.values(targetObject.child).forEach(v => statistic(v));
  } else {
    targetObject.child.forEach(v => statistic(v));
  }
  const formatted = countTypeFormatting(typeCount);
  return formatted;
}
function countTypeFormatting(countByTypeObject) {
  const key = Object.keys(countByTypeObject);
  const reduced = key.reduce((ac, cv, idx) => {
    ac += `${cv}타입 : ${countByTypeObject[cv]}개, `
    if (idx === key.length - 1) return ac.slice(0, -2);
    return ac;
  }, ``)
  return reduced;
}
exports.statistic = statistic;