import { reactive } from "vue";
import { ActiveEmoji } from "@/assets/interfaces";

const state = reactive<{
  message1: string;
  message2: string;
  emojis: Map<number, ActiveEmoji>;
}>({
  message1: "",
  message2: "",
  emojis: new Map<number, ActiveEmoji>()
});

export { state as default };
