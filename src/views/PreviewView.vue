<template>
  <div class="preview">
    <MessageWrapper :msg="state.savedMessage1" :editMode="false" />
    <EmojiWrapper :editMode="false" />
    <MessageWrapper :msg="state.savedMessage2" :editMode="false" />
  </div>
  <div v-if="state.queryString !== '' && state.savedEmojis.length > 0">
    <p>Here is the URL for the emoji card above!</p>
    <p>Share it for people to see!</p>
    <div class="codebox">
      <p>{{ cardLink }}</p>
    </div>
    <a :href="cardLink">
      <button class="pill-button">Let me see it too!</button>
    </a>
  </div>
</template>

<script setup lang="ts">
import state from '@/stores/state'
import EmojiWrapper from '@/components/EmojiWrapper.vue'
import MessageWrapper from '@/components/MessageWrapper.vue'

const currentRoute = window.location.href
const cardLink = currentRoute.replace('/preview', '/view' + state.queryString)
</script>

<style scoped>
button {
  margin: 1em 0 1em 0;
}

.preview {
  margin-bottom: 2em;
}

.codebox {
  display: block;
  padding: 0.1em 1em 0.1em 1em;
  max-width: 80vw;
  word-wrap: break-word;
  background-color: rgb(196, 188, 207);
  -webkit-touch-callout: all;
  -webkit-user-select: all;
  -khtml-user-select: all;
  -moz-user-select: all;
  -ms-user-select: all;
  user-select: all;
}

.codebox p {
  font-size: 1.25em;
  font-family: monospace;
}
</style>
