<template>
<p role="img">{{ emoji }}</p>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Emoji",
  data() {
    return {
      emoji: String.fromCodePoint(0x1F495)
    }
  }
})
</script>

<style scoped>
p {
  display: block;
  border: 1px dashed orange;
}
/* .wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px dashed orangered;
} */
</style>
