import getMethodDescriptor from './helpers/getMethodDescriptor'

import logInvocation from './loggers/invocation'
import logResult from './loggers/result'
import logError from './loggers/error'


/**
 * Class methods invocation logging decorator outer
 *
 * @param {Object|Function} [param={}]
 *
 * @returns {Function}
 */
export default function cmildOuter (param = {}) {

  /**
   * Class methods invocation logging decorator inner
   *
   * @param {Object}   [options.styles={}]
   * @param {String}   [options.enabled=true]
   * @param {Object}   [options.styles.browser={}]
   * @param {String}   [options.styles.browser.invocation='background: #F2EAFF; color: #03A9F4; font-weight: bold']
   * @param {String}   [options.styles.browser.result='background: #F2EAFF; color: #4CAF50; font-weight: bold']
   * @param {String}   [options.styles.browser.error='background: #F2EAFF; color: #F20404; font-weight: bold']
   * @param {Object}   [options.styles.node={}]
   * @param {String}   [options.styles.node.invocation='bgBlack.blue.bold']
   * @param {String}   [options.styles.node.result='bgBlack.green.bold']
   * @param {String}   [options.styles.node.error='bgBlack.red.bold']
   * @param {Function} target
   */
  function cmildInner ({
    enabled = true,
    styles = {
      browser: {
        invocation: 'background: #F2EAFF; color: #03A9F4; font-weight: bold',
        result: 'background: #F2EAFF; color: #4CAF50; font-weight: bold',
        error: 'background: #F2EAFF; color: #F20404; font-weight: bold',
      },
      node: {
        invocation: 'bgBlack.blue.bold',
        result: 'bgBlack.green.bold',
        error: 'bgBlack.red.bold',
      },
    },
  } = {}, target) {

    if (typeof target !== 'function') {
      throw TypeError('`target` decorator param should be a class function!')
    }

    if (! enabled) {
      return
    }

    for (const propertyName of Reflect.ownKeys(target.prototype)) {
      const propertyValue = target.prototype[propertyName]
      const isMethod = propertyValue instanceof Function

      if (! isMethod) {
        // eslint-disable-next-line no-continue
        continue
      }

      const descriptor = getMethodDescriptor(target, propertyName)
      const originalMethod = descriptor.value

      descriptor.value = function decorate (...args) {
        const classMethod = `${target.name}#${originalMethod.name}`

        const logI = logInvocation.bind(null, classMethod, styles[process.browser ? 'browser' : 'node'].invocation)
        const logR = logResult.bind(null, classMethod, styles[process.browser ? 'browser' : 'node'].result)
        const logE = logError.bind(null, classMethod, styles[process.browser ? 'browser' : 'node'].error)

        logI(...args)

        let result

        try {
          result = Reflect.apply(originalMethod, this, args)

          const isPromise = (
            result instanceof Promise ||
            Promise.resolve(result) === result ||
            (
              typeof result === 'object' &&
              result.constructor &&
              result.constructor.name === 'Promise'
            )
          )

          if (isPromise) {
            result.then(logR).catch(logE)
          } else {
            logR(result)
          }
        } catch (error) {
          logE(error)
          throw error
        }

        return result
      }

      Reflect.defineProperty(target.prototype, propertyName, descriptor)
    }
  }

  if (typeof param === 'function') {
    return cmildInner({}, param)
  }

  return cmildInner.bind(cmildInner, param)
}
