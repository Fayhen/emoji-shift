<template>
  <!-- EDIT MODE -->
  <div v-if="editMode">
    <!-- If no message is set, show placeholders and allow user to set a new one -->
    <div v-if="msg === ''" class="spaced-paragraphs" data-test="message-wrapper">
      <p>No message here.</p>
      <p>This area will not show up on your emoji card.</p>
      <button
        v-show="!showForm"
        class="pill-button"
        data-test="edit-button"
        @click="showForm = true"
      >
        Add message!
      </button>
    </div>

    <!-- Display message and edit controls if message exists and editMode is true -->
    <div v-else>
      <div class="message-wrapper" data-test="message-wrapper">
        <h1>{{ msg }}</h1>
        <div style="flex-direction: row">
          <button
            v-show="!showForm"
            class="button-left"
            data-test="edit-button"
            @click="showForm = true"
          >
            Edit message
          </button>
          <button
            v-show="!showForm"
            class="button-right"
            data-test="remove-button"
            @click="removeMessage"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
    <div v-show="showForm">
      <form @submit.prevent="onSubmit" data-test="message-form">
        <input
          v-model="newMsg"
          id="new-message"
          name="new-message"
          data-test="message-input"
          type="text"
          class="text-input"
          placeholder="Type here:"
          :style="`width: ${inputWidth}`"
          @keypress="updateInputWidth()"
        />
        <button class="submit-button" data-test="submit-button" type="submit" value="Submit">
          Done!
        </button>
      </form>
    </div>
  </div>

  <!-- VIEW MODE -->
  <div v-else>
    <!-- Only render message when it is available -->
    <div v-if="msg !== ''" data-test="message-wrapper">
      <h1>{{ msg }}</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  update: [message: string]
}>()

const props = defineProps<{
  msg: string
  editMode: boolean
}>()

const showForm = ref(false)
const inputWidth = ref('25ch')
const newMsg = ref(props.msg.slice())

function removeMessage() {
  emit('update', '')
}

function onSubmit() {
  if (newMsg.value !== '') {
    emit('update', newMsg.value)
  }
  return (showForm.value = false)
}

function updateInputWidth() {
  const min = 25
  const max = 90
  const currentWidth: number = newMsg.value.length

  if (currentWidth > min && currentWidth <= max) {
    inputWidth.value = `${currentWidth}ch`
  } else if (currentWidth >= max) {
    inputWidth.value = '90ch'
  } else {
    inputWidth.value = '25ch'
  }
}
</script>

<style scoped>
h1 {
  font-family: 'Sansita Swashed', cursive;
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
