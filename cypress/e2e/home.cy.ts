describe('The home page', () => {
  it('loads an emoji card on edit mode by default', () => {
    cy.visit('/')
    cy.get('[data-test="top-message-wrapper"]')
      .should('be.visible')
      .and('contain.text', 'Welcome to Emoji-Shift!')
    cy.get('[data-test="bottom-message-wrapper"]')
      .should('be.visible')
      .and('contain.text', 'Make your own emoji card!')
    cy.get('[data-test="emojis-wrapper"]').should('be.visible')
    cy.get('[data-test="emoji-item-wrapper"]').should('be.visible').and('have.length', 4)
    cy.get('[data-test="card-actions-wrapper"]').should('be.visible')
    cy.get('[data-test="restart-button"]').should('be.visible')
    cy.get('[data-test="randomize-button"]').should('be.visible')
    cy.get('[data-test="save-button"]').should('be.visible')
    cy.get('[data-test="load-button"]').should('be.visible')
    cy.get('[data-test="clear-all-button"]').should('be.visible')
    cy.get('[data-test="add-emojis-wrapper"]').should('be.visible')
    cy.get('[data-test="add-emoji-button"]').should('be.visible').and('have.length.greaterThan', 0)
  })

  it('has functional emoji item controls', () => {
    cy.visit('/')

    cy.get('[data-test="emojis-wrapper"]')
      .invoke('text')
      .then((text) => {
        cy.get('[data-test="move-right-button"]').first().click()
        cy.get('[data-test="emojis-wrapper"]').invoke('text').should('not.equal', text)
      })

    cy.get('[data-test="emojis-wrapper"]')
      .invoke('text')
      .then((text) => {
        cy.get('[data-test="move-left-button"]').last().click()
        cy.get('[data-test="emojis-wrapper"]').invoke('text').should('not.equal', text)
      })

    cy.get('[data-test="emoji-item-wrapper"]').should('have.length', 4)
    cy.get('[data-test="copy-emoji-button"]').first().click()
    cy.get('[data-test="emoji-item-wrapper"]').should('have.length', 5)

    cy.get('[data-test="emoji-item-wrapper"]').should('have.length', 5)
    cy.get('[data-test="remove-emoji-button"]').first().click()
    cy.get('[data-test="emoji-item-wrapper"]').should('have.length', 4)

    cy.get('[data-test="add-emoji-button"]').first().click()
    cy.get('[data-test="emoji-item-wrapper"]').should('have.length', 5)

    cy.get('[data-test="emojis-wrapper"]')
      .invoke('text')
      .then((text) => {
        cy.get('[data-test="randomize-button"]').first().click()
        cy.get('[data-test="emojis-wrapper"]').invoke('text').should('not.equal', text)
      })

    cy.get('[data-test="clear-all-button"]').first().click()
    cy.get('[data-test="emoji-item-wrapper"]').should('not.exist')

    cy.get('[data-test="restart-button"]').first().click()
    cy.get('[data-test="emoji-item-wrapper"]').should('have.length', 4)
  })

  // TODO: Figure out how to make drag and drop work
  // it('can drag and drop emojis', () => {
  //   const dataTransfer = new DataTransfer()
  //   cy.viewport(1000, 600)
  //   cy.visit('/')

  //   cy.get('[data-test="emojis-wrapper"]')
  //     .invoke('text')
  //     .then((text) => {
  //       // cy.get('[data-test="emoji-item-wrapper"]').first().trigger('dragstart', { dataTransfer })
  //       // cy.get('[data-test="emoji-item-wrapper"]').last().trigger('drop', { dataTransfer })
  //       // cy.get('[data-test="emojis-wrapper"]').invoke('text').should('not.equal', text)

  //       // cy.get('[data-test="emoji-item-wrapper"]').first().trigger('dragstart', 'center')
  //       // cy.get('[data-test="emoji-item-wrapper"]').last().trigger('dragover', 'center')
  //       // cy.get('[data-test="emoji-item-wrapper"]').last().trigger('drop', 'center', { force: true })
  //       // cy.get('[data-test="emojis-wrapper"]').invoke('text').should('not.equal', text)

  //       // eslint-disable-next-line cypress/unsafe-to-chain-command
  //       // cy.get('[data-test="emoji-item-wrapper"]').first()
  //       //   .trigger('mousedown', { which: 1 })
  //       //   .trigger('mousemove', { clientX: 400, clientY: 600 })
  //       //   .trigger('mouseup', { force: true })
  //       // cy.get('[data-test="emojis-wrapper"]').invoke('text').should('not.equal', text)

  //       // cy.get('[data-test="emoji-item-wrapper"]').first().trigger('dragstart', 'center')
  //       // // eslint-disable-next-line cypress/no-unnecessary-waiting, cypress/unsafe-to-chain-command
  //       // cy.get('[data-test="emoji-item-wrapper"]')
  //       //   .last()
  //       //   .trigger('dragenter', { force: true })
  //       //   .trigger('dragover', { force: true })
  //       //   .trigger('drop', { force: true })
  //       //   .wait(50)
  //       //   .trigger('dragend', { force: true })
  //       // cy.get('[data-test="emoji-item-wrapper"]').last().trigger('drop', 'center', { force: true })
  //       // cy.get('[data-test="emojis-wrapper"]').invoke('text').should('not.equal', text)

  //       cy.get('[data-test="emoji-item-wrapper"]').last().as('lastEmoji')
  //       cy.get('[data-test="emoji-item-wrapper"]').first().drag('@lastEmoji')
  //       cy.get('[data-test="emojis-wrapper"]').invoke('text').should('not.equal', text)
  //     })
  // })
})
