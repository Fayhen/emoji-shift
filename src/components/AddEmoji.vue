<template>
  <div>
    <p>Add an emoji!</p>
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

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AddEmoji",
  methods: {
    addEmoji(type: string) {
      this.$emit("addEmoji", type);
    }
  }
});
</script>

<style scoped>
.button-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  border: 1px dashed black;
}

button {
  min-width: 10rem;
  margin: 2px;
  padding: 0.5em;
  font-size: 1em;
  border: 1px solid rgb(216, 185, 255);
  border-radius: 5rem;
  background-color: rgb(216, 185, 255);
  transition: 400ms ease;
}

button:hover {
  background-color: rgb(231, 209, 255);
}

button:focus {
  outline: 0;
}
</style>
