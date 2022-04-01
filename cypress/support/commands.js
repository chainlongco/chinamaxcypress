// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('clickAndCheckComboIsHighlighted', (comboName) => {
    const sql = 'select id from products where name = "' + comboName + '"'
    cy.task('queryDb', sql)
        .then((result) => {
            const id = result[0].id
            cy.get('#productItem' + id).click()
            cy.wait(1000)
            cy.get('#productItem' + id).should('have.css', 'border', '5px solid rgb(255, 0, 0)')    // red
            cy.get('#orderChoices > h1').contains(comboName)
        });
})

Cypress.Commands.add('clickAndCheckComboMaxSideEntreeDrink', (comboName) => {
    const sql = 'select id from products where name = "' + comboName + '"'
    cy.task('queryDb', sql)
        .then((result) => {
            // Check Sides/Entrees/Drinks display for this combo
            const id = result[0].id
            cy.get('#productItem' + id).click()
            cy.wait(1000)
            const sql = "select * from combos where product_id = " + id
            cy.task('queryDb', sql)
            .then((result) => {
                const side = "Choose " + result[0].side + " Side"
                const entree = "Choose " + result[0].entree + " Entree"
                const drink = "Choose " + result[0].drink + " Drink"
                cy.get('#orderChoices > div > div:nth-child(1) > h3').contains(side)
                cy.get('#orderChoices > div > div:nth-child(5) > h3').contains(entree)
                if (result[0].drink > 0) {
                    cy.get('#orderChoices').should('contain', drink)
                } else {
                    cy.get('#orderChoices').should('not.contain', drink)
                }
            })
        });
})

Cypress.Commands.add('clickAndCheckComboChoices', (comboName) => {
    const sql = 'select id from products where name = "' + comboName + '"'
    cy.task('queryDb', sql)
        .then((result) => {
            // Check Sides/Entrees/Drinks display this combo
            const id = result[0].id
            cy.get('#productItem' + id).click()
            cy.wait(1000)
            const sql = "select * from combos where product_id = " + id
            cy.task('queryDb', sql)
            .then((result) => {
                const side = result[0].side
                const entree = result[0].entree
                const drink = result[0].drink
                if (side > 0) {
                    const sql = "select * from sides"
                    cy.task('queryDb', sql)
                    .then((result) => {
                        for (var i=0; i < result.length; i++) {
                            const id = result[i].id
                            const gallery = '\\images\\' + result[i].gallery
                            cy.get('#choiceItemSide' + id).contains(result[i].name)
                            cy.get('#choiceItemSide' + id).find('img').should('have.attr', 'src', gallery)
                        }
                    })
                }

                if (entree > 0) {
                    const sql = "select * from entrees"
                    cy.task('queryDb', sql)
                    .then((result) => {
                        for (var i=0; i < result.length; i++) {
                            const id = result[i].id
                            const gallery = '\\images\\' + result[i].gallery
                            cy.get('#choiceItemEntree' + id).contains(result[i].name)
                            cy.get('#choiceItemEntree' + id).find('img').should('have.attr', 'src', gallery)
                        }
                    })
                }

                if (drink > 0) {
                    const sql = "select * from combodrinks"
                    cy.task('queryDb', sql)
                    .then((result) => {
                        for (var i=0; i < result.length; i++) {
                            const id = result[i].id
                            const gallery = '\\images\\' + result[i].gallery
                            if (result[i].price > 0) {
                                cy.get('#choiceItemDrink' + id).contains(result[i].price)
                            }
                            if (result[i].tablename != "") {
                                cy.get('#choiceItemDrinkWithSelect' + id).contains(result[i].name)
                                cy.get('#choiceItemDrinkWithSelect' + id).find('img').should('have.attr', 'src', gallery)
                                const sql = "select * from " + result[i].tablename
                                cy.task('queryDb', sql)
                                .then((result) => {
                                    for (var i=0; i < result.length; i++) {
                                        cy.get('#choiceItemDrinkWithSelect' + id).contains(result[i].name)
                                    }
                                })
                            } else {
                                cy.get('#choiceItemDrink' + id).contains(result[i].name)
                                cy.get('#choiceItemDrink' + id).find('img').should('have.attr', 'src', gallery)
                            }
                        }
                    })
                }
            })
        }); 
})

Cypress.Commands.add('clickAndCheckComboChoices', (comboName) => {    
    const sql = 'select id from products where name = "' + comboName + '"'
    cy.task('queryDb', sql)
        .then((result) => {
            // Check minus/quantity/plus and Add to Cart button for this combo
            const id = result[0].id
            cy.get('#productItem' + id).click()
            cy.wait(1000)
            cy.get('#quantityMinus' + id).should('be.visible')
            cy.get('#quantity' + id).should('have.value', 1)
            cy.get('#quantity' + id).should('be.disabled')
            cy.get('#quantityPlus' + id).should('be.visible')
            cy.get('#addToCartForCombo' + id).should('be.visible')
            cy.get('#addToCartForCombo' + id).should('be.disabled')
        });    
})

Cypress.Commands.add('defaultQuantityAndAddToCartButton', (buttonId, id) => {
    // Default minus and plus buttons should be visible
    // Default quantity input box should be disabled and value should be 0
    // Default add to cart button should be visible and disabled
    cy.get('#quantityMinus' + id).should('be.visible')
    cy.get('#quantity' + id).should('have.value', 0)
    cy.get('#quantity' + id).should('be.disabled')
    cy.get('#quantityPlus' + id).should('be.visible')
    cy.get('#' + buttonId + id).should('be.visible')
    cy.get('#' + buttonId + id).should('be.disabled')  
})