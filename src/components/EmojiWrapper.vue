<template>
  <div v-if="editMode">
    <!-- Edit mode: render stagingEmojis with editing controls -->
    <div v-if="Object.keys(store.stagingEmojis).length === 0" class="spaced-paragraphs">
      <p>Emojis cleared.</p>
      <p>Use the add buttons bellow to start your Emoji Card. 😉</p>
    </div>
    <div id="draggable" ref="draggable" class="outer-wrapper">
      <!-- eslint-disable-next-line vue/valid-v-for -->
      <div
        class="box-wrapper"
        v-for="(emoji, index) in store.stagingEmojis"
        :key="emoji.key"
        :data-id="`${emoji.codepoint}-${emoji.key}`"
      >
        <EmojiItem
          class="emoji-box"
          :codepoint="emoji.codepoint"
          :label="store.allEmojis.get(emoji.codepoint)?.label ?? ''"
        />
        {{ `${emoji.codepoint} ${index}` }}
        <div class="button-wrapper">
          <button class="button-left" @click="store.moveLeft(index)">
            <span class="material-icons">keyboard_arrow_left</span>
          </button>
          <button
            @click="store.shiftEmoji(index, store.allEmojis.get(emoji.codepoint)?.category ?? '')"
          >
            <span class="material-icons">auto_awesome</span>
          </button>
          <button @click="store.makeCopy(index)">
            <span class="material-icons">content_copy</span>
          </button>
          <button @click="store.removeEmoji(index)">
            <span class="material-icons">delete</span>
          </button>
          <button class="button-right" @click="store.moveRight(index)">
            <span class="material-icons">keyboard_arrow_right</span>
          </button>
        </div>
      </div>
    </div>
  </div>

  <div v-else>
    <!-- View mode: render savedEmojis without editing controls -->
    <div v-if="Object.keys(store.savedEmojis).length === 0">
      <p>You haven't saved any emojis to your emoji card yet.</p>
      <p>You can do so in the editing area. 😊</p>
    </div>
    <div class="outer-wrapper unselectable" v-else>
      <div class="box-wrapper" v-for="(emoji, index) in store.savedEmojis" :key="index">
        <EmojiItem
          class="emoji-box"
          :position="index"
          :codepoint="emoji.codepoint"
          :label="store.allEmojis.get(emoji.codepoint)?.label ?? ''"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useSortable } from '@vueuse/integrations/useSortable'
import { useEmojiStore } from '@/stores/emojis'
// import { getRandomInt } from '@/utils/randomInt'
// import Sortable from 'sortablejs';

import EmojiItem from '@/components/EmojiItem.vue'
// import { nextTick } from 'process';

defineProps<{
  editMode: boolean
}>()

const store = useEmojiStore()

onMounted(() => {
  if (store.allEmojis.size === 0) {
    store.loadEmojis()
  }
  if (Object.keys(store.stagingEmojis).length === 0) {
    store.setDefaultCard()
  }
  // console.log(store.stagingEmojis);
  // console.log(`Loaded emojis: ${store.allEmojis.size.toString()} \n`);
})

const draggable = ref<HTMLElement | null>(null)

useSortable(draggable, store.stagingEmojis, {
  animation: 150,
  store: {
    get: () => {
      return store.stagingEmojis.map((codepoint) => String(codepoint))
    },
    set: (sortable) => {
      const order = sortable.toArray()
      store.stagingEmojis = order.map((dataString) => {
        const [codepoint, key] = dataString.split('-')
        return { codepoint: Number(codepoint), key }
      })
      console.log({ order, store: store.stagingEmojis })
    }
  }
})
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
