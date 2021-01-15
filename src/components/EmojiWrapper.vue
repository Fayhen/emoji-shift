<template>
  <div class="emoji-box-wrapper">
    <div
      class="emoji-wrapper"
      v-for="(codepoint, index) in state.activeEmojis"
      :key="index"
    >
      <Emoji
        class="emoji-box"
        :position="index"
        :codepoint="codepoint"
        :label="state.allEmojis.get(codepoint).label"
      />
      <div v-show="editMode" class="button-wrapper">
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
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";

import state from "@/store/state";
import {
  loadEmojis,
  setDefault,
  setEmoji,
  shiftEmoji,
  removeEmoji
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
      if (state.activeEmojis.length === 0) {
        setDefault();
      }
      console.log(state.activeEmojis);
      console.log(`Loaded emojis: ${state.allEmojis.size.toString()} \n`);
    });

    function moveLeft(position: number) {
      console.log("Moving left from position", position);
      if (position > 0) {
        const currentEmoji: string | undefined = state.activeEmojis[position];
        const leftEmoji: string | undefined = state.activeEmojis[position - 1];

        if (currentEmoji != undefined && leftEmoji != undefined) {
          setEmoji(position - 1, currentEmoji);
          setEmoji(position, leftEmoji);
        }
      }
    }

    function moveRight(position: number) {
      console.log("Moving right from position", position);
      if (position < state.activeEmojis.length) {
        const currentEmoji: string | undefined = state.activeEmojis[position];
        const rightEmoji: string | undefined = state.activeEmojis[position + 1];

        if (currentEmoji != undefined && rightEmoji != undefined) {
          setEmoji(position + 1, currentEmoji);
          setEmoji(position, rightEmoji);
        }
      }
    }

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
.emoji-box-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.emoji-wrapper {
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
  justify-content: space-between;
  border: 1px solid black;
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
