/// <reference types="cypress" />

beforeEach('Visit menu', () => {
    cy.visit('http://localhost:8000/menu')
    const comboName = "Kid's Meal"
    cy.clickAndCheckComboIsHighlighted(comboName)
})

describe('Kids Meal', () => {
    it('Check add to cart button is disabled', () =>{
        cy.checkAddToCartButtonDisabled('products', "Kid's Meal", 'addToCartForCombo')
    })

    it('Click sides for this combo', () => {
        // Click fried rice for one select
        cy.clickAndCheckChoiceSelectedOrNo('Side', 'sides', 'Fried Rice', true, 'One')
        
        // Click fried rice to unselect
        cy.clickAndCheckChoiceSelectedOrNo('Side', 'sides', 'Fried Rice', false, '')
        
        // Click chow mein for one select
        cy.clickAndCheckChoiceSelectedOrNo('Side', 'sides', 'Chow Mein', true, 'One')
        
        // Click steam white rice for half select
        cy.clickAndCheckChoiceSelectedOrNo('Side', 'sides', 'Steam White Rice', true, 'Half')
        
        // Check chow mein becomes half selected
        cy.checkChoiceSelectedOrNo('Side', 'sides', 'Chow Mein', 'true', 'Half')

        // Check fried rice becomes lightgray
        cy.checkChoiceGrayedOut('Side', 'sides', 'Fried Rice')

        // Hover and check no underline
        cy.hoverAndWillNotUnderline('Side', 'sides', 'Fried Rice')

        // Check add to cart button still disabled
        cy.checkAddToCartButtonDisabled('products', "Kid's Meal", 'addToCartForCombo')
    })

    it('Click entrees for this combo', () => {
        // Click BBQ Chicken for one select
        cy.clickAndCheckChoiceSelectedOrNo('Entree', 'entrees', 'BBQ Chicken', true, 'One')
        
        // Click BBQ Chicken to unselect
        cy.clickAndCheckChoiceSelectedOrNo('Entree', 'entrees', 'BBQ Chicken', false, '')
        
        // Click Black Pepper Chicken for one select
        cy.clickAndCheckChoiceSelectedOrNo('Entree', 'entrees', 'Black Pepper Chicken', true, 'One')
        
        // Click General Taos Chicken for one select
        cy.clickAndCheckChoiceSelectedOrNo('Entree', 'entrees', 'General Taos Chicken', true, 'One')
        
        // Check Black Pepper Chicken becomes unselected
        cy.checkChoiceNotSelected('Entree', 'entrees', 'Black Pepper Chicken')

        // Check add to cart button still disabled
        cy.checkAddToCartButtonDisabled('products', "Kid's Meal", 'addToCartForCombo')
    })

    it('Click side, entree, and drink to enable add to cart button', () => {
        // Click fried rice for one select
        cy.clickAndCheckChoiceSelectedOrNo('Side', 'sides', 'Fried Rice', true, 'One')

        // Click Jalapeno Chicken for one select
        cy.clickAndCheckChoiceSelectedOrNo('Entree', 'entrees', 'Jalapeno Chicken', true, 'One')

        // Click Bottle Water
        cy.clickAndCheckChoiceSelectedOrNo('Drink', 'combodrinks', 'Bottle Water', true, 'One')

        cy.wait(1000)

        // Check add to cart button enabled
        cy.checkAddToCartButtonEnabled('products', "Kid's Meal", 'addToCartForCombo')
    })

    it('Click funtain drink', () => {
        cy.selectForComboSmallDrink('Choose the flavor')
        cy.selectForComboSmallDrink('Coke')
    })

    it('Click quantityPlus and check quantity', () => {
        cy.clickPlusButtonAndCheckQuantity('products', "Kid's Meal", 'quantity', 2)
    })

    it('Click quantityMinus and check quantity', () => {
        cy.clickMinusButtonAndCheckQuantity('products', "Kid's Meal", 'quantity', 0)
    })

    it('Click side, entree, and select flavor for small drink to enable add to cart button, then click quantityMinus to disable add to cart button', () => {
        // Click  for one select
        cy.clickAndCheckChoiceSelectedOrNo('Side', 'sides', 'Fried Rice', true, 'One')

        // Click Jalapeno Chicken for one select
        cy.clickAndCheckChoiceSelectedOrNo('Entree', 'entrees', 'Jalapeno Chicken', true, 'One')

        // Select flavor for small drink
        cy.selectForComboSmallDrink('Coke')

        cy.wait(1000)

        // Check add to cart button enabled
        cy.checkAddToCartButtonEnabled('products', "Kid's Meal", 'addToCartForCombo')

        // Click quantityMinus button to change quantity to 0
        cy.clickMinusButtonAndCheckQuantity('products', "Kid's Meal", 'quantity', 0)
        
        // Check add to cart button disabled
        cy.checkAddToCartButtonDisabled('products', "Kid's Meal", 'addToCartForCombo')
    })
})