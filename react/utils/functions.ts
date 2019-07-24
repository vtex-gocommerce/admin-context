/**
 * Remove a value in a array passing the element
 * Return a new array
 */
const removeValueInArrayNoIndex = <T>(elemet: T, array: T[]) => {
  const elementIndex = array.indexOf(elemet)
  return elementIndex !== -1 ? [...array.slice(0, elementIndex), ...array.slice(elementIndex + 1, array.length)] : array
}

/**
 * add unique value to array
 * Return a new array
 */
const addUniqueToArray = <T>(elemet: T, array: T[]) => {
  const elementIndex = array.indexOf(elemet)
  return elementIndex !== -1 ? array : [...array, elemet]
}

export default {
  removeValueInArrayNoIndex,
  addUniqueToArray
}
