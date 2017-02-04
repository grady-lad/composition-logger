# Composition Logger

To install (recommended to save as a dev dependency)
```
npm install composition-logger --save dev
```

When first working with functional compositions it can be daunting or difficult to visualise the data flow between each step of the composition.

Sometimes for developers who are experienced with using functional compositions it can sometimes be a tedious experience debugging or outputting the result after each step within the composition.

Usually a developer may have some helper function on stand by to help with logging the output of a composition, such as:

```javascript
 export const trace = tag => output => {
  console.log(`--------${tag}---------`, output);
  return output;
};
```
By using `console.group` we can view the data that passes through our compositions in a more clearer and understandable format.

Consider the following example

```javascript
import composeWithLogs from 'composition-logger';

const divideByTwo = data => data / 2;
const sum = data => data.reduce((a, b) => a + b);
const addOne = data => data + 1;
const map = f => arr => arr.map(f);
composeWithLogs(
  divideByTwo,
  sum,
  map(addOne)
)([1, 4, 5, 6, 7]);
```

By replacing which ever compose function you are using with the compose function provided by this module it would yield the result below. Which is basically a `console.group` with nested groups for each function within the composition.

![alt-text](https://s3-eu-west-1.amazonaws.com/composition-logger/complogger.png)

## Things To Note
- This module is focused towards a browser environment as it supports `console.group`
- Node does not support `console.group`, so a basic `console.log` is used instead, you should only see this when running the composition logger within a node env, e.g Intial render for sever side rendering.
- This module composes from right to left and will not work with functions such as `flow`.
- This module focuses on outputting the steps at the root level of a composition. 
