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
      styles,
      result,
    )
  } else {
    const colors = require('colors/safe')
    const _get = require('lodash.get')
    const _styles = _get(colors, styles)

    if (typeof _styles !== 'function') {
      throw TypeError(`Cannot find given style chain '${styles}' in colors.js!`)
    }

    console.debug(
      `${_styles(`${classMethod} result:`)} %O`,
      result,
    )
  }
}
