/// <reference types="cypress" />

beforeEach('Visit menu', () => {
    cy.visit('http://localhost:8000/menu')
    cy.clickAndCheckDrinksIsHighlighted()
})

describe('Drinks for Water', () => {
    it('Click water plus button, then minus button', () => {
        // Click plus button
        cy.clickPlusButtonAndCheckQuantity('drinks', 'Water', 'quantity', 1)
        cy.checkAddToCartButtonEnabled('drinks', 'Water', 'addToCartForDrinkOnly')

        // Click minus button
        cy.clickMinusButtonAndCheckQuantity('drinks', 'Water', 'quantity', 0)
        cy.checkAddToCartButtonDisabled('drinks', 'Water', 'addToCartForDrinkOnly')
    })
})

describe('Drinks for Bottle Water', () => {
    it('Click bottle water plus button, then minus button', () => {
        // Click plus button
        cy.clickPlusButtonAndCheckQuantity('drinks', 'Bottle Water', 'quantity', 1)
        cy.checkAddToCartButtonEnabled('drinks', 'Bottle Water', 'addToCartForDrinkOnly')

        // Click minus button
        cy.clickMinusButtonAndCheckQuantity('drinks', 'Bottle Water', 'quantity', 0)
        cy.checkAddToCartButtonDisabled('drinks', 'Bottle Water', 'addToCartForDrinkOnly')
    })
})

describe('Drinks for Canned Drink', () => {
    it('Click canned drink plus button + choose flavor, then minus button', () => {
        // Click plus button
        cy.clickPlusButtonAndCheckQuantity('drinks', 'Canned Drink', 'quantity', 1)
        cy.selectFlavorForDrink('Canned Drink', 'Coke')
        cy.checkAddToCartButtonEnabled('drinks', 'Canned Drink', 'addToCartForDrinkOnly')

        // Click minus button
        cy.clickMinusButtonAndCheckQuantity('drinks', 'Canned Drink', 'quantity', 0)
        cy.checkAddToCartButtonDisabled('drinks', 'Canned Drink', 'addToCartForDrinkOnly')
    })

    it('Click canned drink plus button + choose flavor, then unchoose flavor', () => {
        // Click plus button
        cy.clickPlusButtonAndCheckQuantity('drinks', 'Canned Drink', 'quantity', 1)
        cy.selectFlavorForDrink('Canned Drink', 'Coke')
        cy.checkAddToCartButtonEnabled('drinks', 'Canned Drink', 'addToCartForDrinkOnly')

        // Unchoose flavor button
        cy.selectFlavorForDrink('Canned Drink', 'Choose the flavor')
        cy.checkAddToCartButtonDisabled('drinks', 'Canned Drink', 'addToCartForDrinkOnly')
    })
})

describe('Drinks for Fountain Drink', () => {
    it('Click fountain drink plus button + choose flavor, then minus button', () => {
        // Click plus button
        cy.clickPlusButtonAndCheckQuantity('drinks', 'Fountain Drink', 'quantity', 1)
        cy.selectFlavorForDrink('Fountain Drink', 'Coke')
        cy.checkAddToCartButtonEnabled('drinks', 'Fountain Drink', 'addToCartForDrinkOnly')

        // Click minus button
        cy.clickMinusButtonAndCheckQuantity('drinks', 'Fountain Drink', 'quantity', 0)
        cy.checkAddToCartButtonDisabled('drinks', 'Fountain Drink', 'addToCartForDrinkOnly')
    })

    it('Click fountain drink plus button + choose flavor, then unchoose flavor', () => {
        // Click plus button
        cy.clickPlusButtonAndCheckQuantity('drinks', 'Fountain Drink', 'quantity', 1)
        cy.selectFlavorForDrink('Fountain Drink', 'Coke')
        cy.checkAddToCartButtonEnabled('drinks', 'Fountain Drink', 'addToCartForDrinkOnly')

        // Unchoose flavor button
        cy.selectFlavorForDrink('Fountain Drink', 'Choose the flavor')
        cy.checkAddToCartButtonDisabled('drinks', 'Fountain Drink', 'addToCartForDrinkOnly')
    })
})

describe('Drinks for Fresh Juice', () => {
    it('Click fresh juice plus button + choose flavor, then minus button', () => {
        // Click plus button
        cy.clickPlusButtonAndCheckQuantity('drinks', 'Fresh Juice', 'quantity', 1)
        cy.selectFlavorForDrink('Fresh Juice', 'Orange')
        cy.checkAddToCartButtonEnabled('drinks', 'Fresh Juice', 'addToCartForDrinkOnly')

        // Click minus button
        cy.clickMinusButtonAndCheckQuantity('drinks', 'Fresh Juice', 'quantity', 0)
        cy.checkAddToCartButtonDisabled('drinks', 'Fresh Juice', 'addToCartForDrinkOnly')
    })

    it('Click fresh juice plus button + choose flavor, then unchoose flavor', () => {
        // Click plus button
        cy.clickPlusButtonAndCheckQuantity('drinks', 'Fresh Juice', 'quantity', 1)
        cy.selectFlavorForDrink('Fresh Juice', 'Orange')
        cy.checkAddToCartButtonEnabled('drinks', 'Fresh Juice', 'addToCartForDrinkOnly')

        // Unchoose flavor button
        cy.selectFlavorForDrink('Fresh Juice', 'Choose the flavor')
        cy.checkAddToCartButtonDisabled('drinks', 'Fresh Juice', 'addToCartForDrinkOnly')
    })
})