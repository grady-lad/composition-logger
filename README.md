# Composition Logger

When first working with functional compositions it can be daunting or difficult to understand what is happening between each step of the composition.

Sometimes for a developer whos is experienced with functional compositions it can sometimes be a tedious experience debugging or outputting the result after each step within the composition.

Usually you have some helper function on stand by to help with logging the output of your composition such as:

```javascript
 export const trace = tag => output => {
  console.log(`--------${tag}---------`, output);
  return x;
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

By replacing which ever compose function your are using with the compose function provided by this package it would yield the result below, which is basically a `console.group` with nested groups for each function within the composition.

![alt-text](https://s3-eu-west-1.amazonaws.com/composition-logger/composition-logger-output.png)

## TODOS And Things To Note
- Node does not support console.group, so I am using a basic `console.log` instead, you should only see this when running the composition logger within a node env, e.g Intial render for sever side rendering.

- If a function within the composition returns another function, currently that function will be displayed as 'anonymous' ideally we could display the name or some how tag that function.

- Maybe implement the ability to pass configurations, such as:
  - Collapse all nested groups.
  - Display objects within tables.
  - Include/exclude functions within the composition.
