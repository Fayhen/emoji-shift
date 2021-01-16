import { AllEmojis, EmojiCategory } from "@/assets/interfaces";

export type ValidCodepoints = Extract<keyof AllEmojis, string>;

export type ValidCategories = Extract<keyof EmojiCategory, string>;

export type StringMap = { [k: string]: string };

export type QueryParamsObject = StringMap & {
  emojis: string;
  msg1: string;
  msg2: string;
};
