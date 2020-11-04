<template>
  <div class="home">
    <Message :msg="state.message1" style="border: 1px dashed black;"/>
    <div class="emoji-box-wrapper">
      <div
        class="emoji-wrapper"
        v-for="[position, emojiData] in state.emojis.entries()"
        :key="position"
      >
        <Emoji
          class="emoji-box"
          :position="position"
          :codepoint="emojiData.codepoint"
          :label="emojiData.label"
          :category="emojiData.category"
        />
        <div class="button-wrapper">
          <button class="button-left" @click="moveLeft(position)">&#60;</button>
          <button @click="shiftEmoji(position, emojiData.category)">
            Shift
          </button>
          <button @click="removeEmoji(position)">Remove</button>
          <button class="button-right" @click="moveRight(position)">
            &#62;
          </button>
        </div>
      </div>
    </div>
    <Message :msg="state.message2" style="border: 1px dashed black;"/>
    <button class="button-left" @click="setDefault()">Start over</button>
    <button class="button-right" @click="state.emojis.clear()">
      Clear all
    </button>
    <AddEmoji @add-emoji="newEmoji($event)" style="border: 1px dashed black;"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";

import state from "@/store/state";
import { setDefault, setEmoji, shiftEmoji, removeEmoji } from "@/store/methods";
import { AllEmojis, ActiveEmoji } from "@/assets/interfaces";

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
      if (state.emojis.size === 0) {
        setDefault();
      }
      console.log(state.emojis);
    });

    function newEmoji(emojiType: keyof AllEmojis) {
      console.log(emojiType);
      shiftEmoji(state.emojis.size, emojiType);
    }

    function moveLeft(position: number) {
      console.log("Moving left from position", position);
      if (position > 0) {
        const currentEmoji: ActiveEmoji | undefined = state.emojis.get(
          position
        );
        const leftEmoji: ActiveEmoji | undefined = state.emojis.get(
          position - 1
        );

        if (currentEmoji != undefined && leftEmoji != undefined) {
          setEmoji(position - 1, currentEmoji);
          setEmoji(position, leftEmoji);
        }
      }
    }

    function moveRight(position: number) {
      console.log("Moving right from position", position);
      if (position < state.emojis.size) {
        const currentEmoji: ActiveEmoji | undefined = state.emojis.get(
          position
        );
        const rightEmoji: ActiveEmoji | undefined = state.emojis.get(
          position + 1
        );

        if (currentEmoji != undefined && rightEmoji != undefined) {
          setEmoji(position + 1, currentEmoji);
          setEmoji(position, rightEmoji);
        }
      }
    }

    return {
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
  background-color: rgba(216, 185, 255, 1);
  transition: 400ms ease;
}
button:hover {
  background-color: rgba(231, 209, 255, 1);
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
