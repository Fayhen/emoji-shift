import { reactive } from "vue";
import { ActiveEmoji } from "@/assets/interfaces";

const state = reactive<{
  message: string;
  emojis: Map<number, ActiveEmoji>;
}>({
  message: "",
  emojis: new Map<number, ActiveEmoji>()
});

export { state as default };
