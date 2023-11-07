<template>
  <p role="img" :aria-label="label">
    {{ String.fromCodePoint(codepoint) }}
  </p>
</template>

<script setup lang="ts">
defineProps<{
  codepoint: number
  label: string
}>()
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
}

p::selection {
  background-color: rgba(0, 0, 0, 0);
}
</style>
