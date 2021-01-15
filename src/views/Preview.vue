<template>
  <div class="preview">
    <p>Check your current Emoji Card below:</p>
    <Message :msg="state.message1" :editMode="false" />
    <EmojiWrapper :editMode="false" />
    <Message :msg="state.message2" :editMode="false" />
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
