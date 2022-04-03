/// <reference types="cypress" />

beforeEach('Visit menu', () => {
    cy.visit('localhost:8000/menu')
})

describe('Click single -- beef entree', () => {
    const singleName = "Beef Entree"

    it('Click and check single is highlighted', () => {
        cy.clickAndCheckSingleIsHighlighted(singleName)
    })

    it('Check choices for beef entree', () => {
        cy.clickAndCheckSingleEntreeChoices("Beef")
    })

    it('Mouse hover in and underline the single name', () => {
        cy.hoverAndUnderlineFromSingleTable(singleName)
    })
})