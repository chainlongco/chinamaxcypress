/// <reference types="cypress" />

beforeEach('Visit cart', () => {
    cy.visit('http://localhost:8000/menu')
    cy.wait(1000)
    cy.clickDrinks()
    cy.wait(1000)
    cy.clickDrinksPlus('Bottle Water')
    cy.clickDrinksAddToCart('Bottle Water')
    cy.wait(1000)
})

describe('Visit cart, add bottle water, and check in the cart', () => {
    it('Click drinks, click plus button for bottle water, then check all information on the screen', () => {
        cy.get('#cart_count').contains('1')

        const sql = 'select * from products where name = "Bottle Water"'
        cy.task('queryDb', sql)
            .then((result) => {
                // Image
                const sqlDrinks = 'select * from drinks where name = "Bottle Water"'
                cy.task('queryDb', sqlDrinks)
                    .then((resultDrinks) => {
                        cy.get('#orderlist > form > div > div > div:nth-child(1) > img').should('have.attr', 'src','\\images\\' + resultDrinks[0].gallery)
                    })
                
                // Product name and description
                cy.get('#orderlist > form > div > div > div.col-md-6 > h5.pt-2').contains(result[0].name)
                cy.get('#orderlist > form > div > div > div.col-md-6 > h5.pt-2').contains(result[0].description)
                cy.get('#orderlist > form > div > div > div.col-md-6 > h5.pt-1').contains(result[0].price)

                // Quantity of items
                cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-start > h5:nth-child(1)').contains('Price (1 items)')

                // Checkout button
                cy.get('#checkout').contains('Checkout').should('be.enabled')

                const sqlRestaurant = 'select tax_rate from restaurants'
                cy.task('queryDb', sqlRestaurant)
                    .then((resultRestaurant) => {
                        var taxRate = parseFloat(resultRestaurant[0].tax_rate)
                        var price = result[0].price
                        var tax = parseFloat((taxRate * price).toFixed(2))
                        var total = parseFloat((price + tax).toFixed(2))

                        cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-end > h5:nth-child(1)').contains(price)
                        cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-end > h5:nth-child(2)').contains(tax)
                        cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-end > h4').contains(total)
                    })
            })            
    })
    
    it('Click drinks, click plus button for bottle water, then click plus button one more time', () => {
        const sql = 'select * from products where name = "Bottle Water"'
        cy.task('queryDb', sql)
            .then((result) => {
                // 1 is serialNumber in cart
                cy.get('#quantityPlusForCart1AND' + result[0].id).click()
                cy.wait(1000)
                cy.get('#quantityForCart1AND' + result[0].id).should('have.value', 2)

                // cart count should be 2
                cy.get('#cart_count').contains('2')

                // Quantity of items
                cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-start > h5:nth-child(1)').contains('Price (2 items)')

                // Tax and Total
                const sqlRestaurant = 'select tax_rate from restaurants'
                cy.task('queryDb', sqlRestaurant)
                    .then((resultRestaurant) => {
                        var taxRate = parseFloat(resultRestaurant[0].tax_rate)
                        var price = result[0].price * 2
                        var tax = parseFloat((taxRate * price).toFixed(2))
                        var total = parseFloat((price + tax).toFixed(2))

                        cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-end > h5:nth-child(1)').contains(price)
                        cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-end > h5:nth-child(2)').contains(tax)
                        cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-end > h4').contains(total)
                    })
            }) 
    })

    it('Click drinks, click plus button for bottle water, then click plus button one time, then click minus button one time', () => {
        const sql = 'select * from products where name = "Bottle Water"'
        cy.task('queryDb', sql)
            .then((result) => {
                // 1 is serialNumber in cart
                cy.get('#quantityPlusForCart1AND' + result[0].id).click()
                cy.wait(1000)
                cy.get('#quantityForCart1AND' + result[0].id).should('have.value', 2)

                // cart count should be 2
                cy.get('#cart_count').contains('2')

                // 1 is serialNumber in cart
                cy.get('#quantityMinusForCart1AND' + result[0].id).click()
                cy.wait(1000)
                cy.get('#quantityForCart1AND' + result[0].id).should('have.value', 1)

                // cart count should be 1
                cy.get('#cart_count').contains('1')

                // Quantity of items
                cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-start > h5:nth-child(1)').contains('Price (1 items)')

                // Tax and Total
                const sqlRestaurant = 'select tax_rate from restaurants'
                cy.task('queryDb', sqlRestaurant)
                    .then((resultRestaurant) => {
                        var taxRate = parseFloat(resultRestaurant[0].tax_rate)
                        var price = result[0].price
                        var tax = parseFloat((taxRate * price).toFixed(2))
                        var total = parseFloat((price + tax).toFixed(2))

                        cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-end > h5:nth-child(1)').contains(price)
                        cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-end > h5:nth-child(2)').contains(tax)
                        cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-end > h4').contains(total)
                    })
            })  
    })

    it('Click drinks, click plus button for bottle water, then click Remove button', () => {
        const sql = 'select * from products where name = "Bottle Water"'
        cy.task('queryDb', sql)
            .then((result) => {
                // cart count should be 1
                cy.get('#cart_count').contains('1')

                // Quantity of items
                cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-start > h5:nth-child(1)').contains('Price (1 items)')

                // Tax and Total
                const sqlRestaurant = 'select tax_rate from restaurants'
                cy.task('queryDb', sqlRestaurant)
                    .then((resultRestaurant) => {
                        var taxRate = parseFloat(resultRestaurant[0].tax_rate)
                        var price = result[0].price
                        var tax = parseFloat((taxRate * price).toFixed(2))
                        var total = parseFloat((price + tax).toFixed(2))

                        cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-end > h5:nth-child(1)').contains(price)
                        cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-end > h5:nth-child(2)').contains(tax)
                        cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-end > h4').contains(total)
                    })

                // 1 is serialNumber in cart
                cy.get('#remove1AND' + result[0].id).click()
                cy.wait(1000)

                // cart count should be 0
                cy.get('#cart_count').contains('0')

                // Quantity of items
                cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-start > h5:nth-child(1)').contains('Price (0 items)')
                
                cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-end > h5:nth-child(1)').contains('$0.00')
                cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-end > h5:nth-child(2)').contains('$0.00')
                cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-end > h4').contains('$0.00')
            })
    })

    it('Click drinks, click plus button for water, then click Edit button -- change quantity to 3, 2, then click Update button', () => {
        const sql = 'select * from products where name = "Bottle Water"'
        cy.task('queryDb', sql)
            .then((result) => {
                // cart count should be 1
                cy.get('#cart_count').contains('1')

                // Quantity of items
                cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-start > h5:nth-child(1)').contains('Price (1 items)')

                // Click Edit button
                cy.get('#edit1AND' + result[0].id).click()
                cy.wait(1000)

                cy.get('.modal-header').contains('Edit Order')

                cy.get('#updateCart1AND' + result[0].id).should('be.enabled')

                // Change quantity to 3 to 2
                cy.get('#quantityPlusForUpdate' + result[0].id).click()
                cy.wait(1000)
                cy.get('#quantityForUpdate' + result[0].id).should('have.value', 2)

                cy.get('#quantityPlusForUpdate' + result[0].id).click()
                cy.wait(1000)
                cy.get('#quantityForUpdate' + result[0].id).should('have.value', 3)

                cy.get('#quantityMinusForUpdate' + result[0].id).click()
                cy.wait(1000)
                cy.get('#quantityForUpdate' + result[0].id).should('have.value', 2)

                // Click Update button
                cy.get('#updateCart1AND' + result[0].id).click()
                
                // Back to cart and check all values
                cy.get('#quantityForCart1AND' + result[0].id).should('have.value', 2)
                cy.get('#cart_count').contains('2')
                // Tax and Total
                const sqlRestaurant = 'select tax_rate from restaurants'
                cy.task('queryDb', sqlRestaurant)
                    .then((resultRestaurant) => {
                        var taxRate = parseFloat(resultRestaurant[0].tax_rate)
                        var price = result[0].price * 2
                        var tax = parseFloat((taxRate * price).toFixed(2))
                        var total = parseFloat((price + tax).toFixed(2))

                        cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-end > h5:nth-child(1)').contains(price)
                        cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-end > h5:nth-child(2)').contains(tax)
                        cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-end > h4').contains(total)
                    })

                // Image
                const sqlDrinks = 'select * from drinks where name = "Bottle Water"'
                cy.task('queryDb', sqlDrinks)
                    .then((resultDrinks) => {
                        cy.get('#orderlist > form > div > div > div:nth-child(1) > img').should('have.attr', 'src','\\images\\' + resultDrinks[0].gallery)
                    })
                cy.get('#orderlist > form > div > div > div.col-md-6 > h5.pt-2').contains(result[0].name)
                cy.get('#orderlist > form > div > div > div.col-md-6 > h5.pt-2').contains(result[0].description)
                cy.get('#orderlist > form > div > div > div.col-md-6 > h5.pt-1').contains(result[0].price)    
            })
    })

    it('Click drinks, click plus button for bottle water, then click Add More Items to same item', () => {
        cy.get('.addMoreItems').click()
        cy.wait(1000)
        cy.clickDrinks()
        cy.wait(1000)
        cy.clickDrinksPlus('Bottle Water')
        cy.clickDrinksAddToCart('Bottle Water')
        cy.wait(1000)

        const sql = 'select * from products where name = "Bottle Water"'
        cy.task('queryDb', sql)
            .then((result) => {
                // Back to cart and check all values
                cy.get('#quantityForCart1AND' + result[0].id).should('have.value', 2)
                cy.get('#cart_count').contains('2')
                // Tax and Total
                const sqlRestaurant = 'select tax_rate from restaurants'
                cy.task('queryDb', sqlRestaurant)
                    .then((resultRestaurant) => {
                        var taxRate = parseFloat(resultRestaurant[0].tax_rate)
                        var price = result[0].price * 2
                        var tax = parseFloat((taxRate * price).toFixed(2))
                        var total = parseFloat((price + tax).toFixed(2))

                        cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-end > h5:nth-child(1)').contains(price)
                        cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-end > h5:nth-child(2)').contains(tax)
                        cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-end > h4').contains(total)
                    })

                // Image
                const sqlDrinks = 'select * from drinks where name = "Bottle Water"'
                cy.task('queryDb', sqlDrinks)
                    .then((resultDrinks) => {
                        cy.get('#orderlist > form > div > div > div:nth-child(1) > img').should('have.attr', 'src','\\images\\' + resultDrinks[0].gallery)
                    })

                cy.get('#orderlist > form > div > div > div.col-md-6 > h5.pt-2').contains(result[0].name)
                cy.get('#orderlist > form > div > div > div.col-md-6 > h5.pt-2').contains(result[0].description)
                cy.get('#orderlist > form > div > div > div.col-md-6 > h5.pt-1').contains(result[0].price)    
            })
    })

    it('Click drinks, click plus button for bottle water, then click Add More Items to click plus button for canned soft drink with coke', () => {
        cy.get('.addMoreItems').click()
        cy.wait(1000)
        cy.clickDrinks()
        cy.wait(1000)
        cy.clickDrinksPlus('Canned Drink')
        cy.selectCannedDrinkFlavor('Coke')
        cy.clickDrinksAddToCart('Canned Drink')
        cy.wait(1000)

        // Back to cart and check all values
        cy.get('#cart_count').contains('2')

        var priceBottleWater = 0
        var priceCanned = 0
        const sqlBottleWater = 'select * from products where name = "Bottle Water"'
        cy.task('queryDb', sqlBottleWater)
            .then((resultBottleWater) => {       
                priceBottleWater = resultBottleWater[0].price

                cy.get('#quantityForCart1AND' + resultBottleWater[0].id).should('have.value', 1)
                // Image
                const sqlBottleWaterImg = 'select * from drinks where name = "Bottle Water"'
                cy.task('queryDb', sqlBottleWaterImg)
                    .then((resultBottleWaterImg) => {
                        cy.get('#orderlist > form > div > div > div:nth-child(1) > img').should('have.attr', 'src','\\images\\' + resultBottleWaterImg[0].gallery)
                    })
                cy.get('#orderlist > form > div > div > div.col-md-6 > h5.pt-2').contains(resultBottleWater[0].name)
                cy.get('#orderlist > form > div > div > div.col-md-6 > h5.pt-2').contains(resultBottleWater[0].description)
                cy.get('#orderlist > form > div > div > div.col-md-6 > h5.pt-1').contains(resultBottleWater[0].price)
            })

        const sqlCanned = 'select * from products where name = "Canned Soft Drink"'
            cy.task('queryDb', sqlCanned)
                .then((resultCanned) => {
                    priceCanned = resultCanned[0].price
                    cy.get('#quantityForCart2AND' + resultCanned[0].id).should('have.value', 1)
                    // Image
                    const sqlCannedImg = 'select * from drinks where name = "Canned Drink"'
                    cy.task('queryDb', sqlCannedImg)
                        .then((resultCannedImg) => {
                            cy.get('#orderlist > form:nth-child(2) > div > div > div:nth-child(1) > img').should('have.attr', 'src','\\images\\' + resultCannedImg[0].gallery)
                        })
                    cy.get('#orderlist > form > div > div > div.col-md-6 > h5.pt-2').contains(resultCanned[0].name)
                    cy.get('#orderlist > form > div > div > div.col-md-6 > h5.pt-2').contains(resultCanned[0].description)
                    cy.get('#orderlist > form > div > div > div.col-md-6 > h5.pt-1').contains(resultCanned[0].price)
                })
        
        // Tax and Total
        const sqlRestaurant = 'select tax_rate from restaurants'
        cy.task('queryDb', sqlRestaurant)
            .then((resultRestaurant) => {
                var taxRate = parseFloat(resultRestaurant[0].tax_rate)
                var price = priceBottleWater + priceCanned
                var tax = parseFloat((taxRate * price).toFixed(2))
                var total = parseFloat((price + tax).toFixed(2))

                cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-end > h5:nth-child(1)').contains(price)
                cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-end > h5:nth-child(2)').contains(tax)
                cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-end > h4').contains(total)
            })
    })

    it('Click drinks, click plus button for bottle water, then click Empty Cart button, cancel to empty the cart', () => {
        const sql = 'select * from products where name = "Bottle Water"'
        cy.task('queryDb', sql)
            .then((result) => {
                // Back to cart and check all values
                cy.get('#cart_count').contains('1')
                // Tax and Total
                const sqlRestaurant = 'select tax_rate from restaurants'
                cy.task('queryDb', sqlRestaurant)
                    .then((resultRestaurant) => {
                        var taxRate = parseFloat(resultRestaurant[0].tax_rate)
                        var price = result[0].price
                        var tax = parseFloat((taxRate * price).toFixed(2))
                        var total = parseFloat((price + tax).toFixed(2))

                        cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-end > h5:nth-child(1)').contains(price)
                        cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-end > h5:nth-child(2)').contains(tax)
                        cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-end > h4').contains(total)
                    })

                cy.get('#quantityForCart1AND' + result[0].id).should('have.value', 1)    
                // Image
                const sqlDrinks = 'select * from drinks where name = "Bottle Water"'
                cy.task('queryDb', sqlDrinks)
                    .then((resultDrinks) => {
                        cy.get('#orderlist > form > div > div > div:nth-child(1) > img').should('have.attr', 'src','\\images\\' + resultDrinks[0].gallery)
                    })
                cy.get('#orderlist > form > div > div > div.col-md-6 > h5.pt-2').contains(result[0].name)
                cy.get('#orderlist > form > div > div > div.col-md-6 > h5.pt-2').contains(result[0].description)
                cy.get('#orderlist > form > div > div > div.col-md-6 > h5.pt-1').contains(result[0].price)
            })

        // Click Empty Cart button, first cancel and then ok
        cy.get('#emptycart').click()
        cy.on('window:alert', (text) => {
            expect(text).to.contains('Are you sure to empty your cart?')
        })
        cy.on('window:confirm', () => false);
        cy.get('#cart_count').contains('1')
    })

    it('Click drinks, click plus button for bottle water, then click Empty Cart button, ok to empty the cart', () => {
        const sql = 'select * from products where name = "Bottle Water"'
        cy.task('queryDb', sql)
            .then((result) => {
                // Back to cart and check all values
                cy.get('#cart_count').contains('1')
                // Tax and Total
                const sqlRestaurant = 'select tax_rate from restaurants'
                cy.task('queryDb', sqlRestaurant)
                    .then((resultRestaurant) => {
                        var taxRate = parseFloat(resultRestaurant[0].tax_rate)
                        var price = result[0].price
                        var tax = parseFloat((taxRate * price).toFixed(2))
                        var total = parseFloat((price + tax).toFixed(2))

                        cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-end > h5:nth-child(1)').contains(price)
                        cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-end > h5:nth-child(2)').contains(tax)
                        cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-end > h4').contains(total)
                    })

                cy.get('#quantityForCart1AND' + result[0].id).should('have.value', 1)    
                // Image
                const sqlDrinks = 'select * from drinks where name = "Bottle Water"'
                cy.task('queryDb', sqlDrinks)
                    .then((resultDrinks) => {
                        cy.get('#orderlist > form > div > div > div:nth-child(1) > img').should('have.attr', 'src','\\images\\' + resultDrinks[0].gallery)
                    })
                cy.get('#orderlist > form > div > div > div.col-md-6 > h5.pt-2').contains(result[0].name)
                cy.get('#orderlist > form > div > div > div.col-md-6 > h5.pt-2').contains(result[0].description)
                cy.get('#orderlist > form > div > div > div.col-md-6 > h5.pt-1').contains(result[0].price)
            })

        // Click Empty Cart button, first cancel and then ok
        cy.get('#emptycart').click()
        cy.on('window:alert', (text) => {
            expect(text).to.contains('Are you sure to empty your cart?')
        })
        cy.wait(1000)
        cy.get('#cart_count').contains('0')    
    })

    it('Click drinks, click plus button for bottle water, then type "Not too spicy" for note and forgot to click Update Note button, then click Checkout button', () => {
        cy.get('#ordernote').type('No ice')
        cy.get('#checkout').click()
        
        cy.wait(1000)

        cy.url('http://localhost:8000/checkout')
        cy.get('#ordernote').should('not.contain', 'Not ice')
    })

    it('Click drinks, click plus button for bottle water, then type "Not too spicy" for note and click Update Note button, then click Checkout button', () => {
        cy.get('#ordernote').type('No ice')
        cy.get('#updateNote').click()

        cy.wait(1000)

        cy.get('#checkout').click()
        
        cy.wait(1000)

        cy.url('http://localhost:8000/checkout')
        cy.get('#ordernote').contains('No ice')
    })
})