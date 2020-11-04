<template>
  <p role="img" :aria-label="label">{{ String.fromCodePoint(codepoint) }}</p>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Emoji",
  props: {
    position: {
      type: Number,
      required: true
    },
    codepoint: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    }
  },
  setup(props) {
    console.log("Child in index", props.position);
  }
});
</script>

<style scoped>
p {
  display: block;
  border: 1px dashed orange;
}
</style>
