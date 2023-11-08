/**
 * Returns a random string between a given range.
 *
 * @param min Range minimum.
 * @param max Range maximum.
 * @returns Random integer.
 */
export function getRandomStr(length: number): string {
  return [...Array(length)].map(() => Math.random().toString(36)[2]).join('')
}
