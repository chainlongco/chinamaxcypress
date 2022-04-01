/// <reference types="cypress" />

describe('Click appetizers', () => {
    beforeEach('Visit menu', () => {
        cy.visit('localhost:8000/menu')
    })

    it('Check appetizers is highlighted', () => {
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

    it('Check choices for appetizers', () => {
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
                            cy.get('#orderChoices > div > div:nth-child(' + (i+1) + ') > div > img').should('have.attr', 'src', '\\images\\' + result[i].gallery)
                            cy.get('#orderChoices > div > div:nth-child(' + (i+1) + ') > div > span.choiceItemName').contains(result[i].name)
                            cy.get('#orderChoices > div > div:nth-child(' + (i+1) + ') > div > span.choiceItemPrice').contains('$' + result[i].price)
                            cy.defaultQuantityAndAddToCartButton('addToCart', result[i].id)
                        }
                    })
            })  
    })
})