import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import EmojiItem from '../EmojiItem.vue'

describe('EmojiItem', () => {
  it('renders properly', () => {
    const codepoint = 0x2764
    const label = 'Red Heart'

    const wrapper = mount(EmojiItem, {
      props: { codepoint, label }
    })
    const renderedEmoji = wrapper.get('[data-test="emoji-item"]')

    expect(renderedEmoji.isVisible()).toBe(true)
    expect(renderedEmoji.text()).toContain(String.fromCodePoint(codepoint))
    expect(renderedEmoji.attributes()['aria-label']).toBe(label)
  })
})
