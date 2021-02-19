<template>
  <div class="outer-wrapper" v-if="editMode">
    <!-- Render emojis from the staging state with editing buttons -->
    <div
      class="box-wrapper"
      v-for="(codepoint, index) in state.stagingEmojis"
      :key="index"
    >
      <Emoji
        class="emoji-box"
        :position="index"
        :codepoint="codepoint"
        :label="state.allEmojis.get(codepoint).label"
      />
      <div class="button-wrapper">
        <button class="button-left" @click="moveLeft(index)">&#60;</button>
        <button
          @click="shiftEmoji(index, state.allEmojis.get(codepoint).category)"
        >
          Shift
        </button>
        <button @click="removeEmoji(index)">Remove</button>
        <button class="button-right" @click="moveRight(index)">
          &#62;
        </button>
      </div>
    </div>
  </div>
  <div v-else>
    <!-- Render emojis from the saved state without editing buttons -->
    <div v-if="state.savedEmojis.length === 0">
      <p>You haven't saved any emojis to your emoji card yet.</p>
      <p>You can do so in the editing area. 😊</p>
    </div>
    <div class="outer-wrapper" v-else>
      <div
        class="box-wrapper"
        v-for="(codepoint, index) in state.savedEmojis"
        :key="index"
      >
        <Emoji
          class="emoji-box"
          :position="index"
          :codepoint="codepoint"
          :label="state.allEmojis.get(codepoint).label"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";

import state from "@/store/state";
import {
  loadEmojis,
  setDefault,
  shiftEmoji,
  removeEmoji,
  moveLeft,
  moveRight
} from "@/store/methods";

import Emoji from "@/components/Emoji.vue";

export default defineComponent({
  name: "EmojiWrapper",
  components: { Emoji },
  props: {
    editMode: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      state: state
    };
  },
  setup() {
    onMounted(() => {
      if (state.allEmojis.size === 0) {
        loadEmojis();
      }
      if (state.stagingEmojis.length === 0) {
        setDefault();
      }
      console.log(state.stagingEmojis);
      console.log(`Loaded emojis: ${state.allEmojis.size.toString()} \n`);
    });

    return {
      setDefault,
      shiftEmoji,
      removeEmoji,
      onMounted,
      moveLeft,
      moveRight
    };
  }
});
</script>

<style scoped>
p {
  display: block;
  border: 1px dashed orange;
}

.outer-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.box-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  border: 1px solid black;
}

.emoji-box {
  width: 12rem;
  height: 12rem;
  margin: 1rem;
  font-size: 9.5rem;
  border: 1px dashed black;
}

.button-wrapper {
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  border: 1px solid black;
}
/* button {
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
} */
</style>
