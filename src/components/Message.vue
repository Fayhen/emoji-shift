<template>
  <h1>{{ msg }}</h1>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Message",
  props: {
    msg: String
  }
});
</script>

<style scoped>
h1 {
  font-family: "Sansita Swashed", cursive;
}
</style>
