<template>
  <p role="img" :aria-label="label">
    {{ String.fromCodePoint(codepoint) }}
  </p>
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
    }
  },
  setup(props) {
    console.log("Child in index", props.position);
  }
});
</script>

<style scoped>
p {
  -webkit-touch-callout: all;
  -webkit-user-select: all;
  -khtml-user-select: all;
  -moz-user-select: all;
  -ms-user-select: all;
  user-select: all;
  display: block;
  border: 1px dashed orange;
}

p::selection {
  background-color: rgba(0, 0, 0, 0);
}
</style>
