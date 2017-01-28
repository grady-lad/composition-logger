
var nestedLog = function (functionName, res) {
  var functionNameToDisplay = functionName ? functionName : 'anyonamous function'
  console.group(functionNameToDisplay);
  console.log(result);
  console.groupEnd();
};

module.exports = function () {
  var fns = arguments;
  console.group('composition debug');
  function f(result) {
    for (var i = fns.length - 1; i > -1; i--) {
      result = fns[i].call(this, result);
      nestedLog(fns[i].name, result);
      if (i === 0) {
        console.groupEnd();
      }
     }
    return result;
  };
  return f;
};
