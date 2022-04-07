/// <reference types="cypress" />

beforeEach('Visit menu', () => {
    cy.visit('localhost:8000/menu')
    cy.clickAndCheckSingleIsHighlighted('Beef Entree')
})

describe('Beef Entree for beef broccoli', () => {
    it('Click beef broccoli plus button, then minus button', () => {
        // Click plus button
        cy.clickPlusButtonAndCheckQuantity('entrees', 'Beef Broccoli', 'quantity', 1)
        cy.checkAddToCartButtonEnabled('entrees', 'Beef Broccoli', 'addToCartForEntree')

        // Click minus button
        cy.clickMinusButtonAndCheckQuantity('entrees', 'Beef Broccoli', 'quantity', 0)
        cy.checkAddToCartButtonDisabled('entrees', 'Beef Broccoli', 'addToCartForEntree')
    })
})

describe('Beef Entree for hunan beef', () => {
    it('Click hunan beef plus button, then minus button', () => {
        // Click plus button
        cy.clickPlusButtonAndCheckQuantity('entrees', 'Hunan Beef', 'quantity', 1)
        cy.checkAddToCartButtonEnabled('entrees', 'Hunan Beef', 'addToCartForEntree')

        // Click minus button
        cy.clickMinusButtonAndCheckQuantity('entrees', 'Hunan Beef', 'quantity', 0)
        cy.checkAddToCartButtonDisabled('entrees', 'Hunan Beef', 'addToCartForEntree')
    })
})

describe('Beef Entree for pepper steak', () => {
    it('Click pepper steak plus button, then minus button', () => {
        // Click plus button
        cy.clickPlusButtonAndCheckQuantity('entrees', 'Pepper Steak', 'quantity', 1)
        cy.checkAddToCartButtonEnabled('entrees', 'Pepper Steak', 'addToCartForEntree')

        // Click minus button
        cy.clickMinusButtonAndCheckQuantity('entrees', 'Pepper Steak', 'quantity', 0)
        cy.checkAddToCartButtonDisabled('entrees', 'Pepper Steak', 'addToCartForEntree')
    })
})