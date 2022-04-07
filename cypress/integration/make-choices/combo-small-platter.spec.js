/// <reference types="cypress" />

beforeEach('Visit menu', () => {
    cy.visit('http://localhost:8000/menu')
    const comboName = 'Small Platter'
    cy.clickAndCheckComboIsHighlighted(comboName)
})

describe('Small Platter', () => {
    it('Check add to cart button is disabled', () =>{
        cy.checkAddToCartButtonDisabled('products', 'Small Platter', 'addToCartForCombo')
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
        cy.checkAddToCartButtonDisabled('products', 'Small Platter', 'addToCartForCombo')
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
        cy.checkAddToCartButtonDisabled('products', 'Small Platter', 'addToCartForCombo')
    })

    it('Click side and entree to enable add to cart button', () => {
        // Click fried rice for one select
        cy.clickAndCheckChoiceSelectedOrNo('Side', 'sides', 'Fried Rice', true, 'One')

        // Click Jalapeno Chicken for one select
        cy.clickAndCheckChoiceSelectedOrNo('Entree', 'entrees', 'Jalapeno Chicken', true, 'One')

        cy.wait(1000)

        // Check add to cart button enabled
        cy.checkAddToCartButtonEnabled('products', 'Small Platter', 'addToCartForCombo')
    })

    it('Click quantityPlus and check quantity', () => {
        cy.clickPlusButtonAndCheckQuantity('products', 'Small Platter', 'quantity', 2)
    })

    it('Click quantityMinus and check quantity', () => {
        cy.clickMinusButtonAndCheckQuantity('products', 'Small Platter', 'quantity', 0)
    })

    it('Click side and entree to enable add to cart button, then click quantityMinus to disable add to cart button', () => {
        // Click  for one select
        cy.clickAndCheckChoiceSelectedOrNo('Side', 'sides', 'Fried Rice', true, 'One')

        // Click Jalapeno Chicken for one select
        cy.clickAndCheckChoiceSelectedOrNo('Entree', 'entrees', 'Jalapeno Chicken', true, 'One')

        cy.wait(1000)

        // Check add to cart button enabled
        cy.checkAddToCartButtonEnabled('products', 'Small Platter', 'addToCartForCombo')

        // Click quantityMinus button to change quantity to 0
        cy.clickMinusButtonAndCheckQuantity('products', 'Small Platter', 'quantity', 0)
        
        // Check add to cart button disabled
        cy.checkAddToCartButtonDisabled('products', 'Small Platter', 'addToCartForCombo')
    })
})