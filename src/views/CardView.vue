<template>
  <div>
    <div v-if="isLoading" data-test="loading-wrapper">
      <span>⏲️ Loading card...</span>
    </div>
    <div v-else data-test="card-wrapper">
      <div data-test="top-message-wrapper">
        <MessageWrapper :editMode="false" :msg="store.savedMessage1" />
      </div>
      <div data-test="emojis-wrapper">
        <EmojiWrapper :editMode="false" />
      </div>
      <div data-test="bottom-message-wrapper">
        <MessageWrapper :editMode="false" :msg="store.savedMessage2" />
      </div>
      <div style="margin: 3em 0 2em 0">
        <p>Like this card?</p>
        <button class="button-left-dynamic" data-test="edit-button" @click="redirectToHome">
          Edit it! 🎨
        </button>
        <button
          class="button-right-dynamic"
          data-test="home-button"
          @click="setDefaultAndRedirectToHome"
        >
          Make your own! 💡
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useEmojiStore } from '@/stores/emojis'

import MessageWrapper from '@/components/MessageWrapper.vue'
import EmojiWrapper from '@/components/EmojiWrapper.vue'

import { isEmojiShareParamsObject } from '@/models/type-guards'

const store = useEmojiStore()
const router = useRouter()
const route = useRoute()
const isLoading = ref(false)

onMounted(() => {
  isLoading.value = true

  if (store.allEmojis.size === 0) {
    store.loadEmojis()
  }

  const parameters = Object.assign(route.query)
  // console.log(parameters);

  if (isEmojiShareParamsObject(parameters)) {
    try {
      // Parse data from the URL and add it to the staging state
      store.decodeShareParams(parameters)

      // Check if the card had any emojis
      if (store.stagingEmojis.length > 0) {
        // Add data to the saved state so EmojiWrapper can render
        // the card outside edit mode
        store.saveState()

        // Recreate the query string using the new saved state
        store.encodeShareParams()

        // Exit loading and give feedback to the user
        isLoading.value = false
        store.triggerToast('You received an Emoji Card!')
      } else {
        // If no emojis were given, make a predefined card
        store.resetAndRandomizeEmojis()
        store.stagingMessage1 = 'You received an Emoji Card!'
        store.stagingMessage2 = 'It had no emojis. 👀 So I made you one! 😊'

        // Save, render, exit loading and notify user
        store.saveState()
        store.encodeShareParams()
        isLoading.value = false
        store.triggerToast('You received an Emoji Card!')
      }
    } catch (error) {
      // Handle errors after query string type validation
      store.resetAndRandomizeEmojis()
      store.stagingMessage1 = 'You received an Emoji Card!'
      store.stagingMessage2 = "But I couldn't read the link. 👀 So I made you a new one! 😊"

      store.saveState()
      store.encodeShareParams()
      isLoading.value = false
      store.triggerToast('You received an Emoji Card!')
    }
  } else {
    // Handle URLs that do not pass query string type validation
    store.resetAndRandomizeEmojis()
    store.stagingMessage1 = 'You received an Emoji Card!'
    store.stagingMessage2 = "But I couldn't read the link. 👀 So I made you one! 😊"

    store.saveState()
    store.encodeShareParams()
    isLoading.value = false
    store.triggerToast('You received an Emoji Card!')
  }
})

function redirectToHome() {
  router.push({
    name: 'home'
  })
}

function setDefaultAndRedirectToHome() {
  store.clearSave()
  store.setDefaultCard()
  router.push({
    name: 'home'
  })
}
</script>
