import { reactive } from 'vue'
import type { EmojiData, ValidCodepoints } from '@/models/emojis'

// allEmojis is category: { codepoint: label }
const state = reactive<{
  showToast: boolean
  toastMsg: string
  queryString: string
  stagingMessage1: string
  stagingMessage2: string
  savedMessage1: string
  savedMessage2: string
  allEmojis: Map<number, EmojiData>
  stagingEmojis: ValidCodepoints[]
  savedEmojis: ValidCodepoints[]
}>({
  showToast: false,
  toastMsg: 'Default',
  queryString: '',
  stagingMessage1: '',
  stagingMessage2: '',
  savedMessage1: '',
  savedMessage2: '',
  allEmojis: new Map<number, EmojiData>(),
  stagingEmojis: new Array<ValidCodepoints>(),
  savedEmojis: new Array<ValidCodepoints>()
})

export { state as default }
