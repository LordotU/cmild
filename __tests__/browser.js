/* eslint-disable no-undef */

process.browser = true

import mockConsole from 'jest-mock-console'

import TestClassDecoratedWithoutParams from './mocks/TestClassDecoratedWithoutParams'
import TestClassDecoratedWithParams from './mocks/TestClassDecoratedWithParams'


describe('Cmild for Browser', () => {

  describe('Without params', () => {

    let outputs
    let instance

    beforeEach(() => {
      outputs = []

      mockConsole({
        debug: (...args) => outputs.push([...args]),
      })

      instance = new TestClassDecoratedWithoutParams()
    })

    test('Logs non-async methods', async () => {

      const testArgValue = 'testArgValue'
      expect(instance.testMethod1(testArgValue)).toBe(testArgValue)

      const erroredArgValue = 'erroredArgValue'
      expect(() => instance.erroredMethod1(erroredArgValue)).toThrowError(erroredArgValue)

      expect(outputs).toMatchSnapshot()
    })

    test('Logs async methods', async () => {

      const testArgValue1 = 'testArgValue1'
      const testArgValue2 = 'testArgValue2'
      await expect(instance.testMethod2(testArgValue1, testArgValue2)).resolves.toBe(`${testArgValue1} ${testArgValue2}`)

      const erroredArgValue1 = 'erroredArgValue1'
      const erroredArgValue2= 'erroredArgValue2'
      await expect(instance.erroredMethod2(erroredArgValue1, erroredArgValue2)).rejects.toThrowError(`${erroredArgValue1} ${erroredArgValue2}`)

      expect(outputs).toMatchSnapshot()
    })
  })

  describe('With params', () => {

    let outputs
    let instance

    beforeEach(() => {
      outputs = []

      mockConsole({
        debug: (...args) => outputs.push([...args]),
      })

      instance = new TestClassDecoratedWithParams()
    })

    test('Logs non-async methods', async () => {

      const testArgValue = 'testArgValue'
      expect(instance.testMethod1(testArgValue)).toBe(testArgValue)

      const erroredArgValue = 'erroredArgValue'
      expect(() => instance.erroredMethod1(erroredArgValue)).toThrowError(erroredArgValue)

      expect(outputs).toMatchSnapshot()
    })

    test('Logs async methods', async () => {

      const testArgValue1 = 'testArgValue1'
      const testArgValue2 = 'testArgValue2'
      await expect(instance.testMethod2(testArgValue1, testArgValue2)).resolves.toBe(`${testArgValue1} ${testArgValue2}`)

      const erroredArgValue1 = 'erroredArgValue1'
      const erroredArgValue2= 'erroredArgValue2'
      await expect(instance.erroredMethod2(erroredArgValue1, erroredArgValue2)).rejects.toThrowError(`${erroredArgValue1} ${erroredArgValue2}`)

      expect(outputs).toMatchSnapshot()
    })
  })

})
