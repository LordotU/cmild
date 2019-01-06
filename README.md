# Class methods invocation logging decorator

[![License](https://img.shields.io/badge/License-MIT-000000.svg)](https://opensource.org/licenses/MIT)
[![Coverage Status](https://coveralls.io/repos/github/LordotU/cmild/badge.svg)](https://coveralls.io/github/LordotU/cmild)

## Description

Decorator for simply logging class methods invocation, returned results and possible errors.

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

console.log(instance.testMethod1('testArg'))
instance.testMethod1('testArg1', 'testArg2').then(console.log)

try {
  instance.erroredMethod1('erroredArg')
} catch (error) {
  console.error(error)
}
instance.erroredMethod2('erroredArg1', 'erroredArg2').catch(console.error)
```
