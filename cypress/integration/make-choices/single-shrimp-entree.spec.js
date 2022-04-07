/// <reference types="cypress" />

beforeEach('Visit menu', () => {
    cy.visit('localhost:8000/menu')
    cy.clickAndCheckSingleIsHighlighted('Shrimp Entree')
})

describe('Shrimp Entree for broccoli shrimp', () => {
    it('Click broccoli shrimp plus button, then minus button', () => {
        // Click plus button
        cy.clickPlusButtonAndCheckQuantity('entrees', 'Broccoli Shrimp', 'quantity', 1)
        cy.checkAddToCartButtonEnabled('entrees', 'Broccoli Shrimp', 'addToCartForEntree')

        // Click minus button
        cy.clickMinusButtonAndCheckQuantity('entrees', 'Broccoli Shrimp', 'quantity', 0)
        cy.checkAddToCartButtonDisabled('entrees', 'Broccoli Shrimp', 'addToCartForEntree')
    })
})

describe('Shrimp Entree for kung pao shrimp', () => {
    it('Click kung pao shrimp plus button, then minus button', () => {
        // Click plus button
        cy.clickPlusButtonAndCheckQuantity('entrees', 'Kung Pao Shrimp', 'quantity', 1)
        cy.checkAddToCartButtonEnabled('entrees', 'Kung Pao Shrimp', 'addToCartForEntree')

        // Click minus button
        cy.clickMinusButtonAndCheckQuantity('entrees', 'Kung Pao Shrimp', 'quantity', 0)
        cy.checkAddToCartButtonDisabled('entrees', 'Kung Pao Shrimp', 'addToCartForEntree')
    })
})