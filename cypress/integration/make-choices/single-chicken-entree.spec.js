/// <reference types="cypress" />

beforeEach('Visit menu', () => {
    cy.visit('localhost:8000/menu')
    cy.clickAndCheckSingleIsHighlighted('Chicken Entree')
})

describe('Chicken Entree for BBQ chicken', () => {
    it('Click BBQ chicken plus button, then minus button', () => {
        // Click plus button
        cy.clickPlusButtonAndCheckQuantity('entrees', 'BBQ Chicken', 'quantity', 1)
        cy.checkAddToCartButtonEnabled('entrees', 'BBQ Chicken', 'addToCartForEntree')

        // Click minus button
        cy.clickMinusButtonAndCheckQuantity('entrees', 'BBQ Chicken', 'quantity', 0)
        cy.checkAddToCartButtonDisabled('entrees', 'BBQ Chicken', 'addToCartForEntree')
    })
})

describe('Chicken Entree for black pepper chicken', () => {
    it('Click black pepper chicken plus button, then minus button', () => {
        // Click plus button
        cy.clickPlusButtonAndCheckQuantity('entrees', 'Black Pepper Chicken', 'quantity', 1)
        cy.checkAddToCartButtonEnabled('entrees', 'Black Pepper Chicken', 'addToCartForEntree')

        // Click minus button
        cy.clickMinusButtonAndCheckQuantity('entrees', 'Black Pepper Chicken', 'quantity', 0)
        cy.checkAddToCartButtonDisabled('entrees', 'Black Pepper Chicken', 'addToCartForEntree')
    })
})

describe('Chicken Entree for general taos chicken', () => {
    it('Click general taos chicken plus button, then minus button', () => {
        // Click plus button
        cy.clickPlusButtonAndCheckQuantity('entrees', 'General Taos Chicken', 'quantity', 1)
        cy.checkAddToCartButtonEnabled('entrees', 'General Taos Chicken', 'addToCartForEntree')

        // Click minus button
        cy.clickMinusButtonAndCheckQuantity('entrees', 'General Taos Chicken', 'quantity', 0)
        cy.checkAddToCartButtonDisabled('entrees', 'General Taos Chicken', 'addToCartForEntree')
    })
})

describe('Chicken Entree for jalapeno chicken', () => {
    it('Click jalapeno chicken plus button, then minus button', () => {
        // Click plus button
        cy.clickPlusButtonAndCheckQuantity('entrees', 'Jalapeno Chicken', 'quantity', 1)
        cy.checkAddToCartButtonEnabled('entrees', 'Jalapeno Chicken', 'addToCartForEntree')

        // Click minus button
        cy.clickMinusButtonAndCheckQuantity('entrees', 'Jalapeno Chicken', 'quantity', 0)
        cy.checkAddToCartButtonDisabled('entrees', 'Jalapeno Chicken', 'addToCartForEntree')
    })
})

describe('Chicken Entree for kung pao chicken', () => {
    it('Click kung pao chicken plus button, then minus button', () => {
        // Click plus button
        cy.clickPlusButtonAndCheckQuantity('entrees', 'Kung Pao Chicken', 'quantity', 1)
        cy.checkAddToCartButtonEnabled('entrees', 'Kung Pao Chicken', 'addToCartForEntree')

        // Click minus button
        cy.clickMinusButtonAndCheckQuantity('entrees', 'Kung Pao Chicken', 'quantity', 0)
        cy.checkAddToCartButtonDisabled('entrees', 'Kung Pao Chicken', 'addToCartForEntree')
    })
})

describe('Chicken Entree for mushroom chicken', () => {
    it('Click mushroom chicken plus button, then minus button', () => {
        // Click plus button
        cy.clickPlusButtonAndCheckQuantity('entrees', 'Mushroom Chicken', 'quantity', 1)
        cy.checkAddToCartButtonEnabled('entrees', 'Mushroom Chicken', 'addToCartForEntree')

        // Click minus button
        cy.clickMinusButtonAndCheckQuantity('entrees', 'Mushroom Chicken', 'quantity', 0)
        cy.checkAddToCartButtonDisabled('entrees', 'Mushroom Chicken', 'addToCartForEntree')
    })
})

describe('Chicken Entree for orange chicken', () => {
    it('Click orange chicken plus button, then minus button', () => {
        // Click plus button
        cy.clickPlusButtonAndCheckQuantity('entrees', 'Orange Chicken', 'quantity', 1)
        cy.checkAddToCartButtonEnabled('entrees', 'Orange Chicken', 'addToCartForEntree')

        // Click minus button
        cy.clickMinusButtonAndCheckQuantity('entrees', 'Orange Chicken', 'quantity', 0)
        cy.checkAddToCartButtonDisabled('entrees', 'Orange Chicken', 'addToCartForEntree')
    })
})

describe('Chicken Entree for orange chicken', () => {
    it('Click orange chicken plus button, then minus button', () => {
        // Click plus button
        cy.clickPlusButtonAndCheckQuantity('entrees', 'Orange Chicken', 'quantity', 1)
        cy.checkAddToCartButtonEnabled('entrees', 'Orange Chicken', 'addToCartForEntree')

        // Click minus button
        cy.clickMinusButtonAndCheckQuantity('entrees', 'Orange Chicken', 'quantity', 0)
        cy.checkAddToCartButtonDisabled('entrees', 'Orange Chicken', 'addToCartForEntree')
    })
})

describe('Chicken Entree for string bean chicken', () => {
    it('Click string bean chicken plus button, then minus button', () => {
        // Click plus button
        cy.clickPlusButtonAndCheckQuantity('entrees', 'String Bean Chicken', 'quantity', 1)
        cy.checkAddToCartButtonEnabled('entrees', 'String Bean Chicken', 'addToCartForEntree')

        // Click minus button
        cy.clickMinusButtonAndCheckQuantity('entrees', 'String Bean Chicken', 'quantity', 0)
        cy.checkAddToCartButtonDisabled('entrees', 'String Bean Chicken', 'addToCartForEntree')
    })
})

describe('Chicken Entree for teriyaki chicken', () => {
    it('Click teriyaki chicken plus button, then minus button', () => {
        // Click plus button
        cy.clickPlusButtonAndCheckQuantity('entrees', 'Teriyaki Chicken', 'quantity', 1)
        cy.checkAddToCartButtonEnabled('entrees', 'Teriyaki Chicken', 'addToCartForEntree')

        // Click minus button
        cy.clickMinusButtonAndCheckQuantity('entrees', 'Teriyaki Chicken', 'quantity', 0)
        cy.checkAddToCartButtonDisabled('entrees', 'Teriyaki Chicken', 'addToCartForEntree')
    })
})