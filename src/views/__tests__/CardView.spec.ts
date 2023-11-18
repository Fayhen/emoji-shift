import { beforeEach, describe, it, expect, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useRoute, type RouteLocationNormalizedLoaded } from 'vue-router'
import { mount } from '@vue/test-utils'

import { useEmojiStore } from '@/stores/emojis'
import { getRandomStr } from '@/utils/randomStr'

import CardView from '../CardView.vue'

vi.mock('vue-router')

const topMsg = 'Top message' + getRandomStr(10)
const bottomMsg = 'Bottom message' + getRandomStr(10)
const emojis = [
  {
    codepoint: 0x2764,
    key: getRandomStr(10)
  },
  {
    codepoint: 0x1f496,
    key: getRandomStr(10)
  },
  {
    codepoint: 0x1f49e,
    key: getRandomStr(10)
  }
]

describe('CardView', () => {
  vi.mocked(useRoute).mockReturnValue({
    query: {}
  } as RouteLocationNormalizedLoaded)

  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders properly', () => {
    const store = useEmojiStore()
    store.savedMessage1 = topMsg
    store.savedMessage2 = bottomMsg
    store.savedEmojis = emojis

    const wrapper = mount(CardView)
    const cardWrapper = wrapper.get('[data-test="card-wrapper"]')
    const topMessageWrapper = wrapper.get('[data-test="top-message-wrapper"]')
    const bottomMessageWrapper = wrapper.get('[data-test="bottom-message-wrapper"]')
    const emojisWrapper = wrapper.get('[data-test="emojis-wrapper"]')
    const editButton = wrapper.get('[data-test="edit-button"]')
    const homeButton = wrapper.get('[data-test="home-button"]')

    expect(cardWrapper.isVisible()).toBe(true)
    expect(topMessageWrapper.isVisible()).toBe(true)
    expect(bottomMessageWrapper.isVisible()).toBe(true)
    expect(emojisWrapper.isVisible()).toBe(true)
    expect(editButton.isVisible()).toBe(true)
    expect(homeButton.isVisible()).toBe(true)
  })

  it('renders saved card data', () => {
    const store = useEmojiStore()
    store.savedMessage1 = topMsg
    store.savedMessage2 = bottomMsg
    store.savedEmojis = emojis

    const wrapper = mount(CardView)
    const topMessageWrapper = wrapper.get('[data-test="top-message-wrapper"]')
    const bottomMessageWrapper = wrapper.get('[data-test="bottom-message-wrapper"]')
    const emojisWrapper = wrapper.get('[data-test="emojis-wrapper"]')

    expect(topMessageWrapper.text()).toContain(topMsg)
    expect(bottomMessageWrapper.text()).toContain(bottomMsg)
    expect(emojisWrapper.text()).toContain(String.fromCodePoint(emojis[0].codepoint))
    expect(emojisWrapper.text()).toContain(String.fromCodePoint(emojis[1].codepoint))
    expect(emojisWrapper.text()).toContain(String.fromCodePoint(emojis[2].codepoint))
  })
})
