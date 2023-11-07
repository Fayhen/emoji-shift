<template>
  <div v-if="loading">
    <span>⏲️ Loading card...</span>
  </div>
  <div v-else>
    <MessageWrapper :msg="store.savedMessage1" :editMode="false" />
    <EmojiWrapper :editMode="false" />
    <MessageWrapper :msg="store.savedMessage2" :editMode="false" />
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
import { useEmojiStore } from '@/stores/emojis'

import MessageWrapper from '@/components/MessageWrapper.vue'
import EmojiWrapper from '@/components/EmojiWrapper.vue'

import { isQueryParamsObject } from '@/models/type-guards'

const store = useEmojiStore()
const router = useRouter()
const route = useRoute()
const loading = ref(true)

onMounted(() => {
  if (store.allEmojis.size === 0) {
    store.loadEmojis()
  }

  const parameters = Object.assign(route.query)
  // console.log(parameters);

  if (isQueryParamsObject(parameters)) {
    try {
      // Parse data from the URL and add it to the staging state
      store.parseQueryParameters(parameters)

      // Check if the card had any emojis
      if (store.stagingEmojis.length > 0) {
        // Add data to the saved state so EmojiWrapper can render
        // the card outside edit mode
        store.saveState()

        // Recreate the query string using the new saved state
        store.generateQueryString()

        // Exit loading and give feedback to the user
        loading.value = false
        store.triggerToast('You received an Emoji Card!')
      } else {
        // If no emojis were given, make a card
        store.resetAndRandomizeEmojis()
        store.stagingMessage1 = 'You received an Emoji Card!'
        store.stagingMessage2 = 'It had no emojis. 👀 So I made you one! 😊'

        // Save, render, exit loading and notify user
        store.saveState()
        store.generateQueryString()
        loading.value = false
        store.triggerToast('You received an Emoji Card!')
      }
    } catch (error) {
      // Handle errors after query string type validation
      store.resetAndRandomizeEmojis()
      store.stagingMessage1 = 'You received an Emoji Card!'
      store.stagingMessage2 = "But I couldn't read the link. 👀 So I made you a new one! 😊"

      store.saveState()
      store.generateQueryString()
      loading.value = false
      store.triggerToast('You received an Emoji Card!')
    }
  } else {
    // Handle URLs that do not pass query string type validation
    store.resetAndRandomizeEmojis()
    store.stagingMessage1 = 'You received an Emoji Card!'
    store.stagingMessage2 = "But I couldn't read the link. 👀 So I made you one! 😊"

    store.saveState()
    store.generateQueryString()
    loading.value = false
    store.triggerToast('You received an Emoji Card!')
  }
})

function redirectToHome() {
  router.push({
    name: 'Home'
  })
}

function setDefaultAndRedirectToHome() {
  store.clearSave()
  store.setDefaultCard()
  router.push({
    name: 'Home'
  })
}
</script>
