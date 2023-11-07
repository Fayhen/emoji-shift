import { ref } from 'vue'
import { defineStore } from 'pinia'
import { categoryNames, getCategory, retrieveAll } from '@/assets/emojis'
import { getRandomInt } from '@/utils/randomInt'
import { getRandomStr } from '@/utils/randomStr'
import type {
  AllEmojis,
  EmojiData,
  EmojiShareParams,
  EmojiStoreData,
  ValidCategories,
  ValidCodepoints
} from '@/models/emojis'

/**
 * Emojis store.
 */
export const useEmojiStore = defineStore('emojis', () => {
  // Emojis data
  const allEmojis = ref(new Map<number, EmojiData>())

  // Staging data (handled in edit mode)
  const stagingMessage1 = ref('')
  const stagingMessage2 = ref('')
  const stagingEmojis = ref(new Array<EmojiStoreData>())

  // Saved data (handled in view mode)
  const savedMessage1 = ref('')
  const savedMessage2 = ref('')
  const savedEmojis = ref(new Array<EmojiStoreData>())

  // UI properties
  const showToast = ref(false)
  const toastMsg = ref('Default')

  // Route query string
  const queryString = ref('')

  /**
   * Loads all emojis available in the application assets into the
   * store.
   */
  function loadEmojis() {
    if (allEmojis.value.size > 0) {
      allEmojis.value.clear()
    }
    const refreshedEmojis: AllEmojis = retrieveAll()

    for (const [codepoint, emojiData] of Object.entries(refreshedEmojis)) {
      allEmojis.value.set(Number(codepoint), emojiData)
    }
  }

  /**
   * Sets a given emoji into a given index of the staging emojis
   * array. The previous emoji at this index will be replaced.
   *
   * @param position Index to set the emoji into.
   * @param codepoint Emoji codepoint.
   * @param key Randomized string key. Defaults to an empty string.
   */
  function setEmoji(position: number, codepoint: ValidCodepoints, key = '') {
    stagingEmojis.value.splice(position, 1, {
      codepoint,
      key: key || getRandomStr(10)
    })
  }

  /**
   * Randomizes an emoji in a given category at a given index of the
   * staging emojis array.
   *
   * @param position Index to randomize the emoji in.
   * @param category Emoji category.
   */
  function shiftEmoji(position: number, category: ValidCategories) {
    const codepoints = getCategory(category)
    const random = getRandomInt(0, codepoints.length)
    const newEmoji = codepoints[random]

    setEmoji(position, newEmoji)
  }

  /**
   * Swaps the position of two emojis, sending one to the index of the
   * other in the staging emojis array and vice-versa.
   *
   * @param indexA Index of the first emoji to swap.
   * @param indexB Index of the second emoji to swap.
   */
  function swapEmojis(indexA: number, indexB: number) {
    const emojiA = stagingEmojis.value[indexA]
    const emojiB = stagingEmojis.value[indexB]
    setEmoji(indexA, emojiB.codepoint, emojiB.key)
    setEmoji(indexB, emojiA.codepoint, emojiA.key)
  }

  /**
   * Removes the emoji from a given index of the staging emojis array.
   *
   * @param position Index to remove the emoji from.
   */
  function removeEmoji(position: number) {
    stagingEmojis.value.splice(position, 1)
  }

  /**
   * Moves the emoji at a given index of the staging emojis array, to
   * the pior index.
   *
   * @param position Index to move the emoji from.
   */
  function moveLeft(position: number) {
    if (position > 0) {
      const currentEmoji: EmojiStoreData | undefined = stagingEmojis.value[position]
      const leftEmoji: EmojiStoreData | undefined = stagingEmojis.value[position - 1]

      if (currentEmoji != undefined && leftEmoji != undefined) {
        setEmoji(position - 1, currentEmoji.codepoint, currentEmoji.key)
        setEmoji(position, leftEmoji.codepoint, leftEmoji.key)
      }
    }
  }

  /**
   * Moves the emoji at a given index of the staging emojis array, to
   * the next index.
   *
   * @param position Index to move the emoji from.
   */
  function moveRight(position: number) {
    if (position < Object.keys(stagingEmojis.value).length) {
      const currentEmoji: EmojiStoreData | undefined = stagingEmojis.value[position]
      const rightEmoji: EmojiStoreData | undefined = stagingEmojis.value[position + 1]

      if (currentEmoji != undefined && rightEmoji != undefined) {
        setEmoji(position + 1, currentEmoji.codepoint, currentEmoji.key)
        setEmoji(position, rightEmoji.codepoint, rightEmoji.key)
      }
    }
  }

  /**
   * Moves the emojis from a given index to a new index in the staging
   * emojis array.
   *
   * @param oldIndex Index to move the emoji from.
   * @param newIndex Index to move the emoji to.
   */
  function moveFromIndex(oldIndex: number, newIndex: number) {
    const emoji = stagingEmojis.value[oldIndex]
    removeEmoji(oldIndex)
    insertEmojiAtIndex(newIndex, emoji.codepoint, emoji.key)
  }

  /**
   * Inserts a given emoji into a given index of the staging emojis
   * array. Previous emojis are displaced to the next indexes.
   *
   * @param index Index to insert the emoji at.
   * @param codepoint Emoji codepoint.
   * @param key Randomized string key. Defaults to an empty string.
   */
  function insertEmojiAtIndex(index: number, codepoint: ValidCodepoints, key = '') {
    stagingEmojis.value.splice(index, 0, {
      codepoint,
      key: key || getRandomStr(10)
    })
  }

  /**
   * Makes a copy of the emoji at a given index of the staging emojis
   * array.
   *
   * @param index Index to copy the emoji at.
   */
  function makeCopy(index: number) {
    const emoji = stagingEmojis.value[index]
    insertEmojiAtIndex(index, emoji.codepoint)
  }

  /**
   * Resets the staging emojis array and populates it with a given
   * amount of random emojis.
   *
   * @param amount Amount of emojis to randomize. Defaults to 4.
   */
  function resetAndRandomizeEmojis(amount = 4) {
    stagingEmojis.value = []
    const categories: ValidCategories[] = categoryNames()

    for (let i = 0; i < amount; i++) {
      const randomIndex = getRandomInt(0, categories.length - 1)
      shiftEmoji(i, categories[randomIndex])
    }
  }

  /**
   * Sets the staging emojis and messages to a predefined default.
   */
  function setDefaultCard() {
    if (allEmojis.value.size === 0) {
      loadEmojis()
    }
    stagingMessage1.value = 'Welcome to Emoji-Shift!'
    stagingMessage2.value = 'Make your own emoji card!'
    resetAndRandomizeEmojis()
  }

  /**
   * Encodes the saved emojis and messages into a valid route query
   * string. The string is kept in the store itself.
   */
  function encodeShareParams() {
    const emojisRaw = savedEmojis.value
      .map((emoji) => {
        return emoji.codepoint
      })
      .toString()

    const emojisParam = encodeURIComponent(emojisRaw)
    const message1Param = encodeURIComponent(savedMessage1.value)
    const message2Param = encodeURIComponent(savedMessage2.value)

    const params = new URLSearchParams()
    params.set('emojis', emojisParam)
    params.set('msg1', message1Param)
    params.set('msg2', message2Param)

    queryString.value = params.toString()
  }

  /**
   * Loads data from a route query parameters object into the staging
   * properties.
   *
   * @param parameters QUery parameters object obtained from the route.
   */
  function decodeShareParams(parameters: EmojiShareParams) {
    stagingMessage1.value = decodeURIComponent(parameters.msg1)
    stagingMessage2.value = decodeURIComponent(parameters.msg2)

    const availableCodepoints: ValidCodepoints[] = Array.from(allEmojis.value.keys())
    const receivedCodepoints: ValidCodepoints[] = decodeURIComponent(parameters.emojis)
      .split(',')
      .map((rawCodepoint) => {
        return Number(rawCodepoint)
      })
      .filter((codepoint) => {
        return availableCodepoints.includes(codepoint)
      })

    stagingEmojis.value = receivedCodepoints.map((codepoint) => {
      return { codepoint, key: getRandomStr(10) }
    })
  }

  /**
   * Loads the current staging state into the saved state and updates
   * its corresponding route query string.
   */
  function saveState() {
    savedMessage1.value = stagingMessage1.value
    savedMessage2.value = stagingMessage2.value
    savedEmojis.value = [...stagingEmojis.value]

    encodeShareParams()
  }

  /**
   * Loads the current saved sate into the staging state. Also triggers
   * a toast UI element.
   */
  function loadState() {
    if (Object.keys(savedEmojis.value).length === 0) {
      triggerToast("You haven't saved an emoji card yet.")
    } else {
      stagingMessage1.value = savedMessage1.value
      stagingMessage2.value = savedMessage2.value
      stagingEmojis.value = { ...savedEmojis.value }

      triggerToast('Card loaded!')
    }
  }

  /**
   * Clears all staging data.
   */
  function clearStage() {
    stagingMessage1.value = ''
    stagingMessage2.value = ''
    stagingEmojis.value = []
  }

  /**
   * Clears all saved data.
   */
  function clearSave() {
    savedMessage1.value = ''
    savedMessage2.value = ''
    savedEmojis.value = []
    queryString.value = ''
  }

  /**
   * Sets and display a toast message for a given duration
   *
   * @param msg Message to display.
   * @param duration Toast duration in ms. Defaults to 3000.
   */
  function triggerToast(msg: string, duration = 3000) {
    toastMsg.value = msg
    showToast.value = true
    setTimeout(() => {
      showToast.value = false
    }, duration)
  }

  return {
    allEmojis,
    savedEmojis,
    savedMessage1,
    savedMessage2,
    stagingEmojis,
    stagingMessage1,
    stagingMessage2,
    showToast,
    toastMsg,
    queryString,
    clearSave,
    clearStage,
    decodeShareParams,
    encodeShareParams,
    insertEmojiAtIndex,
    loadEmojis,
    loadState,
    makeCopy,
    moveFromIndex,
    moveLeft,
    moveRight,
    removeEmoji,
    resetAndRandomizeEmojis,
    saveState,
    setDefaultCard,
    setEmoji,
    shiftEmoji,
    swapEmojis,
    triggerToast
  }
})
