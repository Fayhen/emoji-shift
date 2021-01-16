import { reactive } from "vue";
import { EmojiData } from "@/assets/interfaces";
import { ValidCodepoints } from "@/assets/types";

// allEmojis is category: { codepoint: label }
const state = reactive<{
  queryString: string;
  message1: string;
  message2: string;
  allEmojis: Map<string, EmojiData>;
  activeEmojis: ValidCodepoints[];
}>({
  queryString: "",
  message1: "",
  message2: "",
  allEmojis: new Map<string, EmojiData>(),
  activeEmojis: new Array<ValidCodepoints>()
});

export { state as default };
