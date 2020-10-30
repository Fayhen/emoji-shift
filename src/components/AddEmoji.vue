<template>
  <div>
    <p>Add an emoji!</p>
    <div class="button-wrapper">
      <button @click="addEvent('heart')">Add heart</button>
      <button @click="addEvent('flower')">Add flower</button>
      <button @click="addEvent('fruit')">Add fruit</button>
      <button @click="addEvent('animal')">Add animal</button>
      <button @click="addEvent('food')">Add food</button>
      <button @click="addEvent('astra')">Add astra</button>
    </div>
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
.button-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  border: 1px dashed black;
  font-size: 1rem !important;
}
button {
  min-width: 10rem;
  margin: 2px;
}
</style>
