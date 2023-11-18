<template>
  <div>
    <div data-test="top-message-wrapper">
      <MessageWrapper
        :msg="store.stagingMessage1"
        :editMode="true"
        @update="store.stagingMessage1 = $event"
      />
    </div>
    <div data-test="emojis-wrapper">
      <EmojiWrapper :editMode="true" />
    </div>
    <div data-test="bottom-message-wrapper">
      <MessageWrapper
        :msg="store.stagingMessage2"
        :editMode="true"
        @update="store.stagingMessage2 = $event"
      />
    </div>
    <div class="button-wrapper" data-test="card-actions-wrapper">
      <button
        class="button-left-dynamic"
        data-test="restart-button"
        title="Restart"
        @click="store.setDefaultCard()"
      >
        Restart
        <span class="material-icons"> restart_alt </span>
      </button>
      <button
        class="button-dynamic"
        data-test="randomize-button"
        title="Randomize all"
        @click="store.resetAndRandomizeEmojis(store.stagingEmojis.length)"
      >
        Randomize
        <span class="material-icons"> category </span>
      </button>
      <button
        class="button-dynamic"
        data-test="save-button"
        title="Save"
        @click="store.saveState(), store.triggerToast('Card saved!')"
      >
        Save
        <span class="material-icons"> save </span>
      </button>
      <button
        class="button-dynamic"
        data-test="load-button"
        title="Load"
        @click="store.loadState()"
      >
        Load
        <span class="material-icons"> restore </span>
      </button>
      <button
        class="button-right-dynamic"
        data-test="clear-all-button"
        title="Clear all"
        @click="store.clearStage()"
      >
        Clear all
        <span class="material-icons"> clear </span>
      </button>
    </div>
    <div data-test="add-emojis-wrapper">
      <AddEmoji @addEmoji="newEmoji($event)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useEmojiStore } from '@/stores/emojis'

import MessageWrapper from '@/components/MessageWrapper.vue'
import EmojiWrapper from '@/components/EmojiWrapper.vue'
import AddEmoji from '@/components/AddEmoji.vue'

import type { ValidCategories } from '@/models/emojis'

const store = useEmojiStore()

function newEmoji(category: ValidCategories) {
  store.shiftEmoji(store.stagingEmojis.length, category)
}
</script>

<style scoped>
.button-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin: 3rem 0 2rem 0;
}

.button-wrapper button {
  display: flex;
  align-items: center;
  justify-content: center;
}

.material-icons {
  margin: 0 0 0 0.2em;
}
</style>
