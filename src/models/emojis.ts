/**
 * Raw emoji data.
 */
export interface RawEmojiData {
  [category: string]: { [codepoint: number]: string }
}

/**
 * Emojis codepoints organized by category, as in:
 * `{ category: [ codepoints ] }`.
 */
export interface EmojiCategory {
  /**
   * Emoji category.
   */
  [category: string]: number[]
}

/**
 * Emoji data.
 */
export interface EmojiData {
  /**
   * Emoji label.
   */
  label: string
  /**
   * Emoji category.
   */
  category: string
}

/**
 * Emojis data. Organized by codepoints as in:
 * `{ codepoint: { data } }`
 */
export interface AllEmojis {
  /**
   * Emoji codepoint.
   */
  [codepoint: number]: EmojiData
}

/**
 * Emoji data kept in the application store specifically for
 * loop rendering.
 */
export type EmojiStoreData = {
  /**
   * Emoji codepoint.
   */
  codepoint: number
  /**
   * Random unique key.
   */
  key: string
}

/**
 * Available emoji codepoints.
 */
export type ValidCodepoints = Extract<keyof AllEmojis, number>

/**
 * Available emoji categories.
 */
export type ValidCategories = Extract<keyof EmojiCategory, string>
