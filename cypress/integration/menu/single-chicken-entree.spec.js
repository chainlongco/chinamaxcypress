/// <reference types="cypress" />

beforeEach('Visit menu', () => {
    cy.visit('localhost:8000/menu')
})

describe('Click single -- chicken entree', () => {
    const singleName = "Chicken Entree"

    it('Click and check single is highlighted', () => {
        cy.clickAndCheckSingleIsHighlighted(singleName)
    })

    it('Check choices for chicken entree', () => {
        cy.clickAndCheckSingleEntreeChoices("Chicken")
    })

    it('Mouse hover in and underline the single name', () => {
        cy.hoverAndUnderlineFromSingleTable(singleName)
    })

    it('Check choices for chicken entree', () => {
        const sql = 'select * from singles where name = "Chicken Entree"'
        cy.task('queryDb', sql)
            .then((resultSingles) => {
                const id = resultSingles[0].id
                cy.get('#singleItem' + id).click()
                cy.wait(1000)
                const sql = 'select * from entrees where category = "Chicken"'
                cy.task('queryDb', sql)
                    .then((resultEntrees) => {
                        for (var i=0; i<resultEntrees.length; i++) {
                            const entreeId = resultEntrees[i].id
                            cy.get('#choiceItemEntree' + entreeId + ' > img').should('have.attr', 'src', '\\images\\' + resultEntrees[i].gallery)
                            cy.get('#choiceItemEntree' + entreeId).contains(resultEntrees[i].name)

                            // Hover the choices
                            cy.get('#choiceItemEntree' + entreeId).invoke('show').click().get('#choiceItemEntreeName' + entreeId)
                            .should('have.css', 'text-decoration', 'underline solid rgb(33, 37, 41)');

                            const sql = 'select * from products where category = ' + '"Chicken"'
                            cy.task('queryDb', sql)
                                .then((resultProducts) => {
                                    for (var i=0; i<resultProducts.length; i++) {
                                        cy.get('#productEntrees' + entreeId).contains(resultProducts[i].name + ' - ' + '$' + resultProducts[i].price)
                                    }
                                })
                            cy.defaultQuantityAndAddToCartButton('addToCartForEntree', entreeId)
                        }
                    })
            })
    })
})