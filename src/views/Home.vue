<template>
  <div class="home">
    <Message
      :msg="state.message1"
      :editMode="true"
      @update:newMessage="state.message1 = $event"
    />
    <EmojiWrapper :editMode="true" />
    <Message
      :msg="state.message2"
      :editMode="true"
      @update:newMessage="state.message2 = $event"
    />
    <button class="button-left" @click="setDefault()">Start over</button>
    <button class="button-right" @click="state.activeEmojis = []">
      Clear all
    </button>
    <AddEmoji @add-emoji="newEmoji($event)" style="border: 1px dashed black;" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { ValidCategories } from "@/assets/types";

import state from "@/store/state";
import { shiftEmoji, setDefault } from "@/store/methods";

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
      shiftEmoji(state.activeEmojis.length, category);
    }

    return { newEmoji, setDefault };
  }
});
</script>

<style scoped>
.home {
  border: 1px solid black;
  font-family: "Verdana", "Geneva", sans-serif;
}
button {
  margin: 0;
  padding: 0.5em;
  font-size: 1em;
  border: 2px solid rgb(216, 185, 255);
  background-color: rgb(216, 185, 255);
  transition: 400ms ease;
}
button:hover {
  background-color: rgb(231, 209, 255);
}
button:focus {
  outline: 0;
}
.button-left {
  padding: 0.5em 1em 0.5em 1em;
  border-top-left-radius: 5em;
  border-bottom-left-radius: 5em;
}
.button-right {
  padding: 0.5em 1em 0.5em 1em;
  border-top-right-radius: 5em;
  border-bottom-right-radius: 5em;
}
</style>
