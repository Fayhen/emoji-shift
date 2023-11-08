import type { EmojiShareParams } from '@/models/emojis'
/**
 * Validates whether the passed argument is a valid query
 * params object.
 *
 * @param obj Object to be validated.
 * @param strict Flag to perform a strict validation.
 * @returns `true` if the object is valid.
 */
export function isEmojiShareParamsObject(
  obj: Record<string, string>,
  strict = false
): obj is EmojiShareParams {
  const requiredParams = ['emojis', 'msg1', 'msg2']
  const objKeys = Object.keys(obj)
  return (
    requiredParams.every((param) => {
      return objKeys.includes(param) && typeof obj[param] === 'string'
    }) &&
    (strict
      ? objKeys.every((key) => {
          requiredParams.includes(key)
        })
      : true)
  )
}
