/// <reference types="cypress" />

beforeEach('Visit menu', () => {
    cy.visit('http://localhost:8000/menu')
    cy.clickAndCheckAppetizersIsHighlighted()
})

describe('Appetizers', () => {
    it('Click Egg Roll (5) plus button, then minus button', () => {
        // Click plus button
        cy.clickPlusButtonAndCheckQuantity('products', 'Egg Roll (5)', 'quantity', 1)
        cy.checkAddToCartButtonEnabled('products', 'Egg Roll (5)', 'addToCart')

        // Click minus button
        cy.clickMinusButtonAndCheckQuantity('products', 'Egg Roll (5)', 'quantity', 0)
        cy.checkAddToCartButtonDisabled('products', 'Egg Roll (5)', 'addToCart')
    })

    it('Click Crab Rangoon (6) plus button, then minus button', () => {
        // Click plus button
        cy.clickPlusButtonAndCheckQuantity('products', 'Crab Rangoon (6)', 'quantity', 1)
        cy.checkAddToCartButtonEnabled('products', 'Crab Rangoon (6)', 'addToCart')

        // Click minus button
        cy.clickMinusButtonAndCheckQuantity('products', 'Crab Rangoon (6)', 'quantity', 0)
        cy.checkAddToCartButtonDisabled('products', 'Crab Rangoon (6)', 'addToCart')
    })

    it('Click Fried Dumpling (5) plus button, then minus button', () => {
        // Click plus button
        cy.clickPlusButtonAndCheckQuantity('products', 'Fried Dumpling (5)', 'quantity', 1)
        cy.checkAddToCartButtonEnabled('products', 'Fried Dumpling (5)', 'addToCart')

        // Click minus button
        cy.clickMinusButtonAndCheckQuantity('products', 'Fried Dumpling (5)', 'quantity', 0)
        cy.checkAddToCartButtonDisabled('products', 'Fried Dumpling (5)', 'addToCart')
    })
})