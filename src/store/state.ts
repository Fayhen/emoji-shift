import { reactive } from "vue";
import { EmojiData } from "@/assets/interfaces";
import { ValidCodepoints } from "@/assets/types";

// allEmojis is category: { codepoint: label }
const state = reactive<{
  queryString: string;
  stagingMessage1: string;
  stagingMessage2: string;
  savedMessage1: string;
  savedMessage2: string;
  allEmojis: Map<string, EmojiData>;
  stagingEmojis: ValidCodepoints[];
  savedEmojis: ValidCodepoints[];
}>({
  queryString: "",
  stagingMessage1: "",
  stagingMessage2: "",
  savedMessage1: "",
  savedMessage2: "",
  allEmojis: new Map<string, EmojiData>(),
  stagingEmojis: new Array<ValidCodepoints>(),
  savedEmojis: new Array<ValidCodepoints>()
});

export { state as default };
