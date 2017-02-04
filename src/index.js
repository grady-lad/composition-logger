const canCallGroup = Object.prototype.hasOwnProperty.call(console, 'group');

const logByType = (type, outputPos, result) => {
  switch (type) {
    case 'startGroup': {
      if (canCallGroup) {
        console.group('Composition Output \n');
      } else {
        console.log('------------- Compostion Output ---------------------');
      }
      return;
    }
    case 'startNestedGroup': {
      if (canCallGroup) {
        console.groupCollapsed(`${outputPos} output`);
      } else {
        console.log(`------------- ${outputPos} output ---------------------`);
      }
      return;
    }
    case 'logOutput': {
      if (canCallGroup) {
        console.groupCollapsed(`${outputPos} output`);
        console.log(result);
        console.groupEnd();
      } else {
        console.log(`-------------${outputPos} output ---------------------`);
        console.log(result);
        console.log('-----------------------------------------------------------');
      }
      return;
    }
    case 'groupEnd': {
      if (canCallGroup) {
        console.groupEnd();
      } else {
        console.log('------------- Compostion End ---------------------');
      }
      return;
    }
    default:
      console.error('no type found');
      return;
  }
};

const getOrdinalSuffix = (pos) => {
  let j = pos % 100;
  let k = pos % 10;
  if (j === 1 && k !== 11) {
    return `${pos}st`
  }
  if (j === 2 && k !== 12) {
    return `${pos}nd`
  }
  if (j === 3 && k !== 13) {
    return `${pos}rd`
  }
  return `${pos}th`
};

const handleError = (err, closeGroup) => {
  if (err) {
    if (canCallGroup) {
      closeGroup('groupEnd'); // need to groupEnd to avoid endless nesting when errors occur.
    }
    console.error(err);
    throw err; // throw the users error.
  }
};

/**
Check used to determine whether or not to spread the arguments to a function.
Only done on the entry function within a compose as it can have multiple arguments.
**/
const isFirst = (idx, length) => idx === (length - 1);

module.exports = function composeWithLogs (...args) {
  const fns = args; // fns for our composition.
  function f (...data) { // Need to spread because many arguments could be passed initially.
    logByType('startGroup');
    const initialArguments = data;
    let resultToDisplay; // result of a func within the composition to ouput to console.
    let pos = 1; // used to identify which step in the compose we are on (for display purposes).
    try {
      for (let i = fns.length - 1; i > -1; i--) {
        if (isFirst(i, fns.length)) {
          resultToDisplay = fns[i].call(this, ...initialArguments);
        } else {
          resultToDisplay = fns[i].call(this, resultToDisplay);
        }
        logByType('logOutput', getOrdinalSuffix(pos), resultToDisplay);
        pos++;
      }
      logByType('groupEnd');
    } catch (err) {
      handleError(err, logByType);
    }
    return resultToDisplay;
  }
  return f;
}
