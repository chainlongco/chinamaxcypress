/// <reference types="cypress" />

beforeEach('Visit menu', () => {
    cy.visit('http://localhost:8000/menu')
    const comboName = 'Party Tray'
    cy.clickAndCheckComboIsHighlighted(comboName)
})

describe('Party Tray', () => {
    it('Check add to cart button is disabled', () =>{
        cy.checkAddToCartButtonDisabled('products', 'Party Tray', 'addToCartForCombo')
    })

    it('Click sides for this combo', () => {
        // Click fried rice for quantity 3
        cy.clickAndCheckChoiceSelectedOrNoWithPlusMinusButtons('Side', 'sides', 'Fried Rice', true, '3')
        
        // Click fried rice to unselect
        cy.clickAndCheckChoiceSelectedOrNoWithPlusMinusButtons('Side', 'sides', 'Fried Rice', false, '')
        
        // Click chow mein for quantity 3
        cy.clickAndCheckChoiceSelectedOrNoWithPlusMinusButtons('Side', 'sides', 'Chow Mein', true, '3')
        
        // Click steam white rice for quantity 1
        cy.clickAndCheckChoiceSelectedOrNoWithPlusMinusButtons('Side', 'sides', 'Steam White Rice', true, '1')
        
        // Check chow mein  becomes quantity 2
        cy.checkChoiceSelectedOrNoWithPlusMinusButtons('Side', 'sides', 'Chow Mein', true, '2')

        // Click Fried Rice for quantity 1
        cy.clickAndCheckChoiceSelectedOrNoWithPlusMinusButtons('Side', 'sides', 'Fried Rice', true, '1')

        // Check add to cart button still disabled
        cy.checkAddToCartButtonDisabled('products', 'Party Tray', 'addToCartForCombo')
    })

    it('Click sides for this combo', () => {
        // Click fried rice for quantity 3
        cy.clickAndCheckChoiceSelectedOrNoWithPlusMinusButtons('Side', 'sides', 'Fried Rice', true, '3')
        
        // Click chow mein for quantity 1
        cy.clickAndCheckChoiceSelectedOrNoWithPlusMinusButtons('Side', 'sides', 'Chow Mein', true, '1')
        
        // Check fried rice becomes quantity 2
        cy.checkChoiceSelectedOrNoWithPlusMinusButtons('Side', 'sides', 'Fried Rice', true, '2')

        // Click chow mein to unselect
        cy.clickAndCheckChoiceSelectedOrNoWithPlusMinusButtons('Side', 'sides', 'Chow Mein', false, '')

        // Check fried rice becomes quantity 3
        cy.checkChoiceSelectedOrNoWithPlusMinusButtons('Side', 'sides', 'Fried Rice', true, 3)
    })

    it('Click entrees (Black Pepper Chicken, General Taos Chicken, and Kung Pao Chicken) for this combo', () => {
        // Click BBQ Chicken for quantity 3
        cy.clickAndCheckChoiceSelectedOrNoWithPlusMinusButtons('Entree', 'entrees', 'BBQ Chicken', true, '3')
        
        // Click BBQ Chicken to unselect
        cy.clickAndCheckChoiceSelectedOrNoWithPlusMinusButtons('Entree', 'entrees', 'BBQ Chicken', false, '')
        
        // Click Black Pepper Chicken for quantity 3
        cy.clickAndCheckChoiceSelectedOrNoWithPlusMinusButtons('Entree', 'entrees', 'Black Pepper Chicken', true, '3')
        
        // Click General Taos Chicken for one select
        cy.clickAndCheckChoiceSelectedOrNoWithPlusMinusButtons('Entree', 'entrees', 'General Taos Chicken', true, '1')
        
        // Check Black Pepper Chicken becomes quantity 2
        cy.checkChoiceSelectedOrNoWithPlusMinusButtons('Entree', 'entrees', 'Black Pepper Chicken', true, '2')

        // Click Kung Pao Chicken for one select
        cy.clickAndCheckChoiceSelectedOrNoWithPlusMinusButtons('Entree', 'entrees', 'Kung Pao Chicken', true, '1')

        // Check add to cart button still disabled
        cy.checkAddToCartButtonDisabled('products', 'Party Tray', 'addToCartForCombo')

        // Check rest of entress are grayout
        cy.checkChoiceGrayedOut('Entree', 'entrees', 'BBQ Chicken')
        //cy.checkChoiceGrayedOut('Entree', 'entrees', 'Jalapeno Chicken')
        //cy.checkChoiceGrayedOut('Entree', 'entrees', 'Kung Pao Chicken')
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
        // Click Black Pepper Chicken for quantity 3
        cy.clickAndCheckChoiceSelectedOrNoWithPlusMinusButtons('Entree', 'entrees', 'Black Pepper Chicken', true, '3')
        
        // Click General Taos Chicken for quantity 1
        cy.clickAndCheckChoiceSelectedOrNoWithPlusMinusButtons('Entree', 'entrees', 'General Taos Chicken', true, '1')
        
        // Check Black Pepper Chicken becomes quantity 2
        cy.checkChoiceSelectedOrNoWithPlusMinusButtons('Entree', 'entrees', 'Black Pepper Chicken', true, '2')

        // Click General Taos Chicken to unselect
        cy.clickAndCheckChoiceSelectedOrNoWithPlusMinusButtons('Entree', 'entrees', 'General Taos Chicken', false, '')

        // Check Black Pepper Chicken becomes quantity 3
        cy.checkChoiceSelectedOrNoWithPlusMinusButtons('Entree', 'entrees', 'Black Pepper Chicken', true, 3)

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

    it('Click entree with quantity 3, then use quantityMinus to become quantity 2 and 1, then use quantityMinus to become unselected', () => {
        // Click Jalapeno Chicken for quantity 3
        cy.clickAndCheckChoiceSelectedOrNoWithPlusMinusButtons('Entree', 'entrees', 'Jalapeno Chicken', true, '3')

        // Click minus button and quantity becomes 2
        cy.clickMinusButtonAndCheckQuantity('entrees', 'Jalapeno Chicken', 'entreeQuantity', 2)

        // Click minus button and quantity becomes 1
        cy.clickMinusButtonAndCheckQuantity('entrees', 'Jalapeno Chicken', 'entreeQuantity', 1)

        // Click minus button and quantity becomes 0
        cy.clickMinusButtonAndCheckQuantity('entrees', 'Jalapeno Chicken', 'entreeQuantity', 0)
    })

    it('Click side and entree to enable add to cart button', () => {
        // Click fried rice for quantity 3
        cy.clickAndCheckChoiceSelectedOrNoWithPlusMinusButtons('Side', 'sides', 'Fried Rice', true, '3')

        // Click Jalapeno Chicken for quantity 3
        cy.clickAndCheckChoiceSelectedOrNoWithPlusMinusButtons('Entree', 'entrees', 'Jalapeno Chicken', true, '3')

        cy.wait(1000)

        // Check add to cart button enabled
        cy.checkAddToCartButtonEnabled('products', 'Party Tray', 'addToCartForCombo')
    })

    it('Click quantityPlus and check quantity', () => {
        cy.clickPlusButtonAndCheckQuantity('products', 'Party Tray', 'quantity', 2)
    })

    it('Click quantityMinus and check quantity', () => {
        cy.clickMinusButtonAndCheckQuantity('products', 'Party Tray', 'quantity', 0)
    })

    it('Click side and entree to enable add to cart button, then click quantityMinus to disable add to cart button', () => {
        // Click fried rice for quantity 3
        cy.clickAndCheckChoiceSelectedOrNoWithPlusMinusButtons('Side', 'sides', 'Fried Rice', true, '3')

        // Click Jalapeno Chicken for quantity 3
        cy.clickAndCheckChoiceSelectedOrNoWithPlusMinusButtons('Entree', 'entrees', 'Jalapeno Chicken', true, '3')

        cy.wait(1000)

        // Check add to cart button enabled
        cy.checkAddToCartButtonEnabled('products', 'Party Tray', 'addToCartForCombo')

        // Click quantityMinus button to change quantity to 2
        cy.clickMinusButtonAndCheckQuantity('entrees', 'Jalapeno Chicken', 'entreeQuantity', 2)

        
        // Check add to cart button disabled
        cy.checkAddToCartButtonDisabled('products', 'Party Tray', 'addToCartForCombo')
    })
})