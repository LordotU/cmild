/**
 * Returns target method descriptor
 *
 * @param {Function} target
 * @param {String} propertyName
 *
 * @returns {Object}
 */
export default function getMethodDescriptor (target, propertyName) {
  if (Reflect.ownKeys(target).includes(propertyName)) {
    return Reflect.getOwnPropertyDescriptor(target.prototype, propertyName)
  }

  return {
    configurable: true,
    enumerable: true,
    writable: true,
    value: target.prototype[propertyName],
  }
}
