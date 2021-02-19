<template>
  <div class="home">
    <Message :msg="state.stagingMessage1" :editMode="false" />
    <EmojiWrapper :editMode="false" />
    <Message :msg="state.stagingMessage2" :editMode="false" />
    <div style="margin: 0.5em 0 2em 0;">
      <button class="button-left" @click="redirectToHome">
        Edit this card
      </button>
      <button class="button-right" @click="setDefaultAndRedirectToHome">
        Make my own!
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

import { QueryParamsObject, isQueryParamsObject } from "@/assets/types";

import state from "@/store/state";
import {
  loadEmojis,
  setDefault,
  generateQueryString,
  parseQueryParameters,
  saveState,
  clearSave
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
    const router = useRouter();
    const route = useRoute();

    onMounted(() => {
      if (state.allEmojis.size === 0) {
        loadEmojis();
      }

      console.log("Accessing route params...");
      const parameters = Object.assign(route.query);

      console.log(parameters);
      console.log(Boolean(parameters));
      console.log(parameters as QueryParamsObject);
      console.log((parameters as QueryParamsObject) !== undefined);
      console.log(isQueryParamsObject(parameters));

      if (isQueryParamsObject(parameters)) {
        try {
          console.log("Query parameters are OK.");
          // Load and save state from the query string
          parseQueryParameters(parameters);
          saveState();
          // Recreate query string from the saved state
          generateQueryString();
          console.log(state.queryString);
        } catch (error) {
          console.error(
            "Failed parsing query string. Fallback is loading default state."
          );
          console.error(error);
          setDefault();
          generateQueryString();
          console.log(state.queryString);
        }
      } else {
        console.error(
          "Query string didn't yield the correct Type. Fallback is loading default state."
        );
        setDefault();
        generateQueryString();
        console.log(state.queryString);
      }
    });

    function redirectToHome() {
      router.push({
        name: "Home"
      });
    }

    function setDefaultAndRedirectToHome() {
      clearSave();
      setDefault();
      router.push({
        name: "Home"
      });
    }

    return {
      onMounted,
      redirectToHome,
      setDefaultAndRedirectToHome
    };
  }
});
</script>
