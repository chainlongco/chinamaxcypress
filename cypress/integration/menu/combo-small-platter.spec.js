/// <reference types="cypress" />

beforeEach('Visit menu', () => {
    cy.visit('localhost:8000/menu')
})

describe('Click combo -- small platter', () => {
    const comboName = "Small Platter"

    it('Click and check combo is highlighted', () => {
        cy.clickAndCheckComboIsHighlighted(comboName)
    })

    it('Check maximum sides/entrees/drinks for this combo', () => {
        cy.clickAndCheckComboMaxSideEntreeDrink(comboName)
    })

    it('Check side/entree/drink choices and hover them for this combo', () => {
        cy.clickAndCheckComboChoicesAndHoverThem(comboName)
    })

    it('Click and check minus/quantity/plus and Add to cart buttons for this combo', () => {
        cy.comboQuantityAndAddToCartButton(comboName)
    })

    it('Mouse hover in and underline the combo name', () => {
        cy.hoverAndUnderlineFromProductTable(comboName)
    })
})