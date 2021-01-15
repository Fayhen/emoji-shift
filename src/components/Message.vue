<template>
  <div class="message-wrapper">
    <h1>{{ msg }}</h1>
    <button v-show="!showForm && editMode" @click="showForm = true">
      Edit
    </button>
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
button {
  display: block;
  max-width: 10rem;
  padding: 0.5em 1em 0.5em 1em;
  border-radius: 5rem;
  font-size: inherit;
  border: 1px solid rgb(216, 185, 255);
  background-color: rgb(216, 185, 255);
  transition: 400ms ease;
}
button:hover {
  background-color: rgb(231, 209, 255);
}
button:focus {
  outline: none;
}
.message-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  border: 1px dashed black;
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
