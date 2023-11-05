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
 * Available emoji codepoints.
 */
export type ValidCodepoints = Extract<keyof AllEmojis, number>

/**
 * Available emoji categories.
 */
export type ValidCategories = Extract<keyof EmojiCategory, string>
