<template>
  <div v-if="editMode">
    <!-- Edit mode: render stagingEmojis with editing controls -->
    <div v-if="state.stagingEmojis.length === 0" class="spaced-paragraphs">
      <p>Emojis cleared.</p>
      <p>Use the add buttons bellow to start your Emoji Card. 😉</p>
    </div>
    <div ref="draggable" class="outer-wrapper">
      <div class="box-wrapper" v-for="(codepoint, index) in state.stagingEmojis" :key="index">
        <EmojiItem
          class="emoji-box"
          :position="index"
          :codepoint="codepoint"
          :label="state.allEmojis.get(codepoint)?.label ?? ''"
        />
        <div class="button-wrapper">
          <button class="button-left" @click="moveLeft(index)">
            <span class="material-icons">keyboard_arrow_left</span>
          </button>
          <button @click="shiftEmoji(index, state.allEmojis.get(codepoint)?.category ?? '')">
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
  </div>

  <div v-else>
    <!-- View mode: render savedEmojis without editing controls -->
    <div v-if="state.savedEmojis.length === 0">
      <p>You haven't saved any emojis to your emoji card yet.</p>
      <p>You can do so in the editing area. 😊</p>
    </div>
    <div class="outer-wrapper unselectable" v-else>
      <div class="box-wrapper" v-for="(codepoint, index) in state.savedEmojis" :key="index">
        <EmojiItem
          class="emoji-box"
          :position="index"
          :codepoint="codepoint"
          :label="state.allEmojis.get(codepoint)?.label ?? ''"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useSortable } from '@vueuse/integrations/useSortable'

import state from '@/stores/state'
import {
  loadEmojis,
  setDefault,
  shiftEmoji,
  removeEmoji,
  moveLeft,
  moveRight,
  makeCopy
} from '@/stores/methods'

import EmojiItem from '@/components/EmojiItem.vue'

defineProps<{
  editMode: boolean
}>()

onMounted(() => {
  if (state.allEmojis.size === 0) {
    loadEmojis()
  }
  if (state.stagingEmojis.length === 0) {
    setDefault()
  }
  // console.log(state.stagingEmojis);
  // console.log(`Loaded emojis: ${state.allEmojis.size.toString()} \n`);
})

const draggable = ref<HTMLElement | null>(null)

useSortable(draggable, state.stagingEmojis)
</script>

<style scoped>
p {
  display: block;
}

button {
  font-size: 1em;
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
  margin: 0 0.25rem 1rem 0.25rem;
}

.emoji-box {
  width: 12rem;
  height: 12rem;
  margin: 1rem;
  font-size: 9.5rem;
  cursor: grab;
}

.emoji-box:active {
  cursor: grabbing;
}

.button-wrapper {
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  font-size: 12px;
}

.button-wrapper span {
  color: rgba(0, 0, 0, 0.76);
}

.ghost {
  opacity: 0.25;
}

.dragging-image {
  opacity: 1;
  background-color: transparent;
}

.dragging-image .button-wrapper {
  display: none;
}
</style>
