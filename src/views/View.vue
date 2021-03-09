<template>
  <div v-if="loading">
    <span>⏲️ Loading card...</span>
  </div>
  <div v-else>
    <Message :msg="state.savedMessage1" :editMode="false" />
    <EmojiWrapper :editMode="false" />
    <Message :msg="state.savedMessage2" :editMode="false" />
    <div style="margin: 3em 0 2em 0;">
      <p>Like this card?</p>
      <button class="button-left-dynamic" @click="redirectToHome">
        Edit it! 🎨
      </button>
      <button class="button-right-dynamic" @click="setDefaultAndRedirectToHome">
        Make your own! 💡
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

import { QueryParamsObject, isQueryParamsObject } from "@/assets/types";

import state from "@/store/state";
import {
  showToast,
  loadEmojis,
  randomEmojis,
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
    const loading = ref(true);

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
        console.log("Query parameters are OK.");
        try {
          // Parse data from the URL and add it to the staging state
          parseQueryParameters(parameters);
          console.log(state.stagingEmojis);
          console.log(state.queryString);

          // Check if the card had any emojis
          if (state.stagingEmojis.length > 0 && state.stagingEmojis[0] !== "") {
            // Add data to the saved state so EmojiWrapper can render
            // the card outside edit mode
            saveState();

            // Recreate the query string using the new saved state
            generateQueryString();

            // Exit loading and give feedback to the user
            loading.value = false;
            showToast("You received an Emoji Card!");
          } else {
            // If no emojis were given, make a card
            randomEmojis();
            state.stagingMessage1 = "You received an Emoji Card!";
            state.stagingMessage2 =
              "It had no emojis. 👀 So I made you one! 😊";

            // Save, render, exit loading and notify user
            saveState();
            generateQueryString();
            loading.value = false;
            showToast("You received an Emoji Card!");
          }
        } catch (error) {
          console.error(
            "Failed parsing query string. Fallback is loading default state."
          );
          console.error(error);

          randomEmojis();
          state.stagingMessage1 = "You received an Emoji Card!";
          state.stagingMessage2 =
            "But I couldn't read the link. 👀 So I made you a new one! 😊";

          saveState();
          generateQueryString();
          loading.value = false;
          showToast("You received an Emoji Card!");

          console.log(state.queryString);
        }
      } else {
        console.error(
          "Query string didn't yield the correct Type. Fallback is loading default state."
        );

        randomEmojis();
        state.stagingMessage1 = "You received an Emoji Card!";
        state.stagingMessage2 =
          "But I couldn't read the link. 👀 So I made you one! 😊";

        saveState();
        generateQueryString();
        loading.value = false;
        showToast("You received an Emoji Card!");

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
      loading,
      onMounted,
      redirectToHome,
      setDefaultAndRedirectToHome
    };
  }
});
</script>
