<template>
  <div class="outer-wrapper unselectable" v-if="editMode">
    <!-- Render emojis from the staging state with editing buttons -->
    <div
      class="box-wrapper"
      v-for="(codepoint, index) in state.stagingEmojis"
      :key="index"
      @drop.prevent="onDrop($event, index)"
      @dragenter.prevent
      @dragover.prevent
    >
      <Emoji
        class="emoji-box"
        :position="index"
        :codepoint="codepoint"
        :label="state.allEmojis.get(codepoint).label"
        draggable="true"
        @dragstart="startDrag($event, index)"
      />
      <div class="button-wrapper">
        <button class="button-left" @click="moveLeft(index)">
          <span class="material-icons">keyboard_arrow_left</span>
        </button>
        <button
          @click="shiftEmoji(index, state.allEmojis.get(codepoint).category)"
        >
          <span class="material-icons">auto_awesome</span>
        </button>
        <button @click="makeCopy(index, codepoint)">
          <span class="material-icons">content_copy</span>
        </button>
        <button @click="removeEmoji(index)">
          <span class="material-icons">delete</span>
        </button>
        <button class="button-right" @click="moveRight(index)">
          <span class="material-icons">keyboard_arrow_right</span>
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
    <div class="outer-wrapper unselectable" v-else>
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
  moveRight,
  insertAtIndex,
  makeCopy
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

    function startDrag(evt: DragEvent, lastIndex: string) {
      console.log("startDrag");
      if (evt.dataTransfer !== null) {
        evt.dataTransfer.dropEffect = "move";
        evt.dataTransfer.effectAllowed = "move";
        evt.dataTransfer.setData("lastIndex", lastIndex);
        console.log(evt);
        console.log(DataTransfer);
        console.log(lastIndex);
      } else {
        throw new Error(
          "Missing DataTranfer object on starting emoji drag event."
        );
      }
    }

    function onDrop(evt: DragEvent, newIndex: string) {
      console.log("onDrop");
      if (evt.dataTransfer !== null) {
        const lastIndex = parseInt(evt.dataTransfer.getData("lastIndex"));
        const emoji = state.stagingEmojis[lastIndex];
        console.log(lastIndex);
        console.log(emoji);

        removeEmoji(lastIndex);
        insertAtIndex(parseInt(newIndex), emoji);
      } else {
        throw new Error(
          "Missing DataTranfer object on finishing emoji drag event."
        );
      }
    }

    return {
      startDrag,
      onDrop,
      setDefault,
      shiftEmoji,
      removeEmoji,
      onMounted,
      moveLeft,
      moveRight,
      makeCopy
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
  cursor: grab;
}

.emoji-box:active {
  cursor: grabbing;
}

.button-wrapper {
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  border: 1px solid black;
  font-size: 12px;
}

.button-wrapper span {
  color: rgba(0, 0, 0, 0.76);
}
</style>
