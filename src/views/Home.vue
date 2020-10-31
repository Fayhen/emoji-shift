<template>
  <div class="home">
    <Message :msg="state.message" />
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
          <button @click="shiftEmoji(position, emojiData.category)">
            Shift
          </button>
          <button>Remove</button>
          <button @click="moveLeft(position)">&#60;</button>
          <span style="font-size: 0.9rem;">Move</span>
          <button @click="moveRight(position)">&#62;</button>
        </div>
      </div>
    </div>
    <AddEmoji @add-emoji="newEmoji($event)" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";

import state from "@/store/state";
import { setDefault, shiftEmoji } from "@/store/methods";
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

    // const lastPosition = ref(state.emojis.size);

    // function updateLastPosition() {
    //   lastPosition.value++;
    //   console.log(lastPosition.value);
    // }

    function newEmoji(emojiType: keyof AllEmojis) {
      console.log(emojiType);
      shiftEmoji(state.emojis.size + 1, emojiType);
    }

    function moveLeft(position: number) {
      console.log("Moving left from position", position);
      if (position > 1) {
        const currentEmoji: ActiveEmoji | undefined = state.emojis.get(
          position
        );
        const leftEmoji: ActiveEmoji | undefined = state.emojis.get(
          position - 1
        );
      }
    }

    function moveRight(position: number) {
      console.log("Moving right from position", position);
    }

    return { shiftEmoji, newEmoji, moveLeft, moveRight };
  }
});
</script>

<style scoped>
.home {
  border: 1px solid black;
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
}
.button-wrapper button {
  margin: 0 2px 0 2px;
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
