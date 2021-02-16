import { AllEmojis, EmojiCategory } from "@/assets/interfaces";

export type ValidCodepoints = Extract<keyof AllEmojis, string>;

export type ValidCategories = Extract<keyof EmojiCategory, string>;

export type StringMap = { [k: string]: string };

export type QueryParamsObject = {
  emojis: string;
  msg1: string;
  msg2: string;
};

export function isQueryParamsObject(
  obj: StringMap,
  strict: boolean = false
): obj is QueryParamsObject {
  const requiredParams = ["emojis", "msg1", "msg2"];
  const objKeys = Object.keys(obj);
  return (
    requiredParams.every((param) => {
      return objKeys.includes(param) && typeof obj[param] === "string";
    }) && (
      strict ? objKeys.every((key) => {requiredParams.includes(key)}) : true
    )
  );
}
