/// <reference types="cypress" />

beforeEach('Visit menu', () => {
    cy.visit('http://localhost:8000/menu')
    const comboName = 'Small Platter'
    cy.clickAndCheckComboIsHighlighted(comboName)
})

describe('Small Platter', () => {
    it('Check add to cart button is disabled', () =>{
        const comboName = 'Small Platter'
        const sql = 'select id from products where name = "' + comboName + '"'
        cy.task('queryDb', sql)
            .then((result) => {
                const id = result[0].id
                cy.checkAddToCartButtonDisabled('addToCartForCombo', id)
            })
    })

    it('Click fried rice for one select', () => {
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
    })
})