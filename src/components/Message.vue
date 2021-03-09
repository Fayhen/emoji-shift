<template>
  <div v-if="editMode">
    <!-- If no message is set and editMode is true, display option to add one -->
    <div v-if="msg === ''">
      <p>No message here.</p>
      <p>This area will not show up on your emoji card.</p>
      <button class="pill-button" v-show="!showForm" @click="showForm = true">
        Add message!
      </button>
    </div>
    <!-- Display message and edit controls if message exists and editMode is true -->
    <div v-else>
      <div class="message-wrapper">
        <h1>{{ msg }}</h1>
        <div style="flex-direction: row;">
          <button
            class="button-left"
            v-show="!showForm"
            @click="showForm = true"
          >
            Edit message
          </button>
          <button
            class="button-right"
            v-show="!showForm"
            @click="removeMessage"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
    <div v-show="showForm">
      <form @submit.prevent="onSubmit($emit)">
        <input
          class="text-input"
          :style="`width: ${inputWidth}`"
          type="text"
          id="new-message"
          name="new-message"
          placeholder="Type here:"
          v-model="newMsg"
          @keypress="updateInputWidth()"
        />
        <button class="submit-button" type="submit" value="Submit">
          Done!
        </button>
      </form>
    </div>
  </div>
  <div v-else>
    <!-- Hide message if none is set -->
    <div v-if="msg !== ''">
      <h1>{{ msg }}</h1>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Message",
  props: {
    msg: {
      type: String,
      required: true
    },
    editMode: {
      type: Boolean,
      required: true
    }
  },
  setup(props, { emit }) {
    const showForm = ref(false);
    const inputWidth = ref("25ch");
    const newMsg = ref(props.msg.slice());

    function removeMessage() {
      emit("update:newMessage", "");
    }

    function onSubmit() {
      if (newMsg.value !== "") {
        emit("update:newMessage", newMsg.value);
      }
      return (showForm.value = false);
    }

    function updateInputWidth() {
      const min = 25;
      const max = 90;
      const currentWidth: number = newMsg.value.length;

      if (currentWidth > min && currentWidth <= max) {
        inputWidth.value = `${currentWidth}ch`;
      } else if (currentWidth >= max) {
        inputWidth.value = "90ch";
      } else {
        inputWidth.value = "25ch";
      }
    }

    return {
      showForm,
      inputWidth,
      newMsg,
      removeMessage,
      onSubmit,
      updateInputWidth
    };
  }
});
</script>

<style scoped>
h1 {
  font-family: "Sansita Swashed", cursive;
  margin: 0 0 0.3rem 0;
}

form {
  display: flex;
  justify-content: center;
  align-items: center;
}

.message-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
}

.text-input {
  padding: 0.5em 1em 0.5em 1em;
  border: none;
  border-top-left-radius: 5em;
  border-bottom-left-radius: 5em;
  font-size: inherit;
  outline: none;
}

.submit-button {
  border-top-right-radius: 5em;
  border-bottom-right-radius: 5em;
  border-bottom-left-radius: 0px;
  border-top-left-radius: 0px;
}
</style>
