import { reactive } from "vue";

const state = reactive({
  "message": "",
  "emojis": new Map<string, string>()
});

export { state as default };
