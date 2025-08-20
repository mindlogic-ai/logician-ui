/**
 * Find the key in an object that corresponds to a given value
 * @param obj - The object to search in
 * @param value - The value to find the key for
 * @returns The key that matches the value, or undefined if not found
 */
export const findKeyByValue = <T extends Record<string, unknown>>(
  obj: T,
  value: unknown
): keyof T | undefined => {
  for (const [key, val] of Object.entries(obj)) {
    if (val === value) {
      return key as keyof T;
    }
  }
  return undefined;
};
