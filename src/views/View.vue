<template>
  <div class="home">
    <Message :msg="state.message1" :editMode="false" />
    <EmojiWrapper :editMode="false" />
    <Message :msg="state.message2" :editMode="false" />
    <button class="button-left">
      Edit this card
    </button>
    <button class="button-right">
      Make my own!
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useRoute } from "vue-router";

import { QueryParamsObject, isQueryParamsObject } from "@/assets/types";

import state from "@/store/state";
import {
  loadEmojis,
  setDefault,
  generateQueryString,
  parseQueryParameters
} from "@/store/methods";

import Message from "@/components/Message.vue";
import EmojiWrapper from "@/components/EmojiWrapper.vue";

export default defineComponent({
  name: "View",
  components: {
    Message,
    EmojiWrapper
  },
  data() {
    return {
      state: state
    };
  },
  setup() {
    const route = useRoute();

    onMounted(() => {
      if (state.allEmojis.size === 0) {
        loadEmojis();
      }
      if (state.activeEmojis.length === 0) {
        setDefault();
      }

      console.log("Accessing route params...");
      const parameters = Object.assign(route.query);

      console.log(parameters);
      console.log(Boolean(parameters));
      console.log(parameters as QueryParamsObject);
      console.log((parameters as QueryParamsObject) !== undefined);
      console.log(isQueryParamsObject(parameters));

      if (isQueryParamsObject(parameters)) {
        console.log("Query parameters are OK.");
        parseQueryParameters(parameters);
        console.log(state.queryString);
      } else {
        console.error(
          "Query string didn't yield the correct Type. Fallback is loading current stored state."
        );
        generateQueryString();
        console.log(state.queryString);
      }
    });

    return { onMounted };
  }
});
</script>
