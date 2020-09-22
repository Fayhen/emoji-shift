import { getCategory } from "@/assets/emojis";
import { AllEmojis } from "@/assets/interfaces";
import { getRandomInt } from "@/utils/randomInt";
import state from "./state";

export function setDefault() {
  state.message = "Welcome";
  state.emojis.clear();
  state.emojis.set(0, {
    position: 0,
    codepoint: "0x2764",
    label: "Red heart",
    category: "hearts"
  });
  state.emojis.set(1, {
    position: 1,
    codepoint: "0x1F49A",
    label: "Green heart",
    category: "hearts"
  });
  state.emojis.set(2, {
    position: 2,
    codepoint: "0x1F48C",
    label: "Heart envelope",
    category: "hearts"
  });
  state.emojis.set(3, {
    position: 3,
    codepoint: "0x1F49D",
    label: "Heart with ribbon",
    category: "hearts"
  });
  // state.emojis.set(1, ["0x1F49A", "Green heart"]);
  // state.emojis.set(2, ["0x1F48C", "Heart envelope"]);
  // state.emojis.set(3, ["0x1F49D", "Heart with ribbon"]);
  console.log("Default set.");
}

export function shiftEmoji(
  id: number,
  position: number,
  category: keyof AllEmojis
) {
  const validEmojis = getCategory(category);
  const index = getRandomInt(0, validEmojis.length)
  const newEmoji = validEmojis[index];
  console.log("newEmoji: ", newEmoji);
  state.emojis.set(id, {
    position: position,
    codepoint: newEmoji[0],
    label: newEmoji[1],
    category: category
  });
  console.log(state.emojis);
}

// export function getEmojiArray() {
//   const emojiArray: [number, number, string] = [];
//   state.emojis.forEach((emoji: [number, string], position: number) => {
//     emojiArray.push(position, ...emoji);
//   });
//   console.log(emojiArray);

//   return emojiArray;
// }
