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
      styles,
      error,
    )
  } else {
    const colors = require('colors/safe')
    const _get = require('lodash.get')
    const _styles = _get(colors, styles)

    if (typeof _styles !== 'function') {
      throw TypeError(`Cannot find given style chain '${styles}' in colors.js!`)
    }

    console.debug(
      `${_styles(`${classMethod} error:`)} %O`,
      error,
    )
  }
}
