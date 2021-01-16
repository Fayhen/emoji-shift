import { getCategory, retrieveAll } from "@/assets/emojis";
import { QueryParamsObject } from "@/assets/types";
import { AllEmojis } from "@/assets/interfaces";
import { ValidCodepoints } from "@/assets/types";
import { getRandomInt } from "@/utils/randomInt";
import state from "./state";

export function loadEmojis() {
  console.log("Calling loadEmojis from methods.ts...");
  if (state.allEmojis.size > 0) {
    state.allEmojis.clear();
  }
  const allEmojis: AllEmojis = retrieveAll();

  for (const [codepoint, emojiData] of Object.entries(allEmojis)) {
    state.allEmojis.set(codepoint, emojiData);
  }
}

export function setDefault() {
  state.message1 = "Hello there";
  state.message2 = "So Long";
  state.activeEmojis = [];
  state.activeEmojis.push("0x1F493");
  state.activeEmojis.push("0x1F490");
  state.activeEmojis.push("0x1F352");
  state.activeEmojis.push("0x1F30C");
}

export function setEmoji(position: number, codepoint: ValidCodepoints) {
  state.activeEmojis.splice(position, 1, codepoint);
}

export function shiftEmoji(position: number, category: ValidCodepoints) {
  const codepoints = getCategory(category);
  const index = getRandomInt(0, codepoints.length);
  const newEmoji = codepoints[index];
  console.log("newEmoji: ", newEmoji);

  setEmoji(position, newEmoji);
  console.log(state.activeEmojis);
}

export function removeEmoji(position: number) {
  state.activeEmojis.splice(position, 1);
}

export function generateQueryString() {
  const emojisParam = "?emojis=" + state.activeEmojis.toString();
  const message1Param = "&msg1=" + state.message1.replace(/\s+/g, "-");
  const message2Param = "&msg2=" + state.message2.replace(/\s+/g, "-");

  state.queryString = emojisParam + message1Param + message2Param;
}

export function parseQueryParameters(parameters: QueryParamsObject) {
  state.message1 = parameters.msg1.replace("-", " ");
  state.message2 = parameters.msg2.replace("-", " ");
  state.activeEmojis = parameters.emojis.split(",");
}
