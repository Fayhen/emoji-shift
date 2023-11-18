import { describe, it, expect } from 'vitest'
import { mount, type DOMWrapper } from '@vue/test-utils'
import { getRandomStr } from '@/utils/randomStr'

import MessageWrapper from '../MessageWrapper.vue'

describe('MessageWrapper', () => {
  it('renders messages on view mode', () => {
    const message = 'Test message ' + getRandomStr(10)
    const wrapper = mount(MessageWrapper, {
      props: { msg: message, editMode: false }
    })
    const messageWrapper = wrapper.get('[data-test="message-wrapper"]')

    expect(messageWrapper.isVisible()).toBe(true)
    expect(messageWrapper.text()).toContain(message)
  })

  it('hides message on view mode if none is set', () => {
    const wrapper = mount(MessageWrapper, {
      props: { msg: '', editMode: false }
    })
    const messageWrapper = wrapper.findAll('[data-test="message-wrapper"]')

    expect(messageWrapper.length).toBe(0)
  })

  it('renders messages on edit mode', () => {
    const message = 'Test message ' + getRandomStr(10)
    const wrapper = mount(MessageWrapper, {
      props: { msg: message, editMode: true }
    })
    const messageWrapper = wrapper.get('[data-test="message-wrapper"]')
    const editButton = wrapper.get('[data-test="edit-button"]')
    const removeButton = wrapper.get('[data-test="remove-button"]')

    expect(messageWrapper.isVisible()).toBe(true)
    expect(messageWrapper.text()).toContain(message)
    expect(editButton.isVisible()).toBe(true)
    expect(removeButton.isVisible()).toBe(true)
  })

  it('has functional message editing elements on edit mode', async () => {
    const initialMessage = 'Test message ' + getRandomStr(10)
    const modifiedMessage = 'Modified message'
    const wrapper = mount(MessageWrapper, {
      props: { msg: initialMessage, editMode: true }
    })
    const messageWrapper = wrapper.get('[data-test="message-wrapper"]')
    const editButton = wrapper.get('[data-test="edit-button"]')

    expect(messageWrapper.text()).toContain(initialMessage)
    expect(editButton.isVisible()).toBe(true)

    await editButton.trigger('click')
    const messageForm = wrapper.get('[data-test="message-form"]') as Omit<
      DOMWrapper<HTMLFormElement>,
      'exists'
    >
    const messageInput = wrapper.get('[data-test="message-input"]') as Omit<
      DOMWrapper<HTMLInputElement>,
      'exists'
    >
    const submitButton = wrapper.get('[data-test="submit-button"]') as Omit<
      DOMWrapper<HTMLButtonElement>,
      'exists'
    >

    expect(messageForm.isVisible()).toBe(true)
    expect(messageInput.isVisible()).toBe(true)
    expect(submitButton.isVisible()).toBe(true)

    await messageInput.setValue(modifiedMessage)
    expect(messageInput.element.value).toBe(modifiedMessage)

    // TODO: Test emitted properties. This documentation syntax does not work.
    // await submitButton.trigger('click')
    // expect(wrapper.emitted()).toHaveProperty('update')

    // Note: Testing the full editing functionally must be done through
    // a higher parent component or E2E testing.
  })

  it('has placeholder elements if no message if set on edit mode', () => {
    const placeholderMessageA = 'No message here.'
    const placeholderMessageB = 'This area will not show up on your emoji card.'
    const wrapper = mount(MessageWrapper, {
      props: { msg: '', editMode: true }
    })
    const editButton = wrapper.get('[data-test="edit-button"]')
    const messageWrapper = wrapper.get('[data-test="message-wrapper"]')

    expect(editButton.isVisible()).toBe(true)
    expect(messageWrapper.isVisible()).toBe(true)
    expect(messageWrapper.text()).toContain(placeholderMessageA)
    expect(messageWrapper.text()).toContain(placeholderMessageB)
  })

  it('has functional message editing elements on edit mode if no message is set', async () => {
    const newMessage = 'Test message ' + getRandomStr(10)
    const wrapper = mount(MessageWrapper, {
      props: { msg: '', editMode: true }
    })
    const editButton = wrapper.get('[data-test="edit-button"]')
    const messageWrapper = wrapper.get('[data-test="message-wrapper"]')

    expect(editButton.isVisible()).toBe(true)
    expect(messageWrapper.isVisible()).toBe(true)

    await editButton.trigger('click')
    const messageForm = wrapper.get('[data-test="message-form"]') as Omit<
      DOMWrapper<HTMLFormElement>,
      'exists'
    >
    const messageInput = wrapper.get('[data-test="message-input"]') as Omit<
      DOMWrapper<HTMLInputElement>,
      'exists'
    >
    const submitButton = wrapper.get('[data-test="submit-button"]') as Omit<
      DOMWrapper<HTMLButtonElement>,
      'exists'
    >

    expect(messageForm.isVisible()).toBe(true)
    expect(messageInput.isVisible()).toBe(true)
    expect(submitButton.isVisible()).toBe(true)

    await messageInput.setValue(newMessage)
    expect(messageInput.element.value).toBe(newMessage)

    // TODO: Test emitted properties. This documentation syntax does not work.
    // await submitButton.trigger('click')
    // expect(wrapper.emitted()).toHaveProperty('update')

    // Note: Testing the full editing functionally must be done through
    // a higher parent component or E2E testing.
  })

  // Note: The test below must be done through a higher parent component
  // or E2E testing.
  // it('allows removing messages through a button', async () => {
  //   const initialMessage = 'Test message ' + getRandomStr(10)
  //   const placeholderMessageA = 'No message here.'
  //   const placeholderMessageB = 'This area will not show up on your emoji card.'
  //   const wrapper = mount(MessageWrapper, {
  //     props: { msg: initialMessage, editMode: true }
  //   })
  //   const removeButton = wrapper.get('[data-test="remove-button"]')
  //   let messageWrapper = wrapper.get('[data-test="message-wrapper"]')

  //   expect(messageWrapper.isVisible()).toBe(true)
  //   expect(messageWrapper.text()).toContain(initialMessage)
  //   expect(removeButton.isVisible()).toBe(true)

  //   await removeButton.trigger('click')
  //   messageWrapper = wrapper.get('[data-test="message-wrapper"]')
  //   expect(messageWrapper.text()).toContain(placeholderMessageA)
  //   expect(messageWrapper.text()).toContain(placeholderMessageB)
  // })
})
