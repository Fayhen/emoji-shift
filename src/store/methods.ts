import { categoryNames, getCategory, retrieveAll } from "@/assets/emojis";
import { AllEmojis } from "@/assets/interfaces";
import {
  ValidCodepoints,
  ValidCategories,
  QueryParamsObject
} from "@/assets/types";
import { getRandomInt } from "@/utils/randomInt";
import state from "./state";

export function showToast(toastMsg: string) {
  state.toastMsg = toastMsg;
  state.showToast = true;
  setTimeout(() => {
    state.showToast = false;
  }, 3000);
}

export function loadEmojis() {
  if (state.allEmojis.size > 0) {
    state.allEmojis.clear();
  }
  const allEmojis: AllEmojis = retrieveAll();

  for (const [codepoint, emojiData] of Object.entries(allEmojis)) {
    state.allEmojis.set(codepoint, emojiData);
  }
}

export function setEmoji(position: number, codepoint: ValidCodepoints) {
  state.stagingEmojis.splice(position, 1, codepoint);
}

export function shiftEmoji(position: number, category: ValidCategories) {
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

export function insertAtIndex(index: number, emoji: ValidCodepoints) {
  state.stagingEmojis.splice(index, 0, emoji);
}

export function makeCopy(index: number, emoji: ValidCodepoints) {
  insertAtIndex(index, emoji);
}

export function randomEmojis() {
  const categories: ValidCategories[] = categoryNames();
  let randomIndex = 0;
  state.stagingEmojis = [];

  for (let i = 0; i < 4; i++) {
    randomIndex = getRandomInt(0, categories.length - 1);
    shiftEmoji(i, categories[randomIndex]);
  }
}

export function setDefault() {
  if (state.allEmojis.size === 0) {
    loadEmojis();
  }
  state.stagingMessage1 = "Welcome to emoji-shift!";
  state.stagingMessage2 = "Make your own emoji card!";
  randomEmojis();
}

export function generateQueryString() {
  const emojisParam = "?emojis=" + state.savedEmojis.toString();
  const message1Param = "&msg1=" + state.savedMessage1.replace(/\s+/g, "_");
  const message2Param = "&msg2=" + state.savedMessage2.replace(/\s+/g, "_");

  state.queryString = emojisParam + message1Param + message2Param;
}

export function parseQueryParameters(parameters: QueryParamsObject) {
  state.stagingMessage1 = parameters.msg1.replace(/_/g, " ");
  state.stagingMessage2 = parameters.msg2.replace(/_/g, " ");

  const validCodepoints: ValidCodepoints[] = Array.from(state.allEmojis.keys());
  const passedCodepoints: ValidCodepoints[] = [];
  const rawCodepoints: string[] = parameters.emojis.split(",");

  for (const codepoint of rawCodepoints) {
    if (validCodepoints.includes(codepoint)) {
      passedCodepoints.push(codepoint);
    }
  }

  state.stagingEmojis = passedCodepoints;
}

export function saveState() {
  state.savedMessage1 = state.stagingMessage1;
  state.savedMessage2 = state.stagingMessage2;
  state.savedEmojis = [...state.stagingEmojis];

  generateQueryString();
}

export function loadState() {
  if (state.savedEmojis.length === 0) {
    showToast("You haven't saved an emoji card yet.");
  } else {
    state.stagingMessage1 = state.savedMessage1;
    state.stagingMessage2 = state.savedMessage2;
    state.stagingEmojis = [...state.savedEmojis];

    showToast("Card loaded!");
  }
}

export function clearStage() {
  state.stagingMessage1 = "";
  state.stagingMessage2 = "";
  state.stagingEmojis = [];
}

export function clearSave() {
  state.savedMessage1 = "";
  state.savedMessage2 = "";
  state.savedEmojis = [];
  state.queryString = "";
}
