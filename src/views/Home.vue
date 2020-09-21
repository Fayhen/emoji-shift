<template>
  <div class="home">
    <Message msg="Welcome to Your Vue.js + TypeScript App" />
    <div class="upper-wrapper">
      <div class="emoji-wrapper">
        <Emoji class="emoji-box" />
        <div class="button-wrapper">
          <button>Shift</button>
          <button>Remove</button>
          <button>&#60;</button>
            <span style="font-size: 0.9rem;">Move</span>
          <button>&#62;</button>
        </div>
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
      </div>
      <div class="emoji-wrapper">
        <Emoji class="emoji-box" />
        <button>Shift</button>
      </div>
      <div class="emoji-wrapper">
        <AddEmoji />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import state from "@/store/state";
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
  setup() {
    console.log(state);
  }
});
</script>

<style scoped>
.home {
  border: 1px solid black;
}
.upper-wrapper {
  display: flex;
  flex-wrap: wrap;
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
  margin: 1rem;
  font-size: 12rem;
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
