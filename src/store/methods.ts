import { getCategory, retrieveAll } from "@/assets/emojis";
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
