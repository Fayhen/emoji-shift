<template>
  <div>
    <p>Add Emojis!</p>
    <div class="button-wrapper">
      <button @click="addEmoji('hearts')">Add heart &#128149;</button>
      <button @click="addEmoji('flowers')">Add flower &#127801;</button>
      <button @click="addEmoji('fruits')">Add fruit &#127817;</button>
      <button @click="addEmoji('animals')">Add animal &#128049;</button>
      <button @click="addEmoji('food')">Add food &#129360;</button>
      <button @click="addEmoji('astra')">Add astra &#127776;</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  addEmoji: [category: string]
}>()

function addEmoji(type: string) {
  emit('addEmoji', type)
}
</script>

<style scoped>
.button-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 1em;
}

button {
  min-width: 12rem;
  border-radius: 5rem;
  margin: 0 0.5em 0.5em 0.5em;
}

p {
  margin-bottom: 1em;
}
</style>
