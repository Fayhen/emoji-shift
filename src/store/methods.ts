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
  state.stagingMessage1 = "Hello there";
  state.stagingMessage2 = "So Long";
  state.stagingEmojis = [];
  state.stagingEmojis.push("0x1F493");
  state.stagingEmojis.push("0x1F490");
  state.stagingEmojis.push("0x1F352");
  state.stagingEmojis.push("0x1F30C");
}

export function setEmoji(position: number, codepoint: ValidCodepoints) {
  state.stagingEmojis.splice(position, 1, codepoint);
}

export function shiftEmoji(position: number, category: ValidCodepoints) {
  const codepoints = getCategory(category);
  const index = getRandomInt(0, codepoints.length);
  const newEmoji = codepoints[index];
  console.log("newEmoji: ", newEmoji);

  setEmoji(position, newEmoji);
  console.log(state.stagingEmojis);
}

export function removeEmoji(position: number) {
  state.stagingEmojis.splice(position, 1);
}

export function moveLeft(position: number) {
  console.log("Moving left from position", position);
  if (position > 0) {
    const currentEmoji: string | undefined = state.stagingEmojis[position];
    const leftEmoji: string | undefined = state.stagingEmojis[position - 1];

    if (currentEmoji != undefined && leftEmoji != undefined) {
      setEmoji(position - 1, currentEmoji);
      setEmoji(position, leftEmoji);
    }
  }
}

export function moveRight(position: number) {
  console.log("Moving right from position", position);
  if (position < state.stagingEmojis.length) {
    const currentEmoji: string | undefined = state.stagingEmojis[position];
    const rightEmoji: string | undefined = state.stagingEmojis[position + 1];

    if (currentEmoji != undefined && rightEmoji != undefined) {
      setEmoji(position + 1, currentEmoji);
      setEmoji(position, rightEmoji);
    }
  }
}

export function saveState() {
  state.savedMessage1 = state.stagingMessage1;
  state.savedMessage2 = state.stagingMessage2;
  state.savedEmojis = [...state.stagingEmojis];
}

export function loadState() {
  state.stagingMessage1 = state.savedMessage1;
  state.stagingMessage2 = state.savedMessage2;
  state.stagingEmojis = [...state.savedEmojis];
}

export function generateQueryString() {
  const emojisParam = "?emojis=" + state.savedEmojis.toString();
  const message1Param = "&msg1=" + state.savedMessage1.replace(/\s+/g, "-");
  const message2Param = "&msg2=" + state.savedMessage2.replace(/\s+/g, "-");

  state.queryString = emojisParam + message1Param + message2Param;
}

export function parseQueryParameters(parameters: QueryParamsObject) {
  state.stagingMessage1 = parameters.msg1.replace("-", " ");
  state.stagingMessage2 = parameters.msg2.replace("-", " ");
  state.stagingEmojis = parameters.emojis.split(",");
}
