import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import AboutView from '../AboutView.vue'

describe('AboutView', () => {
  it('renders properly', () => {
    const wrapper = mount(AboutView)
    const about = wrapper.get('[data-test="about-section"]')

    expect(about.isVisible()).toBe(true)
  })

  it('contains author links', () => {
    const wrapper = mount(AboutView)
    const links = wrapper.findAll('a').map((anchor) => {
      return anchor.element.getAttribute('href')
    })

    expect(links.includes('https://github.com/Fayhen/emoji-shift')).toBe(true)
    expect(links.includes('www.linkedin.com/in/diegogcsouza')).toBe(true)
    expect(links.includes('https://twitter.com/Fayhen1')).toBe(true)
  })
})
