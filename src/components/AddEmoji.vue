<template>
  <div class="button-wrapper">
    <p>Add an emoji!</p>
    <button @click="addEvent('heart')">Add heart</button>
    <button @click="addEvent('flower')">Add flower</button>
    <button @click="addEvent('animal')">Add animal</button>
    <button @click="addEvent('food')">Add food</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AddEmoji",
  methods: {
    addEvent(type: string) {
      return console.log("Emitting add event for: ", type)
    }
  }
})
</script>

<style scoped>
button {
  width: 95%;
  margin: 1rem 0 1rem 0;
}
</style>
