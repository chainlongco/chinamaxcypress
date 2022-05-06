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

describe('Visit checkout, click login button and place order', () => {
    it('Click login and visit checkout and click plac order button', () => {
        cy.get('#cart_count').contains('1')

        // Login as administrator
        cy.LoginAsAdmin()
        
        // Click login customer and place order buttons
        /*cy.get('#customerlogin').click()
        cy.wait(1000)
        cy.url('http://localhost:8000/customerLogin')
        cy.get('#email').type('shyujacky@yahoo.com')
        cy.get('#password').type('1234')
        cy.get('#submitLogin').click()
        cy.wait(1000)*/
        cy.RegisterCustomerChainLong()
        cy.UpdateCustomerChainLong()
        cy.LoginCustomerChainLong()

        cy.visit('http://localhost:8000/checkout')
        cy.wait(1000)
        cy.get('#customerlogin').should('be.disabled')
        cy.get('#customersignup').should('be.disabled')
        cy.get('#placeorder').click()
        cy.wait(2000)

        // Check in order list
        cy.visit('http://localhost:8000/order')
        cy.wait(1000)
        const sqlOrders = 'select * from orders order by id DESC';
        cy.task('queryDb', sqlOrders)
            .then((resultOrders) => {
                const formattedDateTime = cy.chinamax.formatDateTime(resultOrders[0].created_at)
                cy.get('#ordersDatatable_filter > label > input[type=search]').type(formattedDateTime)

                var price = 0
                const sqlProducts = 'select * from products where name = "Regular Platter"'
                cy.task('queryDb', sqlProducts)
                    .then((resultProducts) => {
                        price = resultProducts[0].price
                        cy.get('#ordersDatatable > tbody > tr > td:nth-child(5)').contains("1")      
                        cy.get('#ordersDatatable > tbody > tr > td:nth-child(6)').contains(resultProducts[0].price)

                        const sqlCustomers = 'select * from customers where email = "ChainLongCo@gmail.com"'
                        cy.task('queryDb', sqlCustomers)
                            .then((resultCustomers) => {
                                var phoneNumber = resultCustomers[0].phone;
                                var phoneNumber = phoneNumber.replace(/\D*(\d{3})\D*(\d{3})\D*(\d{4})\D*/, '$1-$2-$3');
                                cy.get('#ordersDatatable > tbody > tr > td:nth-child(1)').contains(resultCustomers[0].first_name)      
                                cy.get('#ordersDatatable > tbody > tr > td:nth-child(2)').contains(resultCustomers[0].last_name)
                                cy.get('#ordersDatatable > tbody > tr > td:nth-child(3)').contains(phoneNumber)      
                                cy.get('#ordersDatatable > tbody > tr > td:nth-child(4)').contains(resultCustomers[0].email)
                            })

                        const sqlRestaurants = 'select tax_rate from restaurants'
                        cy.task('queryDb', sqlRestaurants)
                            .then((resultRestaurants) => {
                                const tax = parseFloat((resultRestaurants[0].tax_rate * price).toFixed(2))
                                cy.get('#ordersDatatable > tbody > tr > td:nth-child(7)').contains(tax)
                                const total = parseFloat(((resultRestaurants[0].tax_rate + 1) * price).toFixed(2))
                                cy.get('#ordersDatatable > tbody > tr > td:nth-child(8)').contains(total)
                            })                
                        //const total = cy.chinamax.calculateTotalWithTax(resultProducts[0].price)
                        cy.get('#ordersDatatable > tbody > tr > td:nth-child(9)').contains(cy.chinamax.formatDateTime(formattedDateTime))
                    })
                
                const sqlDeleteOrders = 'delete from orders where id = ' + resultOrders[0].id
                cy.task('queryDb', sqlDeleteOrders)
                    .then(resultDeleteOrder => {
                        expect(resultDeleteOrder.affectedRows).to.eq(1)
                    })
            })

        cy.LogoutCustomerChainLong()
        cy.DeleteCustomerChainLong()     
    })
})    