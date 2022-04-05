/// <reference types="cypress" />

beforeEach('Visit menu', () => {
    cy.visit('localhost:8000/menu')
})

describe('Click single -- side', () => {
    const singleName = "Side"

    it('Click and check single is highlighted', () => {
        cy.clickAndCheckSingleIsHighlighted(singleName)
    })

    it('Check choices for side', () => {
        const sql = 'select * from singles where name = "Side"'
        cy.task('queryDb', sql)
            .then((resultSingles) => {
                const id = resultSingles[0].id
                cy.get('#singleItem' + id).click()
                cy.wait(1000)
                const sql = 'select * from sides'
                cy.task('queryDb', sql)
                    .then((resultSides) => {
                        for (var i=0; i<resultSides.length; i++) {
                            const sideId = resultSides[i].id
                            cy.get('#choiceItemSide' + sideId + ' > img').should('have.attr', 'src', '\\images\\' + resultSides[i].gallery)
                            cy.get('#choiceItemSide' + sideId).contains(resultSides[i].name)

                            // Hover the choices
                            cy.get('#choiceItemSide' + sideId).invoke('show').click().get('#choiceItemSideName' + sideId)
                            .should('have.css', 'text-decoration', 'underline solid rgb(33, 37, 41)');

                            const sql = 'select * from products where category = ' + '"Side"'
                            cy.task('queryDb', sql)
                                .then((resultProducts) => {
                                    for (var i=0; i<resultProducts.length; i++) {
                                        cy.get('#productSides' + sideId).contains(resultProducts[i].name + ' - ' + '$' + resultProducts[i].price)
                                    }
                                })
                            cy.defaultQuantityAndAddToCartButton('addToCartForSide', sideId)
                        }
                    })
            })
    })

    it('Mouse hover in and underline the single name', () => {
        cy.hoverAndUnderlineFromSingleTable(singleName)
    })
})