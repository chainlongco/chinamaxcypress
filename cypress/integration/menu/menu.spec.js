/// <reference types="cypress" />

beforeEach('Visit menu', () => {
    cy.visit('localhost:8000/menu')
})

describe('Chinamax menu', () => {
    it('Get title for menu', () => {
        cy.title().should('eq', 'Order')
        cy.get('#orderMenu > h1').contains('Menu')
    })
})

describe('Combo', () => {
    it('Get combo information', () => {
        const sql = "select * from menus where name = 'Combo'"
        cy.task('queryDb', sql)
        .then((result) => {
            const id = result[0].id
            cy.get('#menuItem' + id).contains(result[0].name)
            cy.get('#menuItem' + id).contains(result[0].description)
        })
    })

    it('Get combo list information', () => {
        const sql = "select * from menus where name = 'Combo'"
        cy.task('queryDb', sql)
        .then((result) => {
            const id = result[0].id
            const sql = "select * from products where menu_id = " + id
            cy.task('queryDb', sql)
            .then((result) => {
                for (var i=0; i<result.length; i++) {
                    cy.get('#productItem' + result[i].id).contains(result[i].name)
                    cy.get('#productItem' + result[i].id).contains(result[i].description)
                    cy.get('#productItem' + result[i].id).contains('$' + result[i].price)
                }
            })
        })
    })

    it('Mouse hover in and underline the Combo name', () => {
        cy.hoverAndUnderlineFromMenuTable("Combo")
    })

    it('Get appetizer information', () => {
        const sql = "select * from menus where name = 'Appetizers'"
        cy.task('queryDb', sql)
        .then((result) => {
            const id = result[0].id
            cy.get('#menuItem' + id).contains(result[0].name)
            cy.get('#menuItem' + id).contains(result[0].description)
        })
    })

    it('Mouse hover in and underline the Appetizers name', () => {
        cy.hoverAndUnderlineFromMenuTable("Appetizers")
    })

    it('Get drink information', () => {
        const sql = "select * from menus where name = 'Drinks'"
        cy.task('queryDb', sql)
        .then((result) => {
            const id = result[0].id
            cy.get('#menuItem' + id).contains(result[0].name)
            cy.get('#menuItem' + id).contains(result[0].description)
        })
    })

    it('Mouse hover in and underline the Drinks name', () => {
        cy.hoverAndUnderlineFromMenuTable("Drinks")
    })

    it('Get Individual Side/Entree list information', () => {
        const sql = "select * from menus where name = 'Individual Side/Entree'"
        cy.task('queryDb', sql)
        .then((result) => {
            const id = result[0].id
            cy.get('#menuItem' + id).contains(result[0].name)
            cy.get('#menuItem' + id).contains(result[0].description)
        })

        const sqlSingles = "select * from singles"
        cy.task('queryDb', sqlSingles)
        .then((result) => {
            for(var i=0; i<result.length; i++) {
                cy.get('#singleItem' + result[i].id).contains(result[i].name)
                cy.get('#singleItem' + result[i].id).contains(result[i].description)
            }
        })
    })

    it('Mouse hover in and underline the Individual Side/Entree name', () => {
        cy.hoverAndUnderlineFromMenuTable("Individual Side/Entree")
    })
})