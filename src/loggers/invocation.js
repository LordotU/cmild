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
      typeof styles === 'string' && !! styles ? styles : 'background: #F2EAFF; color: #03A9F4; font-weight: bold',
      [...args],
    )
  } else {
    const colors = require('colors/safe')
    const _get = require('lodash.get')
    const _styles = _get(colors, styles)

    console.debug(
      `${(_styles || colors.bgBlack.blue.bold)(`${classMethod} arguments:`)} %O`,
      [...args],
    )
  }
}
