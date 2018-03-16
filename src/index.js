const canCallGroup = Object.prototype.hasOwnProperty.call(console, "group");

const logByType = (type, outputPos, result) => {
  switch (type) {
    case "startGroup": {
      if (canCallGroup) {
        console.group("Composition Output \n");
      } else {
        console.log("------------- Compostion Output ---------------------");
      }
      return;
    }
    case "startNestedGroup": {
      if (canCallGroup) {
        console.groupCollapsed(`${outputPos} output`);
      } else {
        console.log(`------------- ${outputPos} output ---------------------`);
      }
      return;
    }
    case "logOutput": {
      if (canCallGroup) {
        console.groupCollapsed(`${outputPos} output`);
        console.log(result);
        console.groupEnd();
      } else {
        console.log(`-------------${outputPos} output ---------------------`);
        console.log(result);
        console.log(
          "-----------------------------------------------------------"
        );
      }
      return;
    }
    case "groupEnd": {
      if (canCallGroup) {
        console.groupEnd();
      } else {
        console.log("------------- Compostion End ---------------------");
      }
      return;
    }
    default:
      console.error("no type found");
      return;
  }
};

const getOrdinalSuffix = pos => {
  let j = pos % 100;
  let k = pos % 10;
  if (j === 1 && k !== 11) {
    return `${pos}st`;
  }
  if (j === 2 && k !== 12) {
    return `${pos}nd`;
  }
  if (j === 3 && k !== 13) {
    return `${pos}rd`;
  }
  return `${pos}th`;
};

const handleError = (err, closeGroup) => {
  if (err) {
    if (canCallGroup) {
      closeGroup("groupEnd"); // need to groupEnd to avoid endless nesting when errors occur.
    }
    console.error(err);
    throw new Error(err); // throw the users error.
  }
};

export function pipeWithLogs(...fns) {
  const length = fns ? fns.length : 0;
  if (length === 0) {
    throw new Error("pipe requires at least one function as an argument");
  }
  return function(...data) {
    let index = 0;
    let pos = 1; // ordinal position of the pipe operation
    let result;
    logByType("startGroup");
    try {
      result = length ? fns[index].apply(this, data) : data[0];
      logByType("logOutput", getOrdinalSuffix(pos), result);
      while (++index < length) {
        pos++;
        result = fns[index].call(this, result);
        logByType("logOutput", getOrdinalSuffix(pos), result);
      }
    } catch (err) {
      handleError(err, logByType);
    }
    logByType("groupEnd");
    return result;
  };
}

export function composeWithLogs(...fns) {
  const length = fns ? fns.length : 0;
  if (length === 0) {
    throw new Error("compose requires at least one function as an argument");
  }
  return pipeWithLogs(fns.reverse());
}
