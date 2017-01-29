const logByType = (type, functionName = 'anyonamous function', result) => {
  const canGroup = Object.prototype.hasOwnProperty.call(console, 'group');
  switch (type) {
    case 'startGroup': {
      if (canGroup) {
        console.group('Composition Output');
      } else {
        console.log('------------- Compostion Output ---------------------');
      }
      return;
    }
    case 'nestedLog': {
      const functionNameToDisplay = functionName ? functionName : 'Anyonamous Function';
      if (canGroup) {
        console.group(functionNameToDisplay);
        console.log(result);
        console.groupEnd();
      } else {
        console.log(`-------------${functionNameToDisplay} Output ---------------------`);
        console.log(result);
        console.log('-----------------------------------------------------------');
      }
      return;
    }
    case 'groupEnd': {
      if (canGroup) {
        console.groupEnd();
      } else {
        console.log('------------- Compostion End ---------------------');
      }
      return;
    }
    default:
      console.log('no type found');
      return;
  }
};

module.export = function(...args) {
  const fns = args;
  logByType('startGroup');
  function f(result) {
    let resultToDisplay = result;
    for (let i = fns.length - 1; i > -1; i--) {
      resultToDisplay = fns[i].call(this, resultToDisplay);
      logByType('nestedLog', fns[i].name, resultToDisplay);
      if (i === 0) {
        logByType('groupEnd');
      }
    }
    return result;
  }
  return f;
}
