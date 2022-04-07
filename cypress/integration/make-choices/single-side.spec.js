/// <reference types="cypress" />

beforeEach('Visit menu', () => {
    cy.visit('http://localhost:8000/menu')
    cy.clickAndCheckSingleIsHighlighted('Side')
})

describe('Side for fried rice', () => {
    it('Click fried rice plus button, then minus button', () => {
        // Click plus button
        cy.clickPlusButtonAndCheckQuantity('sides', 'Fried Rice', 'quantity', 1)
        cy.checkAddToCartButtonEnabled('sides', 'Fried Rice', 'addToCartForSide')

        // Click minus button
        cy.clickMinusButtonAndCheckQuantity('sides', 'Fried Rice', 'quantity', 0)
        cy.checkAddToCartButtonDisabled('sides', 'Fried Rice', 'addToCartForSide')
    })
})

describe('Side for chow mein', () => {
    it('Click chow mein plus button, then minus button', () => {
        // Click plus button
        cy.clickPlusButtonAndCheckQuantity('sides', 'Chow Mein', 'quantity', 1)
        cy.checkAddToCartButtonEnabled('sides', 'Chow Mein', 'addToCartForSide')

        // Click minus button
        cy.clickMinusButtonAndCheckQuantity('sides', 'Chow Mein', 'quantity', 0)
        cy.checkAddToCartButtonDisabled('sides', 'Chow Mein', 'addToCartForSide')
    })
})

describe('Side for steam white rice', () => {
    it('Click steam white rice plus button, then minus button', () => {
        // Click plus button
        cy.clickPlusButtonAndCheckQuantity('sides', 'Steam White Rice', 'quantity', 1)
        cy.checkAddToCartButtonEnabled('sides', 'Steam White Rice', 'addToCartForSide')

        // Click minus button
        cy.clickMinusButtonAndCheckQuantity('sides', 'Steam White Rice', 'quantity', 0)
        cy.checkAddToCartButtonDisabled('sides', 'Steam White Rice', 'addToCartForSide')
    })
})