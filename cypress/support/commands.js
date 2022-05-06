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
            cy.get('#orderChoices').contains(comboName)
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
            cy.get('#orderChoices').contains(singleName)
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
            //cy.get('#' + buttonName + result[0].id).should('have.css', 'color', 'rgb(128, 128, 128)')
            //cy.get('#' + buttonName + result[0].id).should('have.css', 'color', 'rgb(33, 37, 41)')
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
            cy.get('#orderChoices').contains('Appetizers')
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
            cy.get('#orderChoices').contains('Drinks')
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



// ********** Click start **********
// ***** Combo start *****
Cypress.Commands.add('clickSmallPlatter', () => {
    const sql = 'select id from products where name = "Small Platter"'
    cy.task('queryDb', sql)
        .then((result) => {
            cy.get('#productItem' + result[0].id).click()
        })
})

Cypress.Commands.add('clickRegularPlatter', () => {
    const sql = 'select id from products where name = "Regular Platter"'
    cy.task('queryDb', sql)
        .then((result) => {
            cy.get('#productItem' + result[0].id).click()
        })
})

Cypress.Commands.add('clickLargePlatter', () => {
    const sql = 'select id from products where name = "Large Platter"'
    cy.task('queryDb', sql)
        .then((result) => {
            cy.get('#productItem' + result[0].id).click()
        })
})

Cypress.Commands.add('clickPartyTray', () => {
    const sql = 'select id from products where name = "Party Tray"'
    cy.task('queryDb', sql)
        .then((result) => {
            cy.get('#productItem' + result[0].id).click()
        })
})

Cypress.Commands.add('clickKidsMeal', () => {
    const sql = 'select id from products where name = "' + "Kid's Meal" + '"'
    cy.task('queryDb', sql)
        .then((result) => {
            cy.get('#productItem' + result[0].id).click()
        })
})

Cypress.Commands.add('clickFriedRice', () => {
    const sql = 'select id from sides where name = "Fried Rice"'
    cy.task('queryDb', sql)
        .then((result) => {
            cy.get('#choiceItemSide' + result[0].id).click()
        })
})

Cypress.Commands.add('clickChowMein', () => {
    const sql = 'select id from sides where name = "Chow Mein"'
    cy.task('queryDb', sql)
        .then((result) => {
            cy.get('#choiceItemSide' + result[0].id).click()
        })
})

Cypress.Commands.add('clickSteamWhiteRice', () => {
    const sql = 'select id from sides where name = "Steam White Rice"'
    cy.task('queryDb', sql)
        .then((result) => {
            cy.get('#choiceItemSide' + result[0].id).click()
        })
})

Cypress.Commands.add('clickBBQChicken', () => {
    const sql = 'select id from entrees where name = "BBQ Chicken"'
    cy.task('queryDb', sql)
        .then((result) => {
            cy.get('#choiceItemEntree' + result[0].id).click()
        })
})

Cypress.Commands.add('clickBlackPepperChicken', () => {
    const sql = 'select id from entrees where name = "Black Pepper Chicken"'
    cy.task('queryDb', sql)
        .then((result) => {
            cy.get('#choiceItemEntree' + result[0].id).click()
        })
})

Cypress.Commands.add('clickGeneralTaosChicken', () => {
    const sql = 'select id from entrees where name = "General Taos Chicken"'
    cy.task('queryDb', sql)
        .then((result) => {
            cy.get('#choiceItemEntree' + result[0].id).click()
        })
})

Cypress.Commands.add('clickJalapenoChicken', () => {
    const sql = 'select id from entrees where name = "Jalapeno Chicken"'
    cy.task('queryDb', sql)
        .then((result) => {
            cy.get('#choiceItemEntree' + result[0].id).click()
        })
})

Cypress.Commands.add('clickKungPaoChicken', () => {
    const sql = 'select id from entrees where name = "Kung Pao Chicken"'
    cy.task('queryDb', sql)
        .then((result) => {
            cy.get('#choiceItemEntree' + result[0].id).click()
        })
})

Cypress.Commands.add('clickMushroomChicken', () => {
    const sql = 'select id from entrees where name = "Mushroom Chicken"'
    cy.task('queryDb', sql)
        .then((result) => {
            cy.get('#choiceItemEntree' + result[0].id).click()
        })
})

Cypress.Commands.add('clickOrangeChicken', () => {
    const sql = 'select id from entrees where name = "Orange Chicken"'
    cy.task('queryDb', sql)
        .then((result) => {
            cy.get('#choiceItemEntree' + result[0].id).click()
        })
})

Cypress.Commands.add('clickStringBeanChicken', () => {
    const sql = 'select id from entrees where name = "String Bean Chicken"'
    cy.task('queryDb', sql)
        .then((result) => {
            cy.get('#choiceItemEntree' + result[0].id).click()
        })
})

Cypress.Commands.add('clickTeriyakiChicken', () => {
    const sql = 'select id from entrees where name = "Teriyaki Chicken"'
    cy.task('queryDb', sql)
        .then((result) => {
            cy.get('#choiceItemEntree' + result[0].id).click()
        })
})

Cypress.Commands.add('clickBeefBroccoli', () => {
    const sql = 'select id from entrees where name = "Beef Broccoli"'
    cy.task('queryDb', sql)
        .then((result) => {
            cy.get('#choiceItemEntree' + result[0].id).click()
        })
})

Cypress.Commands.add('clickHunanBeef', () => {
    const sql = 'select id from entrees where name = "Hunan Beef"'
    cy.task('queryDb', sql)
        .then((result) => {
            cy.get('#choiceItemEntree' + result[0].id).click()
        })
})

Cypress.Commands.add('clickPepperSteak', () => {
    const sql = 'select id from entrees where name = "Pepper Steak"'
    cy.task('queryDb', sql)
        .then((result) => {
            cy.get('#choiceItemEntree' + result[0].id).click()
        })
})

Cypress.Commands.add('clickBroccoliShrimp', () => {
    const sql = 'select id from entrees where name = "Broccoli Shrimp"'
    cy.task('queryDb', sql)
        .then((result) => {
            cy.get('#choiceItemEntree' + result[0].id).click()
        })
})

Cypress.Commands.add('clickKungPaoShrimp', () => {
    const sql = 'select id from entrees where name = "Kung Pao Shrimp"'
    cy.task('queryDb', sql)
        .then((result) => {
            cy.get('#choiceItemEntree' + result[0].id).click()
        })
})

Cypress.Commands.add('clickBottleWater', () => {
    const sql = 'select id from combodrinks where name = "Bottle Water"'
    cy.task('queryDb', sql)
        .then((result) => {
            cy.get('#choiceItemDrink' + result[0].id).click()
        })
})

Cypress.Commands.add('selectComboSmallDrinkFlavor', (flavorName) => {
    const sql = 'select id from combodrinks where name = "Small Drink"'
    cy.task('queryDb', sql)
        .then((result) => {
            cy.get('#comboDrink' + result[0].id).select(flavorName)
        })
})

Cypress.Commands.add('clickComboPlus', (comboName) => {
    const sql = 'select id from products where name = "' + comboName + '"'
    cy.task('queryDb', sql)
        .then((result) => {
            cy.get('#quantityPlus' + result[0].id).click()
        })
})

Cypress.Commands.add('clickComboMinus', (comboName) => {
    const sql = 'select id from products where name = "' + comboName + '"'
    cy.task('queryDb', sql)
        .then((result) => {
            cy.get('#quantityMinus' + result[0].id).click()
        })
})

Cypress.Commands.add('clickComboAddToCart', (comboName) => {
    const sql = 'select id from products where name = "' + comboName + '"'
    cy.task('queryDb', sql)
        .then((result) => {
            cy.get('#addToCartForCombo' + result[0].id).click()
        })
})
// ***** Combo end *****

// ***** Appetizers start *****
Cypress.Commands.add('clickAppetizers', () => {
    const sql = 'select id from menus where name = "Appetizers"'
    cy.task('queryDb', sql)
        .then((result) => {
            cy.get('#menuItem' + result[0].id).click()
        })
})

Cypress.Commands.add('clickAppetizersPlus', (appetizerName) => {
    const sql = 'select id from products where name = "' + appetizerName + '"'
    cy.task('queryDb', sql)
        .then((result) => {
            cy.get('#quantityPlus' + result[0].id).click()
        })
})

Cypress.Commands.add('clickAppetizersMinus', (appetizerName) => {
    const sql = 'select id from products where name = "' + appetizerName + '"'
    cy.task('queryDb', sql)
        .then((result) => {
            cy.get('#quantityMinus' + result[0].id).click()
        })
})

Cypress.Commands.add('clickAppetizersAddToCart', (appetizerName) => {
    const sql = 'select id from products where name = "' + appetizerName + '"'
    cy.task('queryDb', sql)
        .then((result) => {
            cy.get('#addToCart' + result[0].id).click()
        })
})
// ***** Appetizers end *****

// ***** Drinks start *****
Cypress.Commands.add('clickDrinks', () => {
    const sql = 'select id from menus where name = "Drinks"'
    cy.task('queryDb', sql)
        .then((result) => {
            cy.get('#menuItem' + result[0].id).click()
        })
})

Cypress.Commands.add('selectCannedDrinkFlavor', (flavorName) => {
    const sql = 'select id from drinks where name = "Canned Drink"'
    cy.task('queryDb', sql)
        .then((result) => {
            cy.get('#selectDrink' + result[0].id).select(flavorName)
        })
})

Cypress.Commands.add('selectFountainDrinkFlavor', (flavorName) => {
    const sql = 'select id from drinks where name = "Fountain Drink"'
    cy.task('queryDb', sql)
        .then((result) => {
            cy.get('#selectDrink' + result[0].id).select(flavorName)
        })
})

Cypress.Commands.add('selectFreshJuiceFlavor', (flavorName) => {
    const sql = 'select id from drinks where name = "Fresh Juice"'
    cy.task('queryDb', sql)
        .then((result) => {
            cy.get('#selectDrink' + result[0].id).select(flavorName)
        })
})

Cypress.Commands.add('selectFountainDrinkSize', (sizeName) => {
    const sqlProducts = 'select * from products where name = "Fountain Soft Drink ' + sizeName + '"'
    cy.task('queryDb', sqlProducts)
        .then((resultProducts) => {
            const sqlDrinks = 'select id from drinks where name = "Fountain Drink"'
            cy.task('queryDb', sqlDrinks)
                .then((resultDrinks) => {
                    const selectName = resultProducts[0].name + ' - $' + resultProducts[0].price
                    cy.get('#productDrinks' + resultDrinks[0].id).select(selectName)
                })
        })
})

Cypress.Commands.add('selectFreshJuiceSize', (sizeName) => {
    const sqlProducts = 'select * from products where name = "' + sizeName + ' Fresh Fruit Juice"'
    cy.task('queryDb', sqlProducts)
        .then((resultProducts) => {
            const sqlDrinks = 'select id from drinks where name = "Fresh Juice"'
            cy.task('queryDb', sqlDrinks)
                .then((resultDrinks) => {
                    const selectName = resultProducts[0].name + ' - $' + resultProducts[0].price
                    cy.get('#productDrinks' + resultDrinks[0].id).select(selectName)
                })
        })
})

Cypress.Commands.add('clickDrinksPlus', (drinkName) => {
    const sql = 'select id from drinks where name = "' + drinkName + '"'
    cy.task('queryDb', sql)
        .then((result) => {
            cy.get('#quantityPlus' + result[0].id).click()
        })
})

Cypress.Commands.add('clickDrinksMinus', (drinkName) => {
    const sql = 'select id from drinks where name = "' + drinkName + '"'
    cy.task('queryDb', sql)
        .then((result) => {
            cy.get('#quantityMinus' + result[0].id).click()
        })
})

Cypress.Commands.add('clickDrinksAddToCart', (drinkName) => {
    const sql = 'select id from drinks where name = "' + drinkName + '"'
    cy.task('queryDb', sql)
        .then((result) => {
            cy.get('#addToCartForDrinkOnly' + result[0].id).click()
        })
})
// ***** Drinks end *****

// ***** Individule Side start *****
Cypress.Commands.add('clickSide', () => {
    const sql = 'select id from singles where name = "Side"'
    cy.task('queryDb', sql)
        .then((result) => {
            cy.get('#singleItem' + result[0].id).click()
        })
})

Cypress.Commands.add('selectSideSize', (sideName, sizeName) => {
    const sqlProducts = 'select * from products where name = "' + sizeName + ' Side"'
    cy.task('queryDb', sqlProducts)
        .then((resultProducts) => {
            const sqlSides = 'select id from sides where name = "' + sideName + '"'
            cy.task('queryDb', sqlSides)
                .then((resultSides) => {
                    const selectName = resultProducts[0].name + ' - $' + resultProducts[0].price
                    cy.get('#productSides' + resultSides[0].id).select(selectName)
                })
        })
    
})

Cypress.Commands.add('clickSidePlus', (sideName) => {
    const sql = 'select id from sides where name = "' + sideName + '"'
    cy.task('queryDb', sql)
        .then((result) => {
            cy.get('#quantityPlus' + result[0].id).click()
        })
})

Cypress.Commands.add('clickSideMinus', (sideName) => {
    const sql = 'select id from sides where name = "' + sideName + '"'
    cy.task('queryDb', sql)
        .then((result) => {
            cy.get('#quantityMinus' + result[0].id).click()
        })
})

Cypress.Commands.add('clickSideAddToCart', (sideName) => {
    const sql = 'select id from sides where name = "' + sideName + '"'
    cy.task('queryDb', sql)
        .then((result) => {
            cy.get('#addToCartForSide' + result[0].id).click()
        })
})
// ***** Individule Side End *****

// ***** Individule Entree start *****
Cypress.Commands.add('clickChickenEntree', () => {
    const sql = 'select id from singles where name = "Chicken Entree"'
    cy.task('queryDb', sql)
        .then((result) => {
            cy.get('#singleItem' + result[0].id).click()
        })
})

Cypress.Commands.add('clickBeefEntree', () => {
    const sql = 'select id from singles where name = "Beef Entree"'
    cy.task('queryDb', sql)
        .then((result) => {
            cy.get('#singleItem' + result[0].id).click()
        })
})

Cypress.Commands.add('clickShrimpEntree', () => {
    const sql = 'select id from singles where name = "Shrimp Entree"'
    cy.task('queryDb', sql)
        .then((result) => {
            cy.get('#singleItem' + result[0].id).click()
        })
})

Cypress.Commands.add('selectChickenEntreeSize', (entreeName, sizeName) => {
    const sqlProducts = 'select * from products where name = "' + sizeName + ' Chicken"'
    cy.task('queryDb', sqlProducts)
        .then((resultProducts) => {
            const sqlEntrees = 'select id from entrees where name = "' + entreeName + '"'
            cy.task('queryDb', sqlEntrees)
                .then((resultEntrees) => {
                    const selectName = sizeName + " Chicken - $" + resultProducts[0].price
                    cy.get('#productEntrees' + resultEntrees[0].id).select(selectName)
                })
        })
})

Cypress.Commands.add('selectBeefEntreeSize', (entreeName, sizeName) => {
    const sqlProducts = 'select * from products where name = "' + sizeName + ' Beef"'
    cy.task('queryDb', sqlProducts)
        .then((resultProducts) => {
            const sqlEntrees = 'select id from entrees where name = "' + entreeName + '"'
            cy.task('queryDb', sqlEntrees)
                .then((resultEntrees) => {
                    const selectName = sizeName + " Beef - $" + resultProducts[0].price
                    cy.get('#productEntrees' + resultEntrees[0].id).select(selectName)
                })
        })
})

Cypress.Commands.add('selectShrimpEntreeSize', (entreeName, sizeName) => {
    const sqlProducts = 'select * from products where name = "' + sizeName + ' Shrimp"'
    cy.task('queryDb', sqlProducts)
        .then((resultProducts) => {
            const sqlEntrees = 'select id from entrees where name = "' + entreeName + '"'
            cy.task('queryDb', sqlEntrees)
                .then((resultEntrees) => {
                    const selectName = sizeName + " Shrimp - $" + resultProducts[0].price
                    cy.get('#productEntrees' + resultEntrees[0].id).select(selectName)
                })
        })
})

Cypress.Commands.add('clickEntreePlus', (entreeName) => {
    const sql = 'select id from entrees where name = "' + entreeName + '"'
    cy.task('queryDb', sql)
        .then((result) => {
            cy.get('#quantityPlus' + result[0].id).click()
        })
})

Cypress.Commands.add('clickEntreeMinus', (entreeName) => {
    const sql = 'select id from entrees where name = "' + entreeName + '"'
    cy.task('queryDb', sql)
        .then((result) => {
            cy.get('#quantityMinus' + result[0].id).click()
        })
})

Cypress.Commands.add('clickEntreeAddToCart', (entreeName) => {
    const sql = 'select id from entrees where name = "' + entreeName + '"'
    cy.task('queryDb', sql)
        .then((result) => {
            cy.get('#addToCartForEntree' + result[0].id).click()
        })
})
// ***** Individule Entree end *****
// ********** Click end **********

// ********** Login User start **********
// ***** Login as Admin start *****
Cypress.Commands.add('LoginAsAdmin', () => {
    cy.visit('http://localhost:8000/login')
    cy.get('#email').type('Admin@yahoo.com')
    cy.get('#password').type('1234')
    cy.get('#submitLogin').click()
    cy.wait(1000)
})
// ***** Login as Admin end *****
// ***** Login as Manager start *****
Cypress.Commands.add('LoginAsManager', () => {
    cy.visit('http://localhost:8000/login')
    cy.get('#email').type('Manager@yahoo.com')
    cy.get('#password').type('1234')
    cy.get('#submitLogin').click()
    cy.wait(1000)
})
// ***** Login as Manager end *****
// ***** Login as Employee start *****
Cypress.Commands.add('LoginAsEmployee', () => {
    cy.visit('http://localhost:8000/login')
    cy.get('#email').type('Employee@yahoo.com')
    cy.get('#password').type('1234')
    cy.get('#submitLogin').click()
    cy.wait(1000)
})
// ***** Login as Employee end *****
// ********** Login User end **********

// ********** Customer Chain Long start **********
// ***** Register customer Chain Long start *****
Cypress.Commands.add('RegisterCustomerChainLong', () => {
    cy.visit('http://localhost:8000/customerRegister')
    cy.wait(1000)
    cy.get('#firstname').type('Chain')
    cy.get('#lastname').type('Long')
    cy.get('#phone').type('214-680-8281')
    cy.get('#email').type('ChainLongCo@gmail.com')
    cy.get('#password').type('1234')
    cy.get('#submitCustomerSignup').click()
    cy.wait(2000)
    const sqlCustomers = 'select count(*) as total from customers where email = "ChainLongCo@gmail.com"'
    cy.task('queryDb', sqlCustomers)
        .then((resultCustomers) => {
            expect(resultCustomers[0].total).to.eq(1)
        })
})
// ***** Register customer Chain Long end *****
// ***** Update customer Chain Long start *****
Cypress.Commands.add('UpdateCustomerChainLong', () => {
    cy.visit('http://localhost:8000/customer/list')
    cy.wait(1000)
    cy.get('#customersDatatable_filter > label > input[type=search]').type('ChainLongCo@gmail.com')
    cy.get('#customersDatatable > tbody > tr > td:nth-child(5) > div > a.col-md-5.btn.btn-primary').click()
    cy.wait(1000)
    cy.get('#firstname').clear().type('Chain')
    cy.get('#lastname').clear().type('Long')
    cy.get('#phone').clear().type('214-680-8281')
    cy.get('#email').clear().type('ChainLongCo@gmail.com')
    cy.get('#address1').clear().type('4436 Laurel Springs ct')
    cy.get('#address2').clear().type('Suite 100')
    cy.get('#city').clear().type('Colleyville')
    cy.get('#state').clear().type('TX')
    cy.get('#zip').clear().type('75115')
    cy.get('#card').clear().type('1234567890123456')
    cy.get('#expired').clear().type('1226')
    cy.get('#cvv').clear().type('123')
    cy.wait(1000)
    cy.get('#submitCustomer').click()
    cy.wait(2000)
    const sqlCustomers = 'select count(*) as total from customers where email = "ChainLongCo@gmail.com"'
    cy.task('queryDb', sqlCustomers)
        .then((resultCustomers) => {
            expect(resultCustomers[0].total).to.eq(1)
        })
})
// ***** Update customer Chain Long end *****
// ***** Login customer Chain Long start *****
Cypress.Commands.add('LoginCustomerChainLong', () => {
    cy.visit('http://localhost:8000/customerLogin')
    cy.wait(1000)
    cy.get('#email').type('ChainLongCo@gmail.com')
    cy.get('#password').type('1234')
    cy.get('#submitLogin').click()
    cy.wait(2000)
})
// ***** Logout customer Chain Long start *****
Cypress.Commands.add('LogoutCustomerChainLong', () => {
    cy.get('#navbarDropdownCustomerLoginned').click()
    cy.wait(1000)
    cy.get('#customerLogin > ul > li > a').click()
    cy.url('http://localhost:8000/customerLogin')
    cy.wait(1000)
})
// ***** Login customer Chain Long end *****
// ***** Delete customer Chain Long start *****
Cypress.Commands.add('DeleteCustomerChainLong', () => {
    const sqlChainLong = 'delete from customers where email = "ChainLongCo@gmail.com"'
    cy.task('queryDb', sqlChainLong)
        .then((resultChainLong) => {
            expect(resultChainLong.affectedRows).to.eq(1)
        })
})
// ***** Delete customer Chain Long end *****
// ********** Customer Chain Long end **********

// ********** Database data start **********
// ***** Combo Regular platter start *****
Cypress.Commands.add('RetrieveRegularPlatterData', () => {
    const sqlProductsRegularPlatter = 'select * from products where name = "Regular Platter"'
    cy.task('queryDb', sqlProductsRegularPlatter)
        .then((resultProductsRegularPlatter) => {
            const id = resultProductsRegularPlatter[0].id
            cy.wrap(id).as('regularPlatterId')
            const name = resultProductsRegularPlatter[0].name
            cy.wrap(name).as('regularPlatterName')
            const description = resultProductsRegularPlatter[0].description
            cy.wrap(description).as('regularPlatterDescription')
            const gallery = resultProductsRegularPlatter[0].gallery
            cy.wrap(gallery).as('regularPlatterGallery')
            const category = resultProductsRegularPlatter[0].category
            cy.wrap(category).as('regularPlatterCategory')
            const price = resultProductsRegularPlatter[0].price
            cy.wrap(price).as('regularPlatterPrice')
            const menuId = resultProductsRegularPlatter[0].menu_id
            cy.wrap(menuId).as('regularPlatterMenuId')
        })
})
// ***** Combo Regular platter end *****

// ***** Appetizers start*****
// ***** Fried Dumpling (5) start *****
Cypress.Commands.add('RetrieveFriedDumplingData', () => {
    const sqlProductsFriedDumpling = 'select * from products where name = "Fried Dumpling (5)"'
    cy.task('queryDb', sqlProductsFriedDumpling)
        .then((resultProductsFriedDumpling) => {
            const id = resultProductsFriedDumpling[0].id
            cy.wrap(id).as('friedDumplingId')
            const name = resultProductsFriedDumpling[0].name
            cy.wrap(name).as('friedDumplingName')
            const description = resultProductsFriedDumpling[0].description
            cy.wrap(description).as('friedDumplingDescription')
            const gallery = resultProductsFriedDumpling[0].gallery
            cy.wrap(gallery).as('friedDumplingGallery')
            const category = resultProductsFriedDumpling[0].category
            cy.wrap(category).as('friedDumplingCategory')
            const price = resultProductsFriedDumpling[0].price
            cy.wrap(price).as('friedDumplingPrice')
            const menuId = resultProductsFriedDumpling[0].menu_id
            cy.wrap(menuId).as('friedDumplingMenuId')
        })
    })    
// ***** Fried Dumpling (5) end *****
// ***** Appetizers end *****

// ***** Order start*****
// ***** Orders start *****
Cypress.Commands.add('RetrieveLatestCreatedOrdersData', () => {
    const sqlOrders = 'select * from orders order by id DESC';
    cy.task('queryDb', sqlOrders)
        .then((resultOrders) => {
            const id = resultOrders[0].id
            cy.wrap(id).as('ordersIdForCreated')
            const customerId = resultOrders[0].customer_id
            cy.wrap(customerId).as('ordersCustomerIdForCreated')
            const quantity = resultOrders[0].quantity
            cy.wrap(quantity).as('ordersQuantityForCreated')
            const total = resultOrders[0].total
            cy.wrap(total).as('ordersTotalForCreated')
            const note = resultOrders[0].note
            cy.wrap(note).as('ordersNoteForCreated')
            const createdAt = cy.chinamax.formatDateTime(resultOrders[0].created_at)
            cy.wrap(createdAt).as('ordersCreatedAtForCreated')
            const updatedAt = cy.chinamax.formatDateTime(resultOrders[0].updated_at)
            cy.wrap(updatedAt).as('ordersUpdatedAtForCreated')
        })
    })

Cypress.Commands.add('RetrieveLatestUpdatedOrdersData', () => {
    const sqlOrders = 'select * from orders order by updated_at DESC';
    cy.task('queryDb', sqlOrders)
        .then((resultOrders) => {
            const id = resultOrders[0].id
            cy.wrap(id).as('ordersIdForUpdated')
            const customerId = resultOrders[0].customer_id
            cy.wrap(customerId).as('ordersCustomerIdForUpdated')
            const quantity = resultOrders[0].quantity
            cy.wrap(quantity).as('ordersQuantityForUpdated')
            const total = resultOrders[0].total
            cy.wrap(total).as('ordersTotalForUpdated')
            const note = resultOrders[0].note
            cy.wrap(note).as('ordersNoteForUpdated')
            const createdAt = cy.chinamax.formatDateTime(resultOrders[0].created_at)
            cy.wrap(createdAt).as('ordersCreatedAtForUpdated')
            const updatedAt = cy.chinamax.formatDateTime(resultOrders[0].updated_at)
            cy.wrap(updatedAt).as('ordersUpdatedAtForUpdated')
        })
    })    
// ***** Orders end *****
// ***** Order end*****

// ***** Restaurants start *****
Cypress.Commands.add('RetrieveRestaurantsData', () => {
    const sqlRestaurants = 'select tax_rate from restaurants'
    cy.task('queryDb', sqlRestaurants)
        .then((resultRestaurants) => {
            const id = resultRestaurants[0].id
            cy.wrap(id).as('restaurantsId')
            const yearFounded = resultRestaurants[0].year_founded
            cy.wrap(yearFounded).as('restaurantsYearFounded')
            const taxRate = resultRestaurants[0].tax_rate
            cy.wrap(taxRate).as('restaurantsTaxRate')
            const phone = cy.chinamax.formatPhoneNumber(resultRestaurants[0].phone)
            cy.wrap(phone).as('restaurantsPhone')
            const email = resultRestaurants[0].email
            cy.wrap(email).as('restaurantsEmail')
            const address1 = resultRestaurants[0].address1
            cy.wrap(address1).as('restaurantsAddress1')
            const address2 = resultRestaurants[0].address2
            cy.wrap(address2).as('restaurantsAddress2')
            const city = resultRestaurants[0].city
            cy.wrap(city).as('restaurantsCity')
            const state = resultRestaurants[0].state
            cy.wrap(state).as('restaurantsState')
            const zip = resultRestaurants[0].zip
            cy.wrap(zip).as('restaurantsZip')
        })
})
// ***** Restaurants end *****

// ***** Customers start *****
Cypress.Commands.add('RetrieveCustomersChainLongData', () => {
    const sqlCustomers = 'select * from customers where email = "ChainLongCo@gmail.com"'
    cy.task('queryDb', sqlCustomers)
        .then((resultCustomers) => {
            const id = resultCustomers[0].id
            cy.wrap(id).as('customersId')
            const firstName = resultCustomers[0].first_name
            cy.wrap(firstName).as('customersChainLongFirstName')
            const lastName = resultCustomers[0].last_name
            cy.wrap(lastName).as('customersChainLongLastName')
            const phone = cy.chinamax.formatPhoneNumber(resultCustomers[0].phone)
            cy.wrap(phone).as('customersChainLongPhone')
            const email = resultCustomers[0].email
            cy.wrap(email).as('customersChainLongEmail')
            const address1 = resultCustomers[0].address1
            cy.wrap(address1).as('customersChainLongAddress1')
            const address2 = resultCustomers[0].address2
            cy.wrap(address2).as('customersChainLongAddress2')
            const city = resultCustomers[0].city
            cy.wrap(city).as('customersChainLongCity')
            const state = resultCustomers[0].state
            cy.wrap(state).as('customersChainLongState')
            const zip = resultCustomers[0].zip
            cy.wrap(zip).as('customersChainLongZip')
            const cardNumber = resultCustomers[0].card_number
            cy.wrap(cardNumber).as('customersChainLongCardNumber')
            const expired = resultCustomers[0].expired
            cy.wrap(expired).as('customersChainLongExpired')
            const cvv = resultCustomers[0].cvv
            cy.wrap(cvv).as('customersChainLongCVV')
        })
})
// ***** Restaurants end *****
// ********** Database data end **********