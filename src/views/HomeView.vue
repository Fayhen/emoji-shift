<template>
  <div class="home">
    <MessageWrapper
      :msg="state.stagingMessage1"
      :editMode="true"
      @update="state.stagingMessage1 = $event"
    />
    <EmojiWrapper :editMode="true" />
    <MessageWrapper
      :msg="state.stagingMessage2"
      :editMode="true"
      @update="state.stagingMessage2 = $event"
    />
    <div class="button-wrapper">
      <!-- eslint-disable prettier/prettier -->
      <button class="button-left-dynamic" title="Restart" @click="setDefault()">
        Restart
        <span class="material-icons"> restart_alt </span>
      </button>
      <button
        class="button-dynamic"
        title="Randomize all"
        @click="randomEmojis(state.stagingEmojis.length)"
      >
        Randomize
        <span class="material-icons"> category </span>
      </button>
      <button class="button-dynamic" title="Save" @click="saveState(), showToast('Card saved!')">
        Save
        <span class="material-icons"> save </span>
      </button>
      <button class="button-dynamic" title="Load" @click="loadState()">
        Load
        <span class="material-icons"> restore </span>
      </button>
      <button class="button-right-dynamic" title="Clear all" @click="clearStage">
        Clear all
        <span class="material-icons"> clear </span>
      </button>
      <!-- eslint-enable prettier/prettier -->
    </div>
    <AddEmoji @addEmoji="newEmoji($event)" />
  </div>
</template>

<script setup lang="ts">
import state from '@/stores/state'
import {
  showToast,
  shiftEmoji,
  randomEmojis,
  setDefault,
  saveState,
  loadState,
  clearStage
} from '@/stores/methods'

import MessageWrapper from '@/components/MessageWrapper.vue'
import EmojiWrapper from '@/components/EmojiWrapper.vue'
import AddEmoji from '@/components/AddEmoji.vue'

import type { ValidCategories } from '@/models/emojis'

function newEmoji(category: ValidCategories) {
  // console.log(category);
  shiftEmoji(state.stagingEmojis.length, category)
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
