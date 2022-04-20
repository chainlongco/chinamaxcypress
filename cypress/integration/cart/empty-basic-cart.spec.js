/// <reference types="cypress" />

beforeEach('Visit cart', () => {
    cy.visit('http://localhost:8000/cart')
})

describe('Visit cart, check elements in cart and links', () => {
    it('Check elements and find', () => {
        cy.get('#cart_count').contains('0')
        cy.get('#mycart > div > div > div.col-md-7 > div > div.row > div.col-md-5 > h4').contains('My Cart')
        cy.get('.addMoreItems').contains('Add More Items').should('be.enabled')
        cy.get('#mycart > div > div > div.col-md-5 > div.py-4 > div.py-1 > h5').contains('Special Requests')
        cy.get('#ordernote').invoke('attr', 'placeholder').should('contain', 'Add Note...')
        cy.get('#updateNote').contains('Update Note')
        cy.get('#updateNote').should('be.enabled')
        cy.get('#pricedetail > div:nth-child(1) > h5').contains('Price Detail')
        cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-start > h5:nth-child(1)').contains('Price (0 items)')
        cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-start > h5:nth-child(2)').contains('Tax')
        cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-start > h4').contains('Order Total')
        cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-end > h5:nth-child(1)').contains('$0.00')
        cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-end > h5:nth-child(2)').contains('$0.00')
        cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-end > h4').contains('$0.00')
        cy.get('#checkout').contains('Checkout').should('be.disabled')
        cy.get('#emptycart').contains('Empty Cart').should('be.enabled')
    })

    it('Check add more items link, checkout link, and check empty button', () => {
        // Check add more item link
        cy.get('.addMoreItems').click()
        cy.wait(1000)
        cy.url('http://localhost:8000/menu')
        
        // Click appetizers to choose egg roll
        const sql = 'select id from menus where name = "Appetizers"'
        cy.task('queryDb', sql)
            .then((resultMenus) => {
                cy.get('#menuItem' + resultMenus[0].id).click()
                cy.wait(1000)
                const sql = 'select id from products where name = "Egg Roll (5)"'
                cy.task('queryDb', sql)
                    .then((resultProducts) => {
                        cy.get('#quantityPlus' + resultProducts[0].id).click()
                        cy.wait(1000)
                        cy.get('#addToCart' + resultProducts[0].id).click()
                        cy.url('http://localhost:8000/cart')
                        cy.get('#orderlist').contains('Egg Roll (5)')

                        // Add note and check in checkout link
                        cy.get('#ordernote').type('spicy')
                        cy.get('#updateNote').contains('Update Note').click()
                        cy.wait(1000)

                        // Check checkout link and note 
                        cy.get('#checkout').should('be.enabled').click()
                        cy.wait(1000)
                        cy.url('http://localhost:8000/checkout')
                        //cy.wait(1000)
                        cy.get('#ordernote').contains('Special Requests: spicy')
                        //#ordernote > div > div > p

                        // Check empty cart link
                        cy.go('back')
                        cy.url('http://localhost:8000/cart')
                        cy.get('#orderlist').contains('Egg Roll (5)')
                        cy.get('#emptycart').click()
                        cy.on('window:confirm', () => true);
                        cy.wait(1000)
                        cy.get('#orderlist').should('not.contain', 'Egg Roll (5)')
                    })
            })
    })
})