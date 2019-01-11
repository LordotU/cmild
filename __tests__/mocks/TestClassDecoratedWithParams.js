import Cmild from '../../src'


@Cmild({
  styles: {
    browser: {
      invocation: 'background: #03A9F4; color: #FFFFFF; font-weight: italic',
      result: 'background: #4CAF50; color: #FFFFFF; font-weight: italic',
      error: 'background: #F20404; color: #FFFFFF; font-weight: italic',
    },
    node: {
      invocation: 'bgBlue.white.italic',
      result: 'bgGreen.white.italic',
      error: 'bgRed.white.italic',
    },
  }
})
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
