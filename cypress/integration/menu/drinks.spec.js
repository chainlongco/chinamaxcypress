/// <reference types="cypress" />

describe('Click drinks', () => {
    beforeEach('Visit menu', () => {
        cy.visit('http://localhost:8000/menu')
        cy.clickAndCheckDrinksIsHighlighted()
    })

    it('Check choices for drinks', () => {
        cy.wait(1000)
        const sql = 'select * from drinks'
        cy.task('queryDb', sql)
            .then((resultDrinks) => {
                for (var i=0; i<resultDrinks.length; i++) {
                    const drinkId = resultDrinks[i].id
                    cy.get('#choiceItemDrink' + resultDrinks[i].id + ' > img').should('have.attr', 'src', '\\images\\' + resultDrinks[i].gallery)
                    cy.get('#choiceItemDrinkName' + resultDrinks[i].id).contains(resultDrinks[i].name)
                    cy.defaultQuantityAndAddToCartButton('addToCartForDrinkOnly', drinkId)

                    // Hover the choices
                    cy.get('#choiceItemDrink' + resultDrinks[i].id).invoke('show').click().get('#choiceItemDrinkName' + resultDrinks[i].id)
                    .should('have.css', 'text-decoration', 'underline solid rgb(33, 37, 41)');

                    // For price
                    const tableName = resultDrinks[i].tablename
                    if (tableName == "") {  // For Water and Bottle Water
                        const sql = 'select * from products where category = "' + resultDrinks[i].name + '"'
                        cy.task('queryDb', sql)
                            .then((resultProducts) => {
                                cy.get('#choiceItemDrink' + drinkId + ' > span.choiceItemPrice').contains(resultProducts[0].price)
                            })
                    } else {    // Canned Drink, Fountain Drink and Fresh Juice
                        const sql = 'select * from products where category = "' + resultDrinks[i].name + '"'
                        cy.task('queryDb', sql)
                            .then((resultProducts) => {
                                if (resultProducts.length == 1) {   // For Canned Drink
                                    cy.get('#choiceItemDrink' + drinkId).contains(resultProducts[0].price)
                                } else {    // For Fountain Drink and Fresh Juice
                                    for (var i=0; i<resultProducts.length; i++) {
                                        cy.get('#productDrinks' + drinkId).contains(resultProducts[i].name + ' - $' + resultProducts[i].price)
                                    }  
                                }                                 
                            })

                        // For flavor dropdown
                        const sqlTableName = 'select * from ' + tableName
                        cy.task('queryDb', sqlTableName)
                            .then((resultTableName) => {
                                for (var i=0; i<resultTableName.length; i++) {
                                    cy.get('#selectDrink' + drinkId).contains(resultTableName[i].name)
                                }                                        
                            })
                    }
                }
            }) 
    })

    it('Mouse hover in and underline the Drinks name', () => {
        cy.hoverAndUnderlineFromMenuTable("Drinks")
    })
})