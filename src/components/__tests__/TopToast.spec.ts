import { beforeEach, describe, it, expect } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { mount } from '@vue/test-utils'

import { useEmojiStore } from '@/stores/emojis'
import { getRandomStr } from '@/utils/randomStr'

import TopToast from '../TopToast.vue'

describe('TopToast', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders properly when active in the store', () => {
    const toastMsg = 'Test toast' + getRandomStr(10)
    const store = useEmojiStore()
    store.toastMsg = toastMsg
    store.showToast = true

    const wrapper = mount(TopToast)
    const toast = wrapper.get('[data-test="toast"]')
    expect(toast.isVisible()).toBe(true)
    expect(toast.text()).toContain(toastMsg)
  })

  it('is not rendered when not active in the emojis store', () => {
    const store = useEmojiStore()
    store.showToast = false

    const wrapper = mount(TopToast)
    const toast = wrapper.find('[data-test="toast"]')
    expect(toast.exists()).toBe(false)
  })
})
