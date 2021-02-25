<template>
  <transition name="slide-fade">
    <div id="toast" v-if="state.showToast">
      {{ state.toastMsg }}
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import state from "@/store/state";

export default defineComponent({
  name: "Toast",
  data() {
    return {
      state: state
    };
  }
});
</script>

<style scoped>
#toast {
  display: block;
  position: fixed;
  top: 4em;
  margin-left: auto;
  margin-right: auto;
  padding: 0.5em;
  border: 1px solid rgb(216, 185, 255);
  background-color: rgb(224, 201, 252);
  border-radius: 5rem;
  text-align: center;
  /* transition: 600ms ease; */
}

.slide-fade-enter-active {
  transition: all 0.8s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s ease-in;
}

.slide-fade-enter {
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
