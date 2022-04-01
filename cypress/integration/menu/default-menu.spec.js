/// <reference types="cypress" />

beforeEach('Visit menu', () => {
    cy.visit('localhost:8000/menu')
})

describe('Default menu -- Regular Platter', () => {
    const comboName = "Regular Platter"
    const sql = "select * from products where name = '" + comboName + "'"

    it('Check Regular Platter is highlighted for default menu', () => {
        cy.task('queryDb', sql)
        .then((result) => {
            // Check if Regular Platter is highlighted
            const id = result[0].id
            cy.get('#productItem' + id).should('have.css', 'border', '5px solid rgb(255, 0, 0)')    // red
            cy.get('#orderChoices > h1').contains(comboName)
        });
    })

    it ('Check Regular Platter detail', () => {
        cy.task('queryDb', sql)
        .then((result) => {
            const id = result[0].id
            const name = result[0].name
            const description = result[0].description
            const price = "$" + result[0].price
            cy.get('#productItem' + id).contains(name)
            cy.get('#productItem' + id).contains(description)
            cy.get('#productItem' + id).contains(price)
        });
    })

    it('Check maximum sides and entrees for Regular Platter', () => {
        cy.task('queryDb', sql)
        .then((result) => {
            // Check Sides and Entrees display for Regular Platter
            const id = result[0].id
            const sql = "select * from combos where product_id = " + id
            cy.task('queryDb', sql)
            .then((result) => {
                //expect(result[0].side).eq(1)
                //expect(result[0].entree).eq(2)
                //expect(result[0].drink).eq(0)
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

    it('Check side choices for Regular Platter', () => {
        cy.task('queryDb', sql)
        .then((result) => {
            // Check Sides and Entrees display for Regular Platter
            const id = result[0].id
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
                            cy.get('#choiceItemDrink' + id).contains(result[i].name)
                            cy.get('#choiceItemDrink' + id).find('img').should('have.attr', 'src', gallery)
                            if (result[i].price) {
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
                            }
                        }
                    })
                }
            })
        });
    })

    it('Click and check minus/quantity/plus and Add to cart buttons for Regular Platter', () => {
        cy.clickAndCheckComboChoices(comboName)
    })
})