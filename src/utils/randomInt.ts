/**
 * Returns a random integer between a given range.
 *
 * @param min Range minimum.
 * @param max Range maximum.
 * @returns Random integer.
 */
export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min)
}
