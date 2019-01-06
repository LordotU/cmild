/**
 * Logs the result of the method invocation
 *
 * @param {String} classMethod
 * @param {String} styles
 * @param {*} result
 */
export default function logResult (classMethod, styles, result) {
  if (process.browser) {
    console.debug(
      `%c ${classMethod} result: %O`,
      typeof styles === 'string' && !! styles ? styles : 'background: #F2EAFF; color: #4CAF50; font-weight: bold',
      result,
    )
  } else {
    const colors = require('colors/safe')
    const _get = require('lodash.get')
    const _styles = _get(colors, styles)

    console.debug(
      `${(_styles || colors.bgBlack.green.bold)(`${classMethod} result:`)} %O`,
      result,
    )
  }
}
