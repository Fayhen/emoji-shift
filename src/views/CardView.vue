<template>
  <div v-if="loading">
    <span>⏲️ Loading card...</span>
  </div>
  <div v-else>
    <MessageWrapper :msg="state.savedMessage1" :editMode="false" />
    <EmojiWrapper :editMode="false" />
    <MessageWrapper :msg="state.savedMessage2" :editMode="false" />
    <div style="margin: 3em 0 2em 0">
      <p>Like this card?</p>
      <button class="button-left-dynamic" @click="redirectToHome">Edit it! 🎨</button>
      <button class="button-right-dynamic" @click="setDefaultAndRedirectToHome">
        Make your own! 💡
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import MessageWrapper from '@/components/MessageWrapper.vue'
import EmojiWrapper from '@/components/EmojiWrapper.vue'

import state from '@/stores/state'
import {
  showToast,
  loadEmojis,
  randomEmojis,
  setDefault,
  generateQueryString,
  parseQueryParameters,
  saveState,
  clearSave
} from '@/stores/methods'

import { isQueryParamsObject } from '@/models/type-guards'

const router = useRouter()
const route = useRoute()
const loading = ref(true)

onMounted(() => {
  if (state.allEmojis.size === 0) {
    loadEmojis()
  }

  const parameters = Object.assign(route.query)
  // console.log(parameters);

  if (isQueryParamsObject(parameters)) {
    try {
      // Parse data from the URL and add it to the staging state
      parseQueryParameters(parameters)

      // Check if the card had any emojis
      if (state.stagingEmojis.length > 0) {
        // Add data to the saved state so EmojiWrapper can render
        // the card outside edit mode
        saveState()

        // Recreate the query string using the new saved state
        generateQueryString()

        // Exit loading and give feedback to the user
        loading.value = false
        showToast('You received an Emoji Card!')
      } else {
        // If no emojis were given, make a card
        randomEmojis()
        state.stagingMessage1 = 'You received an Emoji Card!'
        state.stagingMessage2 = 'It had no emojis. 👀 So I made you one! 😊'

        // Save, render, exit loading and notify user
        saveState()
        generateQueryString()
        loading.value = false
        showToast('You received an Emoji Card!')
      }
    } catch (error) {
      // Handle errors after query string type validation
      randomEmojis()
      state.stagingMessage1 = 'You received an Emoji Card!'
      state.stagingMessage2 = "But I couldn't read the link. 👀 So I made you a new one! 😊"

      saveState()
      generateQueryString()
      loading.value = false
      showToast('You received an Emoji Card!')
    }
  } else {
    // Handle URLs that do not pass query string type validation
    randomEmojis()
    state.stagingMessage1 = 'You received an Emoji Card!'
    state.stagingMessage2 = "But I couldn't read the link. 👀 So I made you one! 😊"

    saveState()
    generateQueryString()
    loading.value = false
    showToast('You received an Emoji Card!')
  }
})

function redirectToHome() {
  router.push({
    name: 'Home'
  })
}

function setDefaultAndRedirectToHome() {
  clearSave()
  setDefault()
  router.push({
    name: 'Home'
  })
}
</script>
