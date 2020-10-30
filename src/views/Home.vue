<template>
  <div class="home">
    <Message :msg="state.message" />
    <div class="emoji-box-wrapper">
      <div
        class="emoji-wrapper"
        v-for="[id, emojiData] in state.emojis.entries()"
        :key="id"
      >
        <Emoji
          class="emoji-box"
          :position="emojiData.position"
          :codepoint="emojiData.codepoint"
          :label="emojiData.label"
          :category="emojiData.category"
        />
        <div class="button-wrapper">
          <button @click="shiftEmoji(id, emojiData.position, emojiData.category)">Shift</button>
          <button>Remove</button>
          <button>&#60;</button>
          <span style="font-size: 0.9rem;">Move</span>
          <button>&#62;</button>
        </div>
      </div>
      <!-- <div class="emoji-wrapper">
        <Emoji class="emoji-box" />
        <button>Shift</button>
      </div>
      <div class="emoji-wrapper">
        <Emoji class="emoji-box" />
        <button>Shift</button>
      </div>
      <div class="emoji-wrapper">
        <Emoji class="emoji-box" />
        <button>Shift</button>
      </div>
      <div class="emoji-wrapper">
        <Emoji class="emoji-box" />
        <button>Shift</button>
      </div>
      <div class="emoji-wrapper">
        <Emoji class="emoji-box" />
        <button>Shift</button>
      </div>
      <div class="emoji-wrapper">
        <Emoji class="emoji-box" />
        <button>Shift</button>
      </div> -->
    </div>
    <AddEmoji />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { AllEmojis } from "@/assets/interfaces";
import { getCategory } from "@/assets/emojis";
import state from "@/store/state";
import { setDefault, shiftEmoji } from "@/store/methods";
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
    if (state.emojis.size === 0) {
      setDefault();
    }
    console.log(state.emojis);
    return { shiftEmoji }
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
/* .add-buttons-wrapper {

} */
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
