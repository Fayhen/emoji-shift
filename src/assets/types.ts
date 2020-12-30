import { AllEmojis, EmojiCategory } from "@/assets/interfaces";

export type ValidCodepoints = Extract<keyof AllEmojis, string>;

export type ValidCategories = Extract<keyof EmojiCategory, string>;
