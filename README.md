# Class methods invocation logging decorator

[![License](https://img.shields.io/badge/License-MIT-000000.svg)](https://opensource.org/licenses/MIT)
[![Coverage Status](https://coveralls.io/repos/github/LordotU/cmild/badge.svg)](https://coveralls.io/github/LordotU/cmild)

## Description

Decorator for simply and colorful (in Chrome, FF and Node) logging class methods invocation, returned results and possible errors. [colors.js](https://www.npmjs.com/package/colors) is using for Node.

## Installation

```bash
yarn add cmild
```

## Testing

```bash
yarn test:jest # Runs Jest with coverage collection
yarn test:coverage # Sends coverage to .coveralls.io
yarn test # yarn test:jest && yarn test:coverage
```

## Usage

You may decorate your class with default styles params, which are:

```javascript
  {
    styles: {
      browser: {
        invocation: 'background: #F2EAFF; color: #03A9F4; font-weight: bold',
        result: 'background: #F2EAFF; color: #4CAF50; font-weight: bold',
        error: 'background: #F2EAFF; color: #F20404; font-weight: bold',
      },
      node: {
        invocation: 'bgBlack.blue.bold',
        result: 'bgBlack.green.bold',
        error: 'bgBlack.red.bold',
      }
    }
  }
```

Or set your own styles by passing object as a first argument of decorator, for example:

```javascript
  @Cmild({
    styles: {
      browser: {
        invocation: 'background: #F2EAFF; color: #FFEF00; font-weight: bold',
      }
    },
  })
```

```javascript
import Cmild from 'cmild'


@Cmild
class TestClass {
  testMethod1 (testArg = '') {
    return testArg
  }
  async testMethod2 (testArg1 = '', testArg2 = '') {
    return `${testArg1} ${testArg2}`
  }
  erroredMethod1 (erroredArg = '') {
    throw new Error(this.testMethod1(erroredArg))
  }
  async erroredMethod2 (erroredArg1 = '', erroredArg2 = '') {
    throw new Error(await this.testMethod2(erroredArg1, erroredArg2))
  }
}

const instance = new TestClass()

// Frist method invocation and result printing
console.log(instance.testMethod1('testArg'))

// Second method invocation and result printing when returned promise is resolved
instance.testMethod2('testArg1', 'testArg2').then(console.log)

// Third method invocation and error catching
try {
  instance.erroredMethod1('erroredArg')
} catch (error) {
  console.error(error)
}

// Fourth method invocation and error cathing when returned promise is rejected
instance.erroredMethod2('erroredArg1', 'erroredArg2').catch(console.error)
```
