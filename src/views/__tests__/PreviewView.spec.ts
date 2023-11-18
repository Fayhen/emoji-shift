import { beforeEach, describe, it, expect } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { mount, shallowMount } from '@vue/test-utils'

import { useEmojiStore } from '@/stores/emojis'
import { getRandomStr } from '@/utils/randomStr'

import PreviewView from '../PreviewView.vue'

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

describe('PreviewView', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders properly', () => {
    const store = useEmojiStore()
    store.savedMessage1 = topMsg
    store.savedMessage2 = bottomMsg
    store.savedEmojis = emojis
    store.encodeShareParams()

    const wrapper = shallowMount(PreviewView)
    const topMessageWrapper = wrapper.get('[data-test="top-message-wrapper"]')
    const bottomMessageWrapper = wrapper.get('[data-test="bottom-message-wrapper"]')
    const emojisWrapper = wrapper.get('[data-test="emojis-wrapper"]')
    const shareLinkWrapper = wrapper.get('[data-test="share-link-wrapper"]')

    expect(topMessageWrapper.isVisible()).toBe(true)
    expect(bottomMessageWrapper.isVisible()).toBe(true)
    expect(emojisWrapper.isVisible()).toBe(true)
    expect(shareLinkWrapper.isVisible()).toBe(true)
  })

  it('renders saved card data', () => {
    const store = useEmojiStore()
    store.savedMessage1 = topMsg
    store.savedMessage2 = bottomMsg
    store.savedEmojis = emojis
    store.encodeShareParams()

    const wrapper = mount(PreviewView)
    const topMessageWrapper = wrapper.get('[data-test="top-message-wrapper"]')
    const bottomMessageWrapper = wrapper.get('[data-test="bottom-message-wrapper"]')
    const emojisWrapper = wrapper.get('[data-test="emojis-wrapper"]')
    const shareLinkWrapper = wrapper.get('[data-test="share-link-wrapper"]')

    expect(topMessageWrapper.text()).toContain(topMsg)
    expect(bottomMessageWrapper.text()).toContain(bottomMsg)
    expect(emojisWrapper.text()).toContain(String.fromCodePoint(emojis[0].codepoint))
    expect(emojisWrapper.text()).toContain(String.fromCodePoint(emojis[1].codepoint))
    expect(emojisWrapper.text()).toContain(String.fromCodePoint(emojis[2].codepoint))
    expect(shareLinkWrapper.text()).toContain(store.queryString)
  })
})
