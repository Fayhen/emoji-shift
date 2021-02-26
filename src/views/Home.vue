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
    <div class="button-wrapper">
      <!-- eslint-disable prettier/prettier -->
      <button
        class="button-left-dynamic"
        title="Restart"
        @click="setDefault()"
      >
        Restart
        <span class="material-icons">
          restart_alt
        </span>
      </button>
      <button
        class="button-dynamic"
        title="Randomize all"
        @click="randomEmojis(state.stagingEmojis.length)"
      >
        Randomize
        <span class="material-icons">
          category
        </span>
      </button>
      <button
        class="button-dynamic"
        title="Save"
        @click="saveState(), showToast('Card saved!')"
      >
        Save
        <span class="material-icons">
          save
        </span>
      </button>
      <button
        class="button-dynamic"
        title="Load"
        @click="loadState()"
      >
        Load
        <span class="material-icons">
          restore
        </span>
      </button>
      <button
        class="button-right-dynamic"
        title="Clear all"
        @click="clearStage"
      >
        Clear all
        <span class="material-icons">
          clear
        </span>
      </button>
      <!-- eslint-enable prettier/prettier -->
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
  randomEmojis,
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
      randomEmojis,
      setDefault,
      saveState,
      loadState,
      clearStage
    };
  }
});
</script>

<style scoped>
.button-wrapper {
  width: 100vw;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin: 1.5em 0 0.5em 0;
}

.button-wrapper button {
  display: flex;
  align-items: center;
  justify-content: center;
}

.material-icons {
  margin: 0 0 0 0.2em;
}
</style>
