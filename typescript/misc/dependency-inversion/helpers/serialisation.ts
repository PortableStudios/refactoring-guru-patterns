export const deserialiseBoolean = (str: string): boolean => {
  if (str === "True") { return true }
  return false
}
