import { beforeEach, describe, it, expect, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useRoute, type RouteLocationNormalizedLoaded } from 'vue-router'
import { shallowMount } from '@vue/test-utils'

import HomeView from '../HomeView.vue'
import AddEmoji from '@/components/AddEmoji.vue'

vi.mock('vue-router')

describe('HomeView', () => {
  vi.mocked(useRoute).mockReturnValue({
    query: {}
  } as RouteLocationNormalizedLoaded)

  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders properly', () => {
    const wrapper = shallowMount(HomeView)
    const topMessageWrapper = wrapper.get('[data-test="top-message-wrapper"]')
    const bottomMessageWrapper = wrapper.get('[data-test="bottom-message-wrapper"]')
    const emojisWrapper = wrapper.get('[data-test="emojis-wrapper"]')
    const cardActionsWrapper = wrapper.get('[data-test="card-actions-wrapper"]')
    const restartButton = wrapper.get('[data-test="restart-button"]')
    const randomizeButton = wrapper.get('[data-test="randomize-button"]')
    const saveButton = wrapper.get('[data-test="save-button"]')
    const loadButton = wrapper.get('[data-test="load-button"]')
    const clearAllButton = wrapper.get('[data-test="clear-all-button"]')
    const addEmojisWrapper = wrapper.get('[data-test="add-emojis-wrapper"]')
    const addEmoji = wrapper.findComponent(AddEmoji)

    expect(topMessageWrapper.isVisible()).toBe(true)
    expect(bottomMessageWrapper.isVisible()).toBe(true)
    expect(emojisWrapper.isVisible()).toBe(true)
    expect(cardActionsWrapper.isVisible()).toBe(true)
    expect(restartButton.isVisible()).toBe(true)
    expect(randomizeButton.isVisible()).toBe(true)
    expect(saveButton.isVisible()).toBe(true)
    expect(loadButton.isVisible()).toBe(true)
    expect(clearAllButton.isVisible()).toBe(true)
    expect(addEmojisWrapper.isVisible()).toBe(true)
    expect(addEmoji.exists()).toBe(true)
  })
})
