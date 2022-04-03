/// <reference types="cypress" />

beforeEach('Visit menu', () => {
    cy.visit('localhost:8000/menu')
})

describe('Click single -- chicken entree', () => {
    const singleName = "Chicken Entree"

    it('Click and check single is highlighted', () => {
        cy.clickAndCheckSingleIsHighlighted(singleName)
    })

    it('Check choices for chicken entree', () => {
        cy.clickAndCheckSingleEntreeChoices("Chicken")
    })

    it('Mouse hover in and underline the single name', () => {
        cy.hoverAndUnderlineFromSingleTable(singleName)
    })
})