export interface RawEmojiData {
  [category: string]: { [codepoint: string]: string };
}

// EmojiCategory is an object with arrays of respective codepoints as in:
// { category: [ codepoints ] }
export interface EmojiCategory {
  [category: string]: string[];
}

// EmojiData is an object with data for a given emoji
export interface EmojiData {
  label: string;
  category: string;
}

// AllEmojis is an object with all emojis as in:
// { category: { codepoint: label } }
export interface AllEmojis {
  [codepoint: string]: EmojiData;
}
