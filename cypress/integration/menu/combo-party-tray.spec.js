/// <reference types="cypress" />

beforeEach('Visit menu', () => {
    cy.visit('localhost:8000/menu')
})

describe('Click combo -- party tray', () => {
    const comboName = "Party Tray"

    it('Click and check combo is highlighted', () => {
        cy.clickAndCheckComboIsHighlighted(comboName)
    })

    it('Check maximum sides/entrees/drinks for this combo', () => {
        cy.clickAndCheckComboMaxSideEntreeDrink(comboName)
    })

    it('Check side/entree/drink choices for this combo', () => {
        cy.clickAndCheckComboChoices(comboName)
    })

    it('Click and check minus/quantity/plus and Add to cart buttons for this combo', () => {
        cy.comboQuantityAndAddToCartButton(comboName)
    })

    it('Mouse hover in and underline the combo name', () => {
        cy.hoverAndUnderlineFromProductTable(comboName)
    })
})