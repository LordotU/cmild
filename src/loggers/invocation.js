/**
 * Logs the invocation of the method
 *
 * @param {String} classMethod
 * @param {String} styles
 * @param  {...*} args
 */
export default function logInvocation (classMethod, styles, ...args) {
  if (process.browser) {
    console.debug(
      `%c ${classMethod} given arguments: %O`,
      styles,
      [...args],
    )
  } else {
    const colors = require('colors/safe')
    const _get = require('lodash.get')
    const _styles = _get(colors, styles)

    if (typeof _styles !== 'function') {
      throw TypeError(`Cannot find given style chain '${styles}' in colors.js!`)
    }

    console.debug(
      `${_styles(`${classMethod} arguments:`)} %O`,
      [...args],
    )
  }
}
