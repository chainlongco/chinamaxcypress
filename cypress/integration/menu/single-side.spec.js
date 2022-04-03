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
                            cy.get('#choiceItemSide' + resultSides[i].id + ' > img').should('have.attr', 'src', '\\images\\' + resultSides[i].gallery)
                            cy.get('#choiceItemSide' + resultSides[i].id).contains(resultSides[i].name)
                            const sql = 'select * from products where category = ' + '"Side"'
                            cy.task('queryDb', sql)
                                .then((resultProducts) => {
                                    for (var i=0; i<resultProducts.length; i++) {
                                        cy.get('#productSides' + resultSides[i].id).contains(resultProducts[i].name + ' - ' + '$' + resultProducts[i].price)
                                    }
                                })
                            cy.defaultQuantityAndAddToCartButton('addToCartForSide', resultSides[i].id)
                        }
                    })
            })
    })

    it('Mouse hover in and underline the single name', () => {
        cy.hoverAndUnderlineFromSingleTable(singleName)
    })
})