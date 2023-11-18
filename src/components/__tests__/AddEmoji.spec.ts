import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import AddEmoji from '../AddEmoji.vue'

describe('AddEmoji', () => {
  it('renders properly', () => {
    const wrapper = mount(AddEmoji)
    const buttonContainer = wrapper.get('[data-test="button-wrapper"]')
    expect(wrapper.text()).toContain('Add Emojis!')
    expect(buttonContainer.isVisible()).toBeTruthy()
  })

  it('contains emoji buttons', () => {
    const wrapper = mount(AddEmoji)
    const buttons = wrapper.findAll('[data-test="add-emoji-button"')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })
})
