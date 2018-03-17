# Composition Logger

## [![composition-logger](media/logo.png)](https://github.com/grady-lad/composition-logger)

### Installation

To install ( _recommended to save as a dev dependency_ )

`npm install composition-logger --save -dev`

### What is this?

From all the resources that I have seen, the recommended way to debug functional compositions in JavaScript is to provide a function that produces a side effect such as logging to the console and continue to pass the data through the composition, such as the trace function below.

This is all well and good but it poses a few limitations such as:

* Not beginner friendly. Beginners need to understand how functional composition works in order to debug or gain insight in how the data flows through a composition.

* Debugging methods such as `trace` can be tedious to work with. Let's say your composition contains a bug, in order to view the data between each step of the compositon, you would be required to manually add the `trace` function between each step of the composition.

So how can we do better? By utilising [console.group](https://developer.mozilla.org/en-US/docs/Web/API/Console/group) and this is exactly what composition-logger does.

composition-logger logs each step of your composition in an organised manner without interuptting the data flow of your composition, making it effortless to debug and giving you continuous insight into your functional compositions.

### Usage

composition-logger exposes two functions:

* `pipeWithLogs`: Compose from left to right [see pipe](http://ramdajs.com/docs/#pipe)

* `composeWithLogs`: Compose from right to left [see compose](http://ramdajs.com/docs/#compose)

#### Pipe

```javascript
import { pipeWithLogs } from "composition-logger";

const divideByTwo = data => data / 2;

const sum = data => data.reduce((a, b) => a + b);

const addOne = data => data.map(item => item + 1);

const performCalculation = pipeWithLogs(addOne, sum, divideByTwo);

performCalculation([1, 4, 5, 6, 7]);
```

The above example will log the following to the browser:

<div align="left">
  <img src="media/compositionOutput.png" width="700" />
</div>

#### Compose

```javascript
import { composeWithLogs } from "composition-logger";

const divideByTwo = data => data / 2;

const sum = data => data.reduce((a, b) => a + b);

const addOne = data => data.map(item => item + 1);

const performCalculation = composeWithLogs(divideByTwo, sum, addOne);

performCalculation([1, 4, 5, 6, 7]);
```

The above example will log the following to the browser:

<div align="left">
  <img src="media/compositionOutput.png" width="700" />
</div>
