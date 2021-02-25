<template>
  <div class="home">
    <Message
      :msg="state.stagingMessage1"
      :editMode="true"
      @update:newMessage="state.stagingMessage1 = $event"
    />
    <EmojiWrapper :editMode="true" />
    <Message
      :msg="state.stagingMessage2"
      :editMode="true"
      @update:newMessage="state.stagingMessage2 = $event"
    />
    <div style="margin: 0.5em 0 0.5em 0;">
      <button class="button-left" @click="setDefault()">
        Restart
      </button>
      <button @click="saveState(), showToast('Card saved!')">
        Save
      </button>
      <button @click="loadState()">
        Load
      </button>
      <button class="button-right" @click="clearStage">
        Clear all
      </button>
    </div>
    <AddEmoji @addEmoji="newEmoji($event)" style="border: 1px dashed black;" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { ValidCategories } from "@/assets/types";

import state from "@/store/state";
import {
  showToast,
  shiftEmoji,
  setDefault,
  saveState,
  loadState,
  clearStage
} from "@/store/methods";

import Message from "@/components/Message.vue";
import EmojiWrapper from "@/components/EmojiWrapper.vue";
import AddEmoji from "@/components/AddEmoji.vue";

export default defineComponent({
  name: "Home",
  components: {
    Message,
    EmojiWrapper,
    AddEmoji
  },
  data() {
    return {
      state: state
    };
  },
  setup() {
    function newEmoji(category: ValidCategories) {
      console.log(category);
      shiftEmoji(state.stagingEmojis.length, category);
    }

    return {
      showToast,
      newEmoji,
      setDefault,
      saveState,
      loadState,
      clearStage
    };
  }
});
</script>

<style scoped>
.home {
  border: 1px solid black;
  font-family: "Verdana", "Geneva", sans-serif;
}
</style>
