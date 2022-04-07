/// <reference types="cypress" />

beforeEach('Visit menu', () => {
    cy.visit('http://localhost:8000/menu')
    const comboName = 'Regular Platter'
    cy.clickAndCheckComboIsHighlighted(comboName)
})

describe('Regular Platter', () => {
    it('Check add to cart button is disabled', () =>{
        cy.checkAddToCartButtonDisabled('products', 'Regular Platter', 'addToCartForCombo')
    })

    it('Click sides for this combo', () => {
        // Click fried rice for quantity 2
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
        cy.checkAddToCartButtonDisabled('products', 'Regular Platter', 'addToCartForCombo')
    })

    it('Click entrees (Black Pepper Chicken and General Taos Chicken) for this combo', () => {
        // Click BBQ Chicken for quantity 2
        cy.clickAndCheckChoiceSelectedOrNoWithPlusMinusButtons('Entree', 'entrees', 'BBQ Chicken', true, '2')
        
        // Click BBQ Chicken to unselect
        cy.clickAndCheckChoiceSelectedOrNoWithPlusMinusButtons('Entree', 'entrees', 'BBQ Chicken', false, '')
        
        // Click Black Pepper Chicken for quantity 2
        cy.clickAndCheckChoiceSelectedOrNoWithPlusMinusButtons('Entree', 'entrees', 'Black Pepper Chicken', true, '2')
        
        // Click General Taos Chicken for quantity 1
        cy.clickAndCheckChoiceSelectedOrNoWithPlusMinusButtons('Entree', 'entrees', 'General Taos Chicken', true, '1')
        
        // Check Black Pepper Chicken becomes quantity 1
        cy.checkChoiceSelectedOrNoWithPlusMinusButtons('Entree', 'entrees', 'Black Pepper Chicken', true, '1')

        // Check add to cart button still disabled
        cy.checkAddToCartButtonDisabled('products', 'Regular Platter', 'addToCartForCombo')

        // Check rest of entress are grayout
        cy.checkChoiceGrayedOut('Entree', 'entrees', 'BBQ Chicken')
        cy.checkChoiceGrayedOut('Entree', 'entrees', 'Jalapeno Chicken')
        cy.checkChoiceGrayedOut('Entree', 'entrees', 'Kung Pao Chicken')
        cy.checkChoiceGrayedOut('Entree', 'entrees', 'Mushroom Chicken')
        cy.checkChoiceGrayedOut('Entree', 'entrees', 'Orange Chicken')
        cy.checkChoiceGrayedOut('Entree', 'entrees', 'String Bean Chicken')
        cy.checkChoiceGrayedOut('Entree', 'entrees', 'Teriyaki Chicken')
        cy.checkChoiceGrayedOut('Entree', 'entrees', 'Beef Broccoli')
        cy.checkChoiceGrayedOut('Entree', 'entrees', 'Hunan Beef')
        cy.checkChoiceGrayedOut('Entree', 'entrees', 'Pepper Steak')
        cy.checkChoiceGrayedOut('Entree', 'entrees', 'Broccoli Shrimp')
        cy.checkChoiceGrayedOut('Entree', 'entrees', 'Kung Pao Shrimp')
    })

    it('Click entrees (Black Pepper Chicken and General Taos Chicken), then click to unselect General Taos Chicken for this combo', () => {
        // Click Black Pepper Chicken for quantity 2
        cy.clickAndCheckChoiceSelectedOrNoWithPlusMinusButtons('Entree', 'entrees', 'Black Pepper Chicken', true, '2')
        
        // Click General Taos Chicken for quantity 1
        cy.clickAndCheckChoiceSelectedOrNoWithPlusMinusButtons('Entree', 'entrees', 'General Taos Chicken', true, '1')
        
        // Check Black Pepper Chicken becomes quantity 1
        cy.checkChoiceSelectedOrNoWithPlusMinusButtons('Entree', 'entrees', 'Black Pepper Chicken', true, '1')

        // Click General Taos Chicken to unselect
        cy.clickAndCheckChoiceSelectedOrNoWithPlusMinusButtons('Entree', 'entrees', 'General Taos Chicken', false, '')

        // Check Black Pepper Chicken becomes quantity 2
        cy.checkChoiceSelectedOrNoWithPlusMinusButtons('Entree', 'entrees', 'Black Pepper Chicken', true, 2)

        // Check rest of entress are grayout
        cy.checkChoiceNotGrayedOut('Entree', 'entrees', 'BBQ Chicken')
        cy.checkChoiceNotGrayedOut('Entree', 'entrees', 'General Taos Chicken')
        cy.checkChoiceNotGrayedOut('Entree', 'entrees', 'Jalapeno Chicken')
        cy.checkChoiceNotGrayedOut('Entree', 'entrees', 'Kung Pao Chicken')
        cy.checkChoiceNotGrayedOut('Entree', 'entrees', 'Mushroom Chicken')
        cy.checkChoiceNotGrayedOut('Entree', 'entrees', 'Orange Chicken')
        cy.checkChoiceNotGrayedOut('Entree', 'entrees', 'String Bean Chicken')
        cy.checkChoiceNotGrayedOut('Entree', 'entrees', 'Teriyaki Chicken')
        cy.checkChoiceNotGrayedOut('Entree', 'entrees', 'Beef Broccoli')
        cy.checkChoiceNotGrayedOut('Entree', 'entrees', 'Hunan Beef')
        cy.checkChoiceNotGrayedOut('Entree', 'entrees', 'Pepper Steak')
        cy.checkChoiceNotGrayedOut('Entree', 'entrees', 'Broccoli Shrimp')
        cy.checkChoiceNotGrayedOut('Entree', 'entrees', 'Kung Pao Shrimp')
    })

    it('Click entree with quantity 2, then use quantityMinus to become quantity 1, then use quantityMinus to become unselected', () => {
        // Click Jalapeno Chicken for quantity 2
        cy.clickAndCheckChoiceSelectedOrNoWithPlusMinusButtons('Entree', 'entrees', 'Jalapeno Chicken', true, '2')

        // Click minus button and quantity becomes 1
        cy.clickMinusButtonAndCheckQuantity('entrees', 'Jalapeno Chicken', 'entreeQuantity', 1)

        // Click minus button and quantity becomes 0
        cy.clickMinusButtonAndCheckQuantity('entrees', 'Jalapeno Chicken', 'entreeQuantity', 0)
    })

    it('Click side and entree to enable add to cart button', () => {
        // Click fried rice for one select
        cy.clickAndCheckChoiceSelectedOrNo('Side', 'sides', 'Fried Rice', true, 'One')

        // Click Jalapeno Chicken for quantity 2
        cy.clickAndCheckChoiceSelectedOrNoWithPlusMinusButtons('Entree', 'entrees', 'Jalapeno Chicken', true, '2')

        cy.wait(1000)

        // Check add to cart button enabled
        cy.checkAddToCartButtonEnabled('products', 'Regular Platter', 'addToCartForCombo')
    })

    it('Click quantityPlus and check quantity', () => {
        cy.clickPlusButtonAndCheckQuantity('products', 'Regular Platter', 'quantity', 2)
    })

    it('Click quantityMinus and check quantity', () => {
        cy.clickMinusButtonAndCheckQuantity('products', 'Regular Platter', 'quantity', 0)
    })

    it('Click side and entree to enable add to cart button, then click quantityMinus to disable add to cart button', () => {
        // Click  for one select
        cy.clickAndCheckChoiceSelectedOrNo('Side', 'sides', 'Fried Rice', true, 'One')

        // Click Jalapeno Chicken for quantity 2
        cy.clickAndCheckChoiceSelectedOrNoWithPlusMinusButtons('Entree', 'entrees', 'Jalapeno Chicken', true, '2')

        cy.wait(1000)

        // Check add to cart button enabled
        cy.checkAddToCartButtonEnabled('products', 'Regular Platter', 'addToCartForCombo')

        // Click quantityMinus button to change quantity to 1
        cy.clickMinusButtonAndCheckQuantity('entrees', 'Jalapeno Chicken', 'entreeQuantity', 1)

        
        // Check add to cart button disabled
        cy.checkAddToCartButtonDisabled('products', 'Regular Platter', 'addToCartForCombo')
    })
})