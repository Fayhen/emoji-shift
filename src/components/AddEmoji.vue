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
      this.$emit("add-emoji", type);
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
  font-size: 1rem !important;
}
button {
  min-width: 10rem;
  margin: 2px;
}
</style>
