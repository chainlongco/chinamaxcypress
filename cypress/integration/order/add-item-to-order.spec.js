/// <reference types="cypress" />

beforeEach('Visit cart', () => {
    // ********************* Note: if this fails, please delete Chain Long customer first. When you delete this customer, it will delete all orders too. Because they have a foreign key ties together ********************
    cy.RetrieveRegularPlatterData()
    cy.RetrieveFriedDumplingData()
    cy.RetrieveRestaurantsData()

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

describe('Visit checkout, click login button and place order and then edit to add another item and check the modification', () => {
    it('After place order, click edit button, add one more appetizer', () => {
        cy.get('#cart_count').contains('1')

        // Login as administrator
        cy.LoginAsAdmin()
        
        // Login for customer
        cy.RegisterCustomerChainLong()
        cy.UpdateCustomerChainLong()
        cy.LoginCustomerChainLong()
        cy.RetrieveCustomersChainLongData()

        cy.visit('http://localhost:8000/checkout')
        cy.wait(1000)
        cy.get('#customerlogin').should('be.disabled')
        cy.get('#customersignup').should('be.disabled')
        cy.get('#placeorder').click()
        cy.wait(2000)

        // Check in order list
        cy.visit('http://localhost:8000/order')
        cy.wait(1000)
        cy.RetrieveLatestCreatedOrdersData()
        cy.wait(1000)
        
        // Find the latest created order record in table
        cy.get('@ordersCreatedAtForCreated').then((ordersCreatedAtForCreated) => {
            cy.get('#ordersDatatable_filter > label > input[type=search]').type(ordersCreatedAtForCreated)
        })
        cy.wait(1000)
        
        cy.get('@customersChainLongFirstName').then((customersChainLongFirstName) => {
            cy.get('#ordersDatatable > tbody > tr > td:nth-child(1)').contains(customersChainLongFirstName)
        })
        cy.get('@customersChainLongLastName').then((customersChainLongLastName) => {
            cy.get('#ordersDatatable > tbody > tr > td:nth-child(2)').contains(customersChainLongLastName)
        })
        cy.get('@customersChainLongPhone').then((customersChainLongPhone) => {
            cy.get('#ordersDatatable > tbody > tr > td:nth-child(3)').contains(customersChainLongPhone)
        })
        cy.get('@customersChainLongEmail').then((customersChainLongEmail) => {
            cy.get('#ordersDatatable > tbody > tr > td:nth-child(4)').contains(customersChainLongEmail)
        })
        cy.get('@ordersQuantityForCreated').then((ordersQuantityForCreated) => {
            cy.get('#ordersDatatable > tbody > tr > td:nth-child(5)').contains(ordersQuantityForCreated)
        })
        cy.get('@ordersTotalForCreated').then((ordersTotalForCreated) => {
            cy.get('#ordersDatatable > tbody > tr > td:nth-child(6)').contains(ordersTotalForCreated)
        })
        cy.get('@restaurantsTaxRate').then((restaurantsTaxRate) => {
            cy.get('@regularPlatterPrice').then((regularPlatterPrice) => {
                const tax = cy.chinamax.calculateTax(regularPlatterPrice, restaurantsTaxRate)
                cy.get('#ordersDatatable > tbody > tr > td:nth-child(7)').contains(tax)
                const total = cy.chinamax.calculateTotalWithTax(regularPlatterPrice, restaurantsTaxRate)
                cy.get('#ordersDatatable > tbody > tr > td:nth-child(8)').contains(total)
            })
        })
        cy.get('@ordersCreatedAtForCreated').then((ordersCreatedAtForCreated) => {
            cy.get('#ordersDatatable > tbody > tr > td:nth-child(9)').contains(ordersCreatedAtForCreated)
        })

        // Click Edit button and then add one appetizer to existing order
        cy.get('#ordersDatatable > tbody > tr > td:nth-child(11) > div > a.col-md-5.btn.btn-primary').click()
        cy.wait(1000)
        cy.get('#cartTitle').contains('My Cart (From Order History)')
        cy.get('.addMoreItems').click()
        cy.url('http://localhost:8000/menu')
        cy.clickAppetizers()
        cy.clickAppetizersPlus('Fried Dumpling (5)')
        cy.clickAppetizersAddToCart('Fried Dumpling (5)')
        cy.wait(1000)
        cy.url('http://localhost:8000/cart')

        // Check items in cart page
        // Regular Platter    
        cy.get('@regularPlatterGallery').then((regularPlatterGallery) => {
            cy.get('#orderlist > form:nth-child(1) > div > div > div:nth-child(1) > img').should('have.attr', 'src','\\images\\' + regularPlatterGallery)
        })
        cy.get('@regularPlatterName').then((regularPlatterName) => {
            cy.get('@regularPlatterDescription').then((regularPlatterDescription) => {
                cy.get('#orderlist > form:nth-child(1) > div > div > div.col-md-6 > h5.pt-2').contains(regularPlatterName + ' : ' + regularPlatterDescription)
            })
        })
        cy.get('#orderlist > form:nth-child(1) > div > div > div.col-md-6 > h5:nth-child(2) > small').contains('Side: Fried Rice(1) Entree: BBQ Chicken(1) Black Pepper Chicken(1)')
        cy.get('@regularPlatterPrice').then((regularPlatterPrice) => {
            cy.get('#orderlist > form:nth-child(1) > div > div > div.col-md-6 > h5.pt-1').contains('$' + regularPlatterPrice)
        })                       
        cy.get('@regularPlatterId').then((regularPlatterId) => {
            cy.get('#quantityForCart1AND' + regularPlatterId).should('have.value', 1)
        })
        // Fried Dumpling
        cy.get('@friedDumplingGallery').then((friedDumplingGallery) => {
            cy.get('#orderlist > form:nth-child(2) > div > div > div:nth-child(1) > img').should('have.attr', 'src','\\images\\' + friedDumplingGallery)
        })
        cy.get('@friedDumplingName').then((friedDumplingName) => {
            cy.get('@friedDumplingDescription').then((friedDumplingDescription) => {
                cy.get('#orderlist > form:nth-child(2) > div > div > div.col-md-6 > h5.pt-2').contains(friedDumplingName + ' : ' + friedDumplingDescription)
            })
        })
        cy.get('@friedDumplingPrice').then((friedDumplingPrice) => {
            cy.get('#orderlist > form:nth-child(2) > div > div > div.col-md-6 > h5.pt-1').contains('$' + friedDumplingPrice)
        })                       
        cy.get('@friedDumplingId').then((friedDumplingId) => {
            cy.get('#quantityForCart2AND' + friedDumplingId).should('have.value', 1)
        })
        // Price
        cy.get('@restaurantsTaxRate').then((restaurantsTaxRate) => {
            cy.get('@regularPlatterPrice').then((regularPlatterPrice) => {
                cy.get('@friedDumplingPrice').then((friedDumplingPrice) => {
                    const totalPrice = cy.chinamax.calculateSum(regularPlatterPrice, friedDumplingPrice)
                    cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-end > h5:nth-child(1)').contains('$' + totalPrice)
                    cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-end > h5:nth-child(2)').contains('$' + cy.chinamax.calculateTax(totalPrice, restaurantsTaxRate))
                    cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-end > h4').contains('$' + cy.chinamax.calculateTotalWithTax(totalPrice, restaurantsTaxRate))

                })        
            })
        })    
        
        cy.get('#checkout').click()
        cy.wait(1000)

        // Check items in checkout page
        // Left hand side information
        cy.get('#checkoutTitle').contains('Checkout (From Order History)')
        cy.get('#customerlogin').should('be.disabled')
        cy.get('#customersignup').should('be.disabled')
        // Customer Information
        cy.get('#firstname').should('have.value', 'Chain')
        cy.get('#lastname').should('have.value', 'Long')
        cy.get('#phone').should('have.value', '214-680-8281')
        cy.get('#email').should('have.value', 'ChainLongCo@gmail.com')
        // Credit Card Information
        cy.get('#card').should('have.value', '1234-5678-9012-3456')
        cy.get('#expired').should('have.value', '12/26')
        cy.get('#cvv').should('have.value', '123')
        cy.get('#zip').should('have.value', '75115')
        // Right hand side information
        // Regular Platter    
        cy.get('@regularPlatterGallery').then((regularPlatterGallery) => {
            cy.get('#orderlist > div:nth-child(1) > div > div.col-md-3 > img').should('have.attr', 'src', '\\images\\' + regularPlatterGallery)
        })
        cy.get('@regularPlatterName').then((regularPlatterName) => {
            cy.get('@regularPlatterDescription').then((regularPlatterDescription) => {
                cy.get('#orderlist > div:nth-child(1) > div > div.col-md-9 > h5.pt-2').contains(regularPlatterName + ' : ' + regularPlatterDescription)
            })
        })
        cy.get('#orderlist > div:nth-child(1) > div > div.col-md-9 > h5:nth-child(2) > small').contains('Side: Fried Rice(1) Entree: BBQ Chicken(1) Black Pepper Chicken(1)')
        cy.get('@regularPlatterPrice').then((regularPlatterPrice) => {
            cy.get('#orderlist > div:nth-child(1) > div > div.col-md-9 > h5.pt-1').contains('$' + regularPlatterPrice + ' -- 1 item' )
        })
        // Fried Dumpling
        cy.get('@friedDumplingGallery').then((friedDumplingGallery) => {
            cy.get('#orderlist > div:nth-child(3) > div > div.col-md-3 > img').should('have.attr', 'src','\\images\\' + friedDumplingGallery)
        })
        cy.get('@friedDumplingName').then((friedDumplingName) => {
            cy.get('@friedDumplingDescription').then((friedDumplingDescription) => {
                cy.get('#orderlist > div:nth-child(3) > div > div.col-md-9 > h5.pt-2').contains(friedDumplingName + ' : ' + friedDumplingDescription)
            })
        })
        cy.get('@friedDumplingPrice').then((friedDumplingPrice) => {
            cy.get('#orderlist > div:nth-child(3) > div > div.col-md-9 > h5.pt-1').contains('$' + friedDumplingPrice + ' -- 1 item')
        })
        // Price
        cy.get('@restaurantsTaxRate').then((restaurantsTaxRate) => {
            cy.get('@regularPlatterPrice').then((regularPlatterPrice) => {
                cy.get('@friedDumplingPrice').then((friedDumplingPrice) => {
                    const totalPrice = cy.chinamax.calculateSum(regularPlatterPrice, friedDumplingPrice)
                    cy.get('#pricedetail > div > div.col-md-6.text-end > h5:nth-child(1)').contains('$' + totalPrice)
                    cy.get('#pricedetail > div > div.col-md-6.text-end > h5:nth-child(2)').contains('$' + cy.chinamax.calculateTax(totalPrice, restaurantsTaxRate))
                    cy.get('#pricedetail > div > div.col-md-6.text-end > h4').contains('$' + cy.chinamax.calculateTotalWithTax(totalPrice, restaurantsTaxRate))
                })
            })
        })
       
        // Click place order button
        cy.get('#placeorder').click()
        cy.wait(1000)
        cy.url('http://localhost:8000/order')
        cy.RetrieveLatestUpdatedOrdersData()
        // Find the latest created order record in table
        cy.get('@ordersUpdatedAtForUpdated').then((ordersUpdatedAtForUpdated) => {
            cy.get('@ordersCreatedAtForCreated').then((ordersCreatedAtForCreated) => {
                cy.get('#ordersDatatable_filter > label > input[type=search]').type(ordersUpdatedAtForUpdated)
                cy.get('#ordersDatatable > tbody > tr > td:nth-child(9)').contains(ordersCreatedAtForCreated)
                cy.get('#ordersDatatable > tbody > tr > td:nth-child(10)').contains(ordersUpdatedAtForUpdated)
            })
        })
        cy.wait(1000)
        
        // Delete chain long customer also will delete all the orders tie to it due to the foreign key
        cy.LogoutCustomerChainLong()
        cy.DeleteCustomerChainLong()

    })
})