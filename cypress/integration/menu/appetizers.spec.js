/// <reference types="cypress" />

describe('Click appetizers', () => {
    beforeEach('Visit menu', () => {
        cy.visit('localhost:8000/menu')
    })

    it('Check appetizers is highlighted', () => {
        cy.clickAndCheckAppetizersIsHighlighted()  
    })

    it('Check choices for appetizers and hover them', () => {
        const sql = 'select * from menus where name = "Appetizers"'
        cy.task('queryDb', sql)
            .then((result) => {
                const id = result[0].id
                cy.get('#eachMenu' + id).click()
                cy.wait(1000)
                const sql = 'select * from products where menu_id = ' + id
                cy.task('queryDb', sql)
                    .then((result) => {
                        for (var i=0; i<result.length; i++) {
                            cy.get('#orderChoices > div > div:nth-child(' + result[i].id + ') > div > img').should('have.attr', 'src', '\\images\\' + result[i].gallery)
                            cy.get('#orderChoices > div > div:nth-child(' + result[i].id + ') > div > span.choiceItemName').contains(result[i].name)
                            cy.get('#orderChoices > div > div:nth-child(' + result[i].id + ') > div > span.choiceItemPrice').contains('$' + result[i].price)
                            cy.defaultQuantityAndAddToCartButton('addToCart', result[i].id)

                            // Hover the choices
                            cy.get('#choiceItem' + result[i].id).invoke('show').click().get('#choiceItemName' + result[i].id)
                            .should('have.css', 'text-decoration', 'underline solid rgb(33, 37, 41)');
                        }
                    })
            })  
    })

    it('Mouse hover in and underline the Appetizers name', () => {
        const sql = 'select * from menus where name = "Appetizers"'
        cy.task('queryDb', sql)
            .then((result) => {
                const id = result[0].id
                cy.get('#eachMenu' + id).click()
                cy.wait(1000)
                cy.hoverAndUnderlineFromMenuTable("Appetizers")
            })
    })
})