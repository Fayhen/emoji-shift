<template>
  <div class="preview">
    <p>Check your saved Emoji Card below:</p>
    <Message :msg="state.savedMessage1" :editMode="false" />
    <EmojiWrapper :editMode="false" />
    <Message :msg="state.savedMessage2" :editMode="false" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import state from "@/store/state";
import EmojiWrapper from "@/components/EmojiWrapper.vue";
import Message from "@/components/Message.vue";

export default defineComponent({
  name: "Preview",
  components: { EmojiWrapper, Message },
  data() {
    return {
      state: state
    };
  }
});
</script>
