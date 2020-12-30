<template>
  <div class="home">
    <Message
      :msg="state.message1"
      @update:newMessage="state.message1 = $event"
    />
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
    <Message
      :msg="state.message2"
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
import { defineComponent, onMounted } from "vue";

import state from "@/store/state";
import { ValidCategories } from "@/assets/types";
import {
  loadEmojis,
  setDefault,
  setEmoji,
  shiftEmoji,
  removeEmoji
} from "@/store/methods";

import Message from "@/components/Message.vue";
import Emoji from "@/components/Emoji.vue";
import AddEmoji from "@/components/AddEmoji.vue";

export default defineComponent({
  name: "Home",
  components: {
    Message,
    Emoji,
    AddEmoji
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

    function newEmoji(category: ValidCategories) {
      console.log(category);
      shiftEmoji(state.activeEmojis.length, category);
    }

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
      onMounted,
      shiftEmoji,
      newEmoji,
      removeEmoji,
      setDefault,
      moveLeft,
      moveRight
    };
  }
});
</script>

<style scoped>
.home {
  border: 1px solid black;
  font-family: "Verdana", "Geneva", sans-serif;
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

@media only screen and (max-width: 600px) {
  .upper-wrapper {
    flex-direction: column;
  }
}
@media only screen and (min-width: 600px) {
  .upper-wrapper {
    flex-direction: row;
    justify-content: space-around;
  }
}
</style>
