import Cmild from '../../src'


@Cmild
export default class TestClass {
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
