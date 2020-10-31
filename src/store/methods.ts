import { getCategory } from "@/assets/emojis";
import { ActiveEmoji, AllEmojis } from "@/assets/interfaces";
import { getRandomInt } from "@/utils/randomInt";
import state from "./state";

export function setDefault() {
  state.message = "Welcome";
  state.emojis.clear();
  state.emojis.set(0, {
    codepoint: "0x1F493",
    label: "Beating heart",
    category: "hearts"
  });
  state.emojis.set(1, {
    codepoint: "0x1F490",
    label: "Bouquet",
    category: "flowers"
  });
  state.emojis.set(2, {
    codepoint: "0x1F352",
    label: "Cherries",
    category: "fruits"
  });
  state.emojis.set(3, {
    codepoint: "0x1F30C",
    label: "Milky way",
    category: "astra"
  });
}

export function setEmoji(position: number, emojiData: ActiveEmoji) {
  state.emojis.set(position, emojiData);
}

export function shiftEmoji(position: number, category: keyof AllEmojis) {
  const validEmojis = getCategory(category);
  const index = getRandomInt(0, validEmojis.length);
  const newEmoji = validEmojis[index];
  console.log("newEmoji: ", newEmoji);

  setEmoji(position, {
    codepoint: newEmoji[0],
    label: newEmoji[1],
    category: category
  });
  console.log(state.emojis);
}
