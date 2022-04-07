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

// ***** Combos Start *****
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

Cypress.Commands.add('clickAndCheckComboChoicesAndHoverThem', (comboName) => {
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

                            // Hover the choices
                            cy.get('#choiceItemSide' + id).invoke('show').click().get('#choiceItemSideName' + id)
                            .should('have.css', 'text-decoration', 'underline solid rgb(33, 37, 41)');
                            cy.get('#choiceItemSide' + id).invoke('show').click()   // This is line is to unselect the choice
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

                            // Hover the choices
                            cy.get('#choiceItemEntree' + id).invoke('show').click().get('#choiceItemEntreeName' + id)
                            .should('have.css', 'text-decoration', 'underline solid rgb(33, 37, 41)');
                            cy.get('#choiceItemEntree' + id).invoke('show').click()   // This is line is to unselect the choice
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
                                        // Hover the choices
                                        cy.get('#choiceItemDrinkWithSelect' + id).invoke('show').click().get('#choiceItemDrinkName' + id)
                                        .should('have.css', 'text-decoration', 'underline solid rgb(33, 37, 41)');
                                    }
                                })
                            } else {
                                cy.get('#choiceItemDrink' + id).contains(result[i].name)
                                cy.get('#choiceItemDrink' + id).find('img').should('have.attr', 'src', gallery)
                                // Hover the choices
                                cy.get('#choiceItemDrink' + id).invoke('show').click().get('#choiceItemDrinkName' + id)
                                .should('have.css', 'text-decoration', 'underline solid rgb(33, 37, 41)');
                            }
                        }
                    })
                }
            })
        }); 
})

Cypress.Commands.add('comboQuantityAndAddToCartButton', (comboName) => {
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
// ***** Combos End *****

// ***** Singles Start *****
Cypress.Commands.add('clickAndCheckSingleIsHighlighted', (singleName) => {
    const sql = 'select id from singles where name = "' + singleName + '"'
    cy.task('queryDb', sql)
        .then((result) => {
            const id = result[0].id
            cy.get('#singleItem' + id).click()
            cy.wait(1000)
            cy.get('#singleItem' + id).should('have.css', 'border', '5px solid rgb(255, 0, 0)')    // red
            cy.get('#orderChoices > h1').contains(singleName)
        });
})

Cypress.Commands.add('clickAndCheckSingleEntreeChoices', (singleEntreeName) => {
    const sql = 'select * from singles where name = "' + singleEntreeName + ' Entree"'
    cy.task('queryDb', sql)
        .then((resultSingles) => {
            const id = resultSingles[0].id
            cy.get('#singleItem' + id).click()
            cy.wait(1000)
            const sql = 'select * from entrees where category = ' + '"' + singleEntreeName + '"'
            cy.task('queryDb', sql)
                .then((resultEntrees) => {
                    for (var i=0; i<resultEntrees.length; i++) {
                        const entreeId = resultEntrees[i].id
                        cy.get('#choiceItemEntree' + entreeId + ' > img').should('have.attr', 'src', '\\images\\' + resultEntrees[i].gallery)
                        cy.get('#choiceItemEntree' + entreeId).contains(resultEntrees[i].name)
                        const sql = 'select * from products where category = ' + '"' + singleEntreeName + '"'
                        cy.task('queryDb', sql)
                            .then((resultProducts) => {
                                for (var i=0; i<resultProducts.length; i++) {
                                    cy.get('#productEntrees' + entreeId).contains(resultProducts[i].name + ' - ' + '$' + resultProducts[i].price)
                                }
                            })
                        cy.defaultQuantityAndAddToCartButton('addToCartForEntree', resultEntrees[i].id)
                    }
                })
        })
})
// ***** Singles End *****

// ***** Shared Start *****
Cypress.Commands.add('defaultQuantityAndAddToCartButton', (buttonName, id) => {
    // Default minus and plus buttons should be visible
    // Default quantity input box should be disabled and value should be 0
    // Default add to cart button should be visible and disabled
    cy.get('#quantityMinus' + id).should('be.visible')
    cy.get('#quantity' + id).should('have.value', 0)
    cy.get('#quantity' + id).should('be.disabled')
    cy.get('#quantityPlus' + id).should('be.visible')
    cy.get('#' + buttonName + id).should('be.visible')
    cy.get('#' + buttonName + id).should('be.disabled')  
})

Cypress.Commands.add('checkAddToCartButtonEnabled', (tableName, criteriaName, buttonName) => {
    const sql = 'select id from ' + tableName + ' where name = "' + criteriaName + '"'
    cy.task('queryDb', sql)
        .then((result) => {
            cy.get('#' + buttonName + result[0].id).should('be.visible')
            cy.get('#' + buttonName + result[0].id).should('have.css', 'color', 'rgb(255, 0, 0)')
            cy.get('#' + buttonName + result[0].id).should('be.enabled')
        })
    // combo => addToCartForCombo => products talbe => Small Platter, Regular Platter, Large Platter, Party Tray, Kid's Meal
    // appetizers => addToCart => products table => Egg Roll (5), Crab Rangoon (6), Fried Dumpling (5)
    // drinks => addToCartForDrinkOnly => drinks => Water, Bottle Water, Canned Drink, Fountain Drink, Fresh Juice
    // side => addToCartForSide => sides => Fried Rice, Chow Mein, Steam White Rice
    // entree => addToCartForEntree => entrees => name.....
})

Cypress.Commands.add('checkAddToCartButtonDisabled', (tableName, criteriaName, buttonName) => {
    const sql = 'select id from ' + tableName + ' where name = "' + criteriaName + '"'
    cy.task('queryDb', sql)
        .then((result) => {
            cy.get('#' + buttonName + result[0].id).should('be.visible')
            cy.get('#' + buttonName + result[0].id).should('have.css', 'color', 'rgb(128, 128, 128)')
            cy.get('#' + buttonName + result[0].id).should('be.disabled')
        })
})

Cypress.Commands.add('clickPlusButtonAndCheckQuantity', (tableName, criteriaName, buttonName, quantity) => {
    // Examples:
    // cy.clickPlusButtonAndCheckQuantity('products', 'Small Platter', 'quantity', 2)
    // cy.clickPlusButtonAndCheckQuantity('entrees', 'Jalapeno Chicken', 'entreeQuantity', 1)
    const sql = 'select id from ' + tableName + ' where name = "' + criteriaName + '"'
    cy.task('queryDb', sql)
        .then((result) => {
            cy.get('#' + buttonName + 'Plus' + result[0].id).click()
            cy.wait(1000)
            cy.get('#' + buttonName + result[0].id).should('have.value', quantity)
        })
})

Cypress.Commands.add('clickMinusButtonAndCheckQuantity', (tableName, criteriaName, buttonName, quantity) => {
    // Examples:
    // cy.clickMinusButtonAndCheckQuantity('products', 'Small Platter', 'quantity', 2)
    // cy.clickMinusButtonAndCheckQuantity('entrees', 'Jalapeno Chicken', 'entreeQuantity', 1)
    const sql = 'select id from ' + tableName + ' where name = "' + criteriaName + '"'
    cy.task('queryDb', sql)
        .then((result) => {
            cy.get('#' + buttonName + 'Minus' + result[0].id).click()
            cy.wait(1000)
            cy.get('#' + buttonName + result[0].id).should('have.value', quantity)
            if (quantity == 0) {
                if (document.getElementById('#' + buttonName + 'IncrementDiv' + result[0].id)) {
                    cy.get('#' + buttonName + 'IncrementDiv' + result[0].id).should('have.css', 'display', 'none')
                }
            }
        })
})
// ***** Shared End *****

Cypress.Commands.add('hoverAndUnderlineFromProductTable', (comboName) => {
    // This is for all combos from products table: Small Platter, Regular Platter, Large Platter, Party Tray, and Kid's Meal
    const sql = 'select id from products where name = "' + comboName + '"'
    cy.task('queryDb', sql)
        .then((result) => {
            // Hover and underline the combo name for this combo
            const id = result[0].id
            cy.get('#productItem' + id).invoke('show').click().get('.productItemName' + id)
            .should('have.css', 'text-decoration', 'underline solid rgb(33, 37, 41)');
        })
});

Cypress.Commands.add('hoverAndUnderlineFromMenuTable', (menuName) => {
    // This is for all names from menus table: Appetizers, Drinks, Combo, and Individule Side/Entree
    const sql = 'select id from menus where name = "' + menuName + '"'
    cy.task('queryDb', sql)
        .then((result) => {
            // Hover and underline the combo name for this combo
            const id = result[0].id
            cy.get('#menuItem' + id).invoke('show').click().get('.menuItemName' + id)
            .should('have.css', 'text-decoration', 'underline solid rgb(33, 37, 41)');
        })
});

Cypress.Commands.add('hoverAndUnderlineFromSingleTable', (singleName) => {
    // This is for all names from singles table: Side, ChickenEntree, BeefEntree, and ShrimpEntree
    const sql = 'select id from singles where name = "' + singleName + '"'
    cy.task('queryDb', sql)
        .then((result) => {
            // Hover and underline the combo name for this combo
            const id = result[0].id
            cy.get('#singleItem' + id).invoke('show').click().get('.singleItemName' + id)
            .should('have.css', 'text-decoration', 'underline solid rgb(33, 37, 41)');
        })
});

/*Cypress.Commands.add('hoverAndUnderline', (category, tableName, choiceName) => {
    const sql = 'select id from ' + tableName + ' where name = "' + choiceName + '"'
    cy.task('queryDb', sql)
        .then((result) => {
            // Hover and underline the choice item for combo, appetizers, drinks, and individual side/entree
            const id = result[0].id
            cy.get('#choiceItem' + category + id).invoke('show').click().get('#choiceItem' + category + 'Name' + id)
            .should('have.css', 'text-decoration', 'underline solid rgb(33, 37, 41)');
        })
})*/

Cypress.Commands.add('hoverAndWillNotUnderline', (category, tableName, choiceName) => {
    const sql = 'select id from ' + tableName + ' where name = "' + choiceName + '"'
    cy.task('queryDb', sql)
        .then((result) => {
            // Hover and underline the choice item for combo, appetizers, drinks, and individual side/entree
            const id = result[0].id
            cy.get('#choiceItem' + category + id).invoke('show').click({force: true}).get('#choiceItem' + category + 'Name' + id)
            .should('have.css', 'text-decoration', 'none solid rgb(33, 37, 41)');
        })
})

// ***** Side/Entree/Drink click and selected or gray out start *****
Cypress.Commands.add('checkChoiceGrayedOut', (category, tableName, choiceName) => {
    const sql = 'select id from ' + tableName + ' where name = "' + choiceName + '"'
    cy.task('queryDb', sql)
        .then((result) => {
            const id = result[0].id
            cy.get('#choiceItem' + category + result[0].id).should('have.css', 'background-color', 'rgb(211, 211, 211)')
        }) 
})

Cypress.Commands.add('checkChoiceNotGrayedOut', (category, tableName, choiceName) => {
    const sql = 'select id from ' + tableName + ' where name = "' + choiceName + '"'
    cy.task('queryDb', sql)
        .then((result) => {
            const id = result[0].id
            cy.get('#choiceItem' + category + result[0].id).should('have.css', 'background-color', 'rgb(255, 255, 255)')
            cy.get('#choiceItem' + category + result[0].id).should('have.css', 'border', '3px solid rgb(211, 211, 211)')
        }) 
})

Cypress.Commands.add('clickAndCheckChoiceSelectedOrNo', (category, tableName, choiceName, selected, quantity) => {
    const sql = 'select id from ' + tableName + ' where name = "' + choiceName + '"'
    cy.task('queryDb', sql)
        .then((result) => {
            cy.get('#choiceItem' + category + result[0].id).click()
            cy.wait(1000)
            if (selected) {
                cy.get('#choiceItem' + category + result[0].id).should('have.css', 'border', '5px solid rgb(255, 0, 0)')
                cy.get('#' + category.toLowerCase() + 'Selected' + result[0].id).contains(quantity + ' Selected')
            } else {
                cy.get('#choiceItem' + category + result[0].id).should('have.css', 'border', '3px solid rgb(211, 211, 211)')
            }       
        })
})

Cypress.Commands.add('checkChoiceSelectedOrNo', (category, tableName, choiceName, selected, quantity) => {
    const sql = 'select id from ' + tableName + ' where name = "' + choiceName + '"'
    cy.task('queryDb', sql)
        .then((result) => {
            if (selected) {
                cy.get('#choiceItem' + category + result[0].id).should('have.css', 'border', '5px solid rgb(255, 0, 0)')
                cy.get('#' + category.toLowerCase() + 'Selected' + result[0].id).contains(quantity + ' Selected')
            } else {
                cy.get('#choiceItem' + category + result[0].id).should('have.css', 'border', '3px solid rgb(211, 211, 211)')
            }       
        })
})

Cypress.Commands.add('checkChoiceNotSelected', (category, tableName, choiceName) => {
    const sql = 'select id from ' + tableName + ' where name = "' + choiceName + '"'
    cy.task('queryDb', sql)
        .then((result) => {
            cy.get('#choiceItem' + category + result[0].id).should('have.css', 'border', '3px solid rgb(211, 211, 211)')
        })
})

Cypress.Commands.add('clickAndCheckChoiceSelectedOrNoWithPlusMinusButtons', (category, tableName, choiceName, selected, quantity) => {
    const sql = 'select id from ' + tableName + ' where name = "' + choiceName + '"'
    cy.task('queryDb', sql)
        .then((result) => {
            cy.get('#choiceItem' + category + result[0].id).click()
            cy.wait(1000)
            if (selected) {
                cy.get('#choiceItem' + category + result[0].id).should('have.css', 'border', '5px solid rgb(255, 0, 0)')
                cy.get('#' + category.toLowerCase() + 'Quantity' + result[0].id).should('have.value', quantity)
            } else {
                cy.get('#choiceItem' + category + result[0].id).should('have.css', 'border', '3px solid rgb(211, 211, 211)')
            }       
        })
})

Cypress.Commands.add('checkChoiceSelectedOrNoWithPlusMinusButtons', (category, tableName, choiceName, selected, quantity) => {
    const sql = 'select id from ' + tableName + ' where name = "' + choiceName + '"'
    cy.task('queryDb', sql)
        .then((result) => {
            if (selected) {
                cy.get('#choiceItem' + category + result[0].id).should('have.css', 'border', '5px solid rgb(255, 0, 0)')
                cy.get('#' + category.toLowerCase() + 'Quantity' + result[0].id).should('have.value', quantity)
            } else {
                cy.get('#choiceItem' + category + result[0].id).should('have.css', 'border', '3px solid rgb(211, 211, 211)')
            }       
        })
})

Cypress.Commands.add('selectForComboSmallDrink', (flavor) => {
    cy.get('#comboDrink1').select(flavor)
    cy.wait(1000)
    if (flavor != 'Choose the flavor') {
        cy.get('#choiceItemDrinkWithSelect1').should('have.css', 'border', '5px solid rgb(255, 0, 0)')
        cy.get('#drinkSelected1').contains('One Selected')
    } else {
        cy.get('#choiceItemDrinkWithSelect1').should('have.css', 'border', '3px solid rgb(211, 211, 211)')
    }
})
// ***** Side/Entree/Drink click and selected or gray out end *****

// ***** Appetizers start *****
Cypress.Commands.add('clickAndCheckAppetizersIsHighlighted', () => {
    const sql = 'select * from menus where name = "Appetizers"'
    cy.task('queryDb', sql)
        .then((result) => {
            const id = result[0].id
            cy.get('#eachMenu' + id).click()
            cy.wait(1000)
            cy.get('#menuItem' + id).should('have.css', 'border', '5px solid rgb(255, 0, 0)')
            cy.get('#orderChoices > h1').contains('Appetizers')
        })
})
// ***** Appetizers end *****

// ***** Drinks start *****
Cypress.Commands.add('clickAndCheckDrinksIsHighlighted', () => {
    const sql = 'select * from menus where name = "Drinks"'
    cy.task('queryDb', sql)
        .then((result) => {
            const id = result[0].id
            cy.get('#eachMenu' + id).click()
            cy.wait(1000)
            cy.get('#menuItem' + id).should('have.css', 'border', '5px solid rgb(255, 0, 0)')
            cy.get('#orderChoices > h1').contains('Drinks')
        })
})

Cypress.Commands.add('selectFlavorForDrink', (drinkName, flavor) => {
    const sql = 'select id from drinks where name = "' + drinkName + '"'
    cy.task('queryDb', sql)
        .then((result) => {
            cy.get('#selectDrink' + result[0].id).select(flavor)
        })    
})
// ***** Drinks end *****
