/// <reference types="cypress" />

beforeEach('Visit cart', () => {
    cy.visit('http://localhost:8000/menu')
    cy.wait(1000)
    cy.clickRegularPlatter()
    cy.wait(1000)
    cy.clickFriedRice()
    cy.clickBBQChicken()
    cy.clickBlackPepperChicken()
    cy.clickComboAddToCart('Regular Platter')
    cy.wait(1000)
    cy.visit('http://localhost:8000/checkout')
    cy.wait(1000)
    cy.url('http://localhost:8000/checkout')
})

describe('Add regular platter, and visit checkout', () => {
    it('Check the checkout page', () => {
        cy.get('#cart_count').contains('1')
        
        // Left of screen
        cy.get('#checkoutTitle').contains('Checkout')
        // Buttons
        cy.get('#customerlogin').should('be.enabled')
        cy.get('#customersignup').should('be.enabled')
        // Customer information
        cy.get('#customerInformation').contains('Customer Information')
        cy.get('#firstnameLabel').contains('First Name*')
        cy.get('#lastnameLabel').contains('Last Name*')
        cy.get('#phoneLabel').contains('Phone*')
        cy.get('#emailLabel').contains('Email Address*')
        // Credit card information
        cy.get('#creditCardInformation').contains('Credit Card Information')
        cy.get('#cardLabel').contains('Card Number*')
        cy.get('#expiredLabel').contains('Expiration Month/Year*')
        cy.get('#cvvLabel').contains('CVV*')
        cy.get('#zipLabel').contains('Zip Code*')

        // Right of screen
        // Order item
        var price = 0
        const sqlProducts = 'select * from products where name = "Regular Platter"'
        cy.task('queryDb', sqlProducts)
            .then((resultProducts) => {
                price = resultProducts[0].price
                cy.get('#orderlist > div > div > div.col-md-3 > img').should('have.attr', 'src', '\\images\\' + resultProducts[0].gallery)
                cy.get('#orderlist > div > div > div.col-md-9 > h5.pt-2').contains(resultProducts[0].name)
                cy.get('#orderlist > div > div > div.col-md-9 > h5.pt-2').contains(resultProducts[0].description)
                cy.get('#orderlist > div > div > div.col-md-9 > h5:nth-child(2)').contains('Side: Fried Rice(1) Entree: BBQ Chicken(1) Black Pepper Chicken(1)')
                cy.get('#orderlist > div > div > div.col-md-9 > h5.pt-1').contains('$' + resultProducts[0].price + ' -- 1 item')
            })
        // Special Requests
        cy.get('#ordernote > div > div > p').contains('Special Requests:')
        // Price
        cy.get('#pricedetail > div > div.col-md-6.text-start > h5:nth-child(1)').contains('Subtotal (1 items)')
        cy.get('#pricedetail > div > div.col-md-6.text-start > h5:nth-child(2)').contains('Tax')
        cy.get('#pricedetail > div > div.col-md-6.text-start > h4').contains('Order Total')
        const sqlRestaurant = 'select tax_rate from restaurants'
                cy.task('queryDb', sqlRestaurant)
                    .then((resultRestaurant) => {
                        var taxRate = parseFloat(resultRestaurant[0].tax_rate)
                        var tax = parseFloat((taxRate * price).toFixed(2))
                        var total = parseFloat((price + tax).toFixed(2))
                        cy.get('#pricedetail > div > div.col-md-6.text-end > h5:nth-child(1)').contains(price)
                        cy.get('#pricedetail > div > div.col-md-6.text-end > h5:nth-child(2)').contains(tax)
                        cy.get('#pricedetail > div > div.col-md-6.text-end > h4').contains(total)
                    })
        // Place order button
        cy.get('#placeorder').should('be.enabled')
    })

    it('Buttons for Login, Signup', () => {
        cy.get('#customerlogin').click()
        cy.wait(1000)
        cy.url('http://localhost:8000/customerLogin')
        cy.go('back')
        cy.wait(1000)
        cy.get('#customersignup').click()
        cy.wait(1000)
        cy.url('http://localhost:8000/customerRegister')
    })

    it('Button for place order', () => {
        cy.get('#placeorder').click()
        cy.wait(1000)
        cy.get('.firstname_error').should('be.visible').contains('The firstname field is required.')
        cy.get('.lastname_error').should('be.visible').contains('The lastname field is required.')
        cy.get('.phone_error').should('be.visible').contains('The phone field is required.')
        cy.get('.email_error').should('be.visible').contains('The email field is required.')
        cy.get('.card_error').should('be.visible').contains('The card field is required.')
        cy.get('.expired_error').should('be.visible').contains('The expired field is required.')
        cy.get('.cvv_error').should('be.visible').contains('The cvv field is required.')
        cy.get('.zip_error').should('be.visible').contains('The zip field is required.')
    })
})    