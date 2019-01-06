/**
 * Logs the error occured during the method invocation
 *
 * @param {String} classMethod
 * @param {String} styles
 * @param {*} error
 */
export default function logError (classMethod, styles, error) {
  if (process.browser) {
    console.debug(
      `%c ${classMethod} error: %O`,
      typeof styles === 'string' && !! styles ? styles : 'background: #F2EAFF; color: #F20404; font-weight: bold',
      error,
    )
  } else {
    const colors = require('colors/safe')
    const _get = require('lodash.get')
    const _styles = _get(colors, styles)

    console.debug(
      `${(_styles || colors.bgBlack.red.bold)(`${classMethod} error:`)} %O`,
      error,
    )
  }
}
