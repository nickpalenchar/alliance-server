module.exports = function () {
  // 49-57, 65-90, 97-122 is valid
  var result = '';
  for(var i = 0; i < 16; i++) {
    var code = Math.round(Math.random() * 62) + 49;
    if (code > 57) code += 7;
    if (code > 90) code += 6;
    result += String.fromCharCode(code);
  }
  return result;
}