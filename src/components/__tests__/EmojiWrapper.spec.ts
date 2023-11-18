import { beforeEach, describe, it, expect } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { shallowMount } from '@vue/test-utils'

import { useEmojiStore } from '@/stores/emojis'
import { getRandomStr } from '@/utils/randomStr'

import EmojiWrapper from '../EmojiWrapper.vue'

const emojis = [
  {
    codepoint: 0x2764,
    key: getRandomStr(10)
  },
  {
    codepoint: 0x1f496,
    key: getRandomStr(10)
  }
]

describe('EmojiWrapper', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders properly on edit mode', () => {
    const store = useEmojiStore()
    store.stagingEmojis = [...emojis]

    const wrapper = shallowMount(EmojiWrapper, {
      props: { editMode: true }
    })
    const editModeWrapper = wrapper.find('[data-test="edit-mode-wrapper"]')
    const viewModeWrapper = wrapper.find('[data-test="view-mode-wrapper"]')

    expect(editModeWrapper.exists()).toBe(true)
    expect(editModeWrapper.isVisible()).toBe(true)
    expect(viewModeWrapper.exists()).toBe(false)

    const draggableArea = editModeWrapper.get('[data-test="draggable-area"]')
    expect(draggableArea.isVisible()).toBe(true)

    const emojiItems = draggableArea.findAll('[data-test="emoji-item-wrapper"]')
    expect(emojiItems).toHaveLength(2)

    const emojiItem = emojiItems[0]

    const emojiActions = emojiItem.get('[data-test="emoji-item-actions-wrapper"]')
    expect(emojiActions.isVisible()).toBe(true)

    const moveLeft = emojiActions.get('[data-test="move-left-button"]')
    const moveRight = emojiActions.get('[data-test="move-right-button"]')
    const shiftEmoji = emojiActions.get('[data-test="shift-emoji-button"]')
    const copyEmoji = emojiActions.get('[data-test="copy-emoji-button"]')
    const removeEmoji = emojiActions.get('[data-test="remove-emoji-button"]')

    expect(moveLeft.isVisible()).toBe(true)
    expect(moveRight.isVisible()).toBe(true)
    expect(shiftEmoji.isVisible()).toBe(true)
    expect(copyEmoji.isVisible()).toBe(true)
    expect(removeEmoji.isVisible()).toBe(true)
  })

  it('can edit emojis by moving left', async () => {
    const store = useEmojiStore()
    store.stagingEmojis = [...emojis]

    const wrapper = shallowMount(EmojiWrapper, {
      props: { editMode: true }
    })

    const emojiItems = wrapper.findAll('[data-test="emoji-item-wrapper"]')
    expect(emojiItems).toHaveLength(2)

    const emojiItemA = emojiItems[0]
    const emojiItemB = emojiItems[1]
    const moveLeftA = emojiItemA.get('[data-test="move-left-button"]')
    const moveLeftB = emojiItemB.get('[data-test="move-left-button"]')

    await moveLeftA.trigger('click')
    expect(
      store.stagingEmojis.map((e) => e.codepoint).join() === emojis.map((e) => e.codepoint).join()
    ).toBe(true)

    await moveLeftB.trigger('click')
    expect(
      store.stagingEmojis.map((e) => e.codepoint).join() === emojis.map((e) => e.codepoint).join()
    ).toBe(false)
  })

  it('can edit emojis by moving right', async () => {
    const store = useEmojiStore()
    store.stagingEmojis = [...emojis]

    const wrapper = shallowMount(EmojiWrapper, {
      props: { editMode: true }
    })

    const emojiItems = wrapper.findAll('[data-test="emoji-item-wrapper"]')
    expect(emojiItems).toHaveLength(2)

    const emojiItemA = emojiItems[0]
    const emojiItemB = emojiItems[1]
    const moveRightA = emojiItemA.get('[data-test="move-right-button"]')
    const moveRightB = emojiItemB.get('[data-test="move-right-button"]')

    await moveRightB.trigger('click')
    expect(
      store.stagingEmojis.map((e) => e.codepoint).join() === emojis.map((e) => e.codepoint).join()
    ).toBe(true)

    await moveRightA.trigger('click')
    expect(
      store.stagingEmojis.map((e) => e.codepoint).join() === emojis.map((e) => e.codepoint).join()
    ).toBe(false)
  })

  it('can edit emojis by shifting them', async () => {
    const store = useEmojiStore()
    store.stagingEmojis = [...emojis]

    const wrapper = shallowMount(EmojiWrapper, {
      props: { editMode: true }
    })

    const emojiItems = wrapper.findAll('[data-test="emoji-item-wrapper"]')
    expect(emojiItems).toHaveLength(2)
    expect(
      store.stagingEmojis.map((e) => e.codepoint).join() === emojis.map((e) => e.codepoint).join()
    ).toBe(true)

    const emojiItem = emojiItems[0]
    const shiftEmojiButton = emojiItem.get('[data-test="shift-emoji-button"]')

    // This will try to shift the emoji up to ten times, breaking the loop early
    let lastCodepoint = store.stagingEmojis[0].codepoint
    for (let i = 0; i < 10; i++) {
      await shiftEmojiButton.trigger('click')
      lastCodepoint = store.stagingEmojis[0].codepoint
      if (lastCodepoint !== emojis[0].codepoint) {
        break
      }
    }

    expect(
      store.stagingEmojis.map((e) => e.codepoint).join() === emojis.map((e) => e.codepoint).join()
    ).toBe(false)
  })

  it('can edit emojis by copying them', async () => {
    const store = useEmojiStore()
    store.stagingEmojis = [...emojis]

    const wrapper = shallowMount(EmojiWrapper, {
      props: { editMode: true }
    })

    const emojiItems = wrapper.findAll('[data-test="emoji-item-wrapper"]')
    expect(store.stagingEmojis).toHaveLength(2)

    const emojiItem = emojiItems[0]
    const copyEmojiButton = emojiItem.get('[data-test="copy-emoji-button"]')

    await copyEmojiButton.trigger('click')
    expect(store.stagingEmojis).toHaveLength(3)
  })

  it('can edit emojis by removing them', async () => {
    const store = useEmojiStore()
    store.stagingEmojis = [...emojis]

    const wrapper = shallowMount(EmojiWrapper, {
      props: { editMode: true }
    })

    const emojiItems = wrapper.findAll('[data-test="emoji-item-wrapper"]')
    expect(store.stagingEmojis).toHaveLength(2)

    const emojiItem = emojiItems[0]
    const removeEmojiButton = emojiItem.get('[data-test="remove-emoji-button"]')

    await removeEmojiButton.trigger('click')
    expect(store.stagingEmojis).toHaveLength(1)
  })

  // it('can edit emojis by drag and drop', async () => {
  //   // TODO: this may need to be implemented on E2E
  // })

  it('has a placeholder message on edit mode if no emojis were added', () => {
    const store = useEmojiStore()
    store.stagingEmojis = []

    const wrapper = shallowMount(EmojiWrapper, {
      props: { editMode: true }
    })

    expect(wrapper.text()).toContain('Use the add buttons bellow to start your Emoji Card.')
  })

  it('renders properly on view mode', () => {
    const store = useEmojiStore()
    store.savedEmojis = [...emojis]

    const wrapper = shallowMount(EmojiWrapper, {
      props: { editMode: false }
    })
    const editModeWrapper = wrapper.find('[data-test="edit-mode-wrapper"]')
    const viewModeWrapper = wrapper.find('[data-test="view-mode-wrapper"]')

    expect(editModeWrapper.exists()).toBe(false)
    expect(viewModeWrapper.exists()).toBe(true)
    expect(viewModeWrapper.isVisible()).toBe(true)

    const viewArea = viewModeWrapper.get('[data-test="view-area"]')
    expect(viewArea.isVisible()).toBe(true)

    const emojiItems = viewArea.findAll('[data-test="emoji-item-wrapper"]')
    expect(emojiItems).toHaveLength(2)

    const emojiActions = wrapper.find('[data-test="emoji-item-actions-wrapper"]')
    const moveLeft = wrapper.find('[data-test="move-left-button"]')
    const moveRight = wrapper.find('[data-test="move-right-button"]')
    const shiftEmoji = wrapper.find('[data-test="shift-emoji-button"]')
    const copyEmoji = wrapper.find('[data-test="copy-emoji-button"]')
    const removeEmoji = wrapper.find('[data-test="remove-emoji-button"]')

    expect(emojiActions.exists()).toBe(false)
    expect(moveLeft.exists()).toBe(false)
    expect(moveRight.exists()).toBe(false)
    expect(shiftEmoji.exists()).toBe(false)
    expect(copyEmoji.exists()).toBe(false)
    expect(removeEmoji.exists()).toBe(false)
  })

  it('has a placeholder message on view mode if no emojis were added', () => {
    const store = useEmojiStore()
    store.stagingEmojis = []

    const wrapper = shallowMount(EmojiWrapper, {
      props: { editMode: false }
    })

    expect(wrapper.text()).toContain("You haven't saved any emojis to your emoji card yet.")
  })
})
