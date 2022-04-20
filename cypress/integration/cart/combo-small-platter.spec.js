/// <reference types="cypress" />

beforeEach('Visit cart', () => {
    cy.visit('http://localhost:8000/cart')
})

describe('Visit cart, add small platter, and check in the cart', () => {
    it('Click small platter, choose fried rice and BBQ chicken, then check all information on the screen', () => {
        cy.visit('http://localhost:8000/menu')
        cy.wait(1000)
        cy.clickSmallPlatter()
        cy.wait(1000)
        cy.clickFriedRice()
        cy.clickBBQChicken()
        cy.clickComboAddToCart('Small Platter')

        cy.wait(1000)

        cy.get('#cart_count').contains('1')

        const sql = 'select * from products where name = "Small Platter"'
        cy.task('queryDb', sql)
            .then((result) => {
                // Image
                cy.get('#orderlist > form > div > div > div:nth-child(1) > img').should('have.attr', 'src','\\images\\' + result[0].gallery)
                // Product name and description
                cy.get('#orderlist > form > div > div > div.col-md-6 > h5.pt-2').contains(result[0].name)
                cy.get('#orderlist > form > div > div > div.col-md-6 > h5.pt-2').contains(result[0].description)
                cy.get('#orderlist > form > div > div > div.col-md-6 > h5:nth-child(2) > small').contains('Side: Fried Rice(1) Entree: BBQ Chicken(1)')
                cy.get('#orderlist > form > div > div > div.col-md-6 > h5.pt-1').contains(result[0].price)

                // Quantity of items
                cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-start > h5:nth-child(1)').contains('Price (1 items)')

                // Checkout button
                cy.get('#checkout').contains('Checkout').should('be.enabled')

                // Tax and Total -- Previous way is to add hidden field in UI to store taxRate. Now, get taxRate from restaurants table
                /*cy.get('#taxRate').invoke('text').then((textTaxRate) => {
                    var taxRate = parseFloat(textTaxRate)
                    var price = result[0].price
                    expect(taxRate).to.eq(0.0825)
                    expect(price).to.eq(6.40)
                    var tax = parseFloat((taxRate * price).toFixed(2))
                    expect(tax).to.eq(0.53)
                    var total = parseFloat((price + tax).toFixed(2))

                    cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-end > h5:nth-child(1)').contains(price)
                    cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-end > h5:nth-child(2)').contains(tax)
                    cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-end > h4').contains(total)
                });*/
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
    
    it('Click small platter, choose fried rice and BBQ chicken, then click plus button one time', () => {
        cy.visit('http://localhost:8000/menu')
        cy.wait(1000)
        cy.clickSmallPlatter()
        cy.wait(1000)
        cy.clickFriedRice()
        cy.clickBBQChicken()
        cy.clickComboAddToCart('Small Platter')

        cy.wait(1000)

        const sql = 'select * from products where name = "Small Platter"'
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

    it('Click small platter, choose fried rice and BBQ chicken, then click plus button one time, then click minus button one time', () => {
        cy.visit('http://localhost:8000/menu')
        cy.wait(1000)
        cy.clickSmallPlatter()
        cy.wait(1000)
        cy.clickFriedRice()
        cy.clickBBQChicken()
        cy.clickComboAddToCart('Small Platter')

        cy.wait(1000)

        const sql = 'select * from products where name = "Small Platter"'
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

    it('Click small platter, choose fried rice and BBQ chicken, then click Remove button', () => {
        cy.visit('http://localhost:8000/menu')
        cy.wait(1000)
        cy.clickSmallPlatter()
        cy.wait(1000)
        cy.clickFriedRice()
        cy.clickBBQChicken()
        cy.clickComboAddToCart('Small Platter')

        cy.wait(1000)

        const sql = 'select * from products where name = "Small Platter"'
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

    it('Click small platter, choose fried rice and BBQ chicken, then click Edit button -- change quantity to 3, 2, then change to Fried Rice(half), Chow Mein(half), Black Pepper Chicken, then click Update button', () => {
        cy.visit('http://localhost:8000/menu')
        cy.wait(1000)
        cy.clickSmallPlatter()
        cy.wait(1000)
        cy.clickFriedRice()
        cy.clickBBQChicken()
        cy.clickComboAddToCart('Small Platter')

        cy.wait(1000)

        const sql = 'select * from products where name = "Small Platter"'
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

                const sqlSideFriedRice = 'select id from sides where name = "Fried Rice"'
                var sideFriedRiceId = 0
                cy.task('queryDb', sqlSideFriedRice)
                    .then((resultSideFriedRice) => {
                        sideFriedRiceId = resultSideFriedRice[0].id
                        cy.get('#choiceItemSide' + resultSideFriedRice[0].id).should('have.css', 'border', '5px solid rgb(255, 0, 0)')
                        cy.get('#sideSelected' + resultSideFriedRice[0].id).contains('One Selected')
                    })

                const sqlEntreeBBQChicken = 'select id from entrees where name = "BBQ Chicken"'
                var entreeBBQChickenId = 0
                cy.task('queryDb', sqlEntreeBBQChicken)
                    .then((resultEntreeBBQChicken) => {
                        entreeBBQChickenId = resultEntreeBBQChicken[0].id
                        cy.get('#choiceItemEntree' + resultEntreeBBQChicken[0].id).should('have.css', 'border', '5px solid rgb(255, 0, 0)')
                        cy.get('#entreeSelected' + resultEntreeBBQChicken[0].id).contains('One Selected')
                    })

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

                // Click Chow Mein to half, Steam White Rice grayout
                const sqlSideChowMein = 'select id from sides where name = "Chow Mein"'
                cy.task('queryDb', sqlSideChowMein)
                    .then((resultSideChowMein) => {
                        cy.get('#choiceItemSide' + resultSideChowMein[0].id).click()
                        cy.wait(1000)
                        cy.get('#choiceItemSide' + resultSideChowMein[0].id).should('have.css', 'border', '5px solid rgb(255, 0, 0)')
                        cy.get('#sideSelected' + resultSideChowMein[0].id).contains('Half Selected')
                        cy.get('#choiceItemSide' + sideFriedRiceId).should('have.css', 'border', '5px solid rgb(255, 0, 0)')
                        cy.get('#sideSelected' + sideFriedRiceId).contains('Half Selected')
                    })
                const sqlSideSteamWhiteRice = 'select id from sides where name = "Steam White Rice"'
                cy.task('queryDb', sqlSideSteamWhiteRice)
                    .then((resultSideSteamWhiteRice) => {
                        cy.get('#choiceItemSide' + resultSideSteamWhiteRice[0].id).should('have.css', 'background-color', 'rgb(211, 211, 211)')
                    })

                // Click Black Pepper Chicken
                const sqlEntreeBlackPepperChicken = 'select id from entrees where name ="Black Pepper Chicken"'
                cy.task('queryDb', sqlEntreeBlackPepperChicken)
                    .then((resultEntreeBlackPepperChicken) => {
                        cy.get('#choiceItemEntree' + resultEntreeBlackPepperChicken[0].id).click()
                        cy.wait(1000)
                        cy.get('#choiceItemEntree' + resultEntreeBlackPepperChicken[0].id).should('have.css', 'border', '5px solid rgb(255, 0, 0)')
                        cy.get('#choiceItemEntree' + entreeBBQChickenId).should('have.css', 'border', '3px solid rgb(211, 211, 211)')
                    })

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

                cy.get('#orderlist > form > div > div > div:nth-child(1) > img').should('have.attr', 'src','\\images\\' + result[0].gallery)
                cy.get('#orderlist > form > div > div > div.col-md-6 > h5.pt-2').contains(result[0].name)
                cy.get('#orderlist > form > div > div > div.col-md-6 > h5.pt-2').contains(result[0].description)
                cy.get('#orderlist > form > div > div > div.col-md-6 > h5:nth-child(2) > small').contains('Side: Fried Rice(1/2) Chow Mein(1/2) Entree: Black Pepper Chicken(1)')
                cy.get('#orderlist > form > div > div > div.col-md-6 > h5.pt-1').contains(result[0].price)    
            })
    })

    it('Click small platter, choose fried rice and BBQ chicken, then click Add More Items to same item and subItems', () => {
        cy.visit('http://localhost:8000/menu')
        cy.wait(1000)
        cy.clickSmallPlatter()
        cy.wait(1000)
        cy.clickFriedRice()
        cy.clickBBQChicken()
        cy.clickComboAddToCart('Small Platter')

        cy.get('.addMoreItems').click()
        cy.wait(1000)
        cy.clickSmallPlatter()
        cy.wait(1000)
        cy.clickFriedRice()
        cy.clickBBQChicken()
        cy.clickComboAddToCart('Small Platter')

        const sql = 'select * from products where name = "Small Platter"'
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

                cy.get('#orderlist > form > div > div > div:nth-child(1) > img').should('have.attr', 'src','\\images\\' + result[0].gallery)
                cy.get('#orderlist > form > div > div > div.col-md-6 > h5.pt-2').contains(result[0].name)
                cy.get('#orderlist > form > div > div > div.col-md-6 > h5.pt-2').contains(result[0].description)
                cy.get('#orderlist > form > div > div > div.col-md-6 > h5:nth-child(2) > small').contains('Side: Fried Rice(1) Entree: BBQ Chicken(1)')
                cy.get('#orderlist > form > div > div > div.col-md-6 > h5.pt-1').contains(result[0].price)    
            })
    })

    it('Click small platter, choose fried rice and BBQ chicken, then click Add More Items to same item and but different subItems', () => {
        cy.visit('http://localhost:8000/menu')
        cy.wait(1000)
        cy.clickSmallPlatter()
        cy.wait(1000)
        cy.clickFriedRice()
        cy.clickBBQChicken()
        cy.clickComboAddToCart('Small Platter')

        cy.get('.addMoreItems').click()
        cy.wait(1000)
        cy.clickSmallPlatter()
        cy.wait(1000)
        cy.clickFriedRice()
        cy.clickBlackPepperChicken()
        cy.clickComboAddToCart('Small Platter')

        cy.wait(1000)

        const sql = 'select * from products where name = "Small Platter"'
        cy.task('queryDb', sql)
            .then((result) => {
                // Back to cart and check all values
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

                cy.get('#quantityForCart1AND' + result[0].id).should('have.value', 1)    
                cy.get('#orderlist > form > div > div > div:nth-child(1) > img').should('have.attr', 'src','\\images\\' + result[0].gallery)
                cy.get('#orderlist > form > div > div > div.col-md-6 > h5.pt-2').contains(result[0].name)
                cy.get('#orderlist > form > div > div > div.col-md-6 > h5.pt-2').contains(result[0].description)
                cy.get('#orderlist > form > div > div > div.col-md-6 > h5:nth-child(2) > small').contains('Side: Fried Rice(1) Entree: BBQ Chicken(1)')
                cy.get('#orderlist > form > div > div > div.col-md-6 > h5.pt-1').contains(result[0].price)

                cy.get('#quantityForCart2AND' + result[0].id).should('have.value', 1)
                cy.get('#orderlist > form:nth-child(2) > div > div > div:nth-child(1) > img').should('have.attr', 'src','\\images\\' + result[0].gallery)
                cy.get('#orderlist > form > div > div > div.col-md-6 > h5.pt-2').contains(result[0].name)
                cy.get('#orderlist > form > div > div > div.col-md-6 > h5.pt-2').contains(result[0].description)
                cy.get('#orderlist > form > div > div > div.col-md-6 > h5:nth-child(2) > small').contains('Side: Fried Rice(1) Entree: Black Pepper Chicken(1)')
                cy.get('#orderlist > form > div > div > div.col-md-6 > h5.pt-1').contains(result[0].price)
            })
    })

    it('Click small platter, choose fried rice and BBQ chicken, then click Empty Cart button, cancel to empty the cart', () => {
        cy.visit('http://localhost:8000/menu')
        cy.wait(1000)
        cy.clickSmallPlatter()
        cy.wait(1000)
        cy.clickFriedRice()
        cy.clickBBQChicken()
        cy.clickComboAddToCart('Small Platter')

        cy.wait(1000)

        const sql = 'select * from products where name = "Small Platter"'
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
                cy.get('#orderlist > form > div > div > div:nth-child(1) > img').should('have.attr', 'src','\\images\\' + result[0].gallery)
                cy.get('#orderlist > form > div > div > div.col-md-6 > h5.pt-2').contains(result[0].name)
                cy.get('#orderlist > form > div > div > div.col-md-6 > h5.pt-2').contains(result[0].description)
                cy.get('#orderlist > form > div > div > div.col-md-6 > h5:nth-child(2) > small').contains('Side: Fried Rice(1) Entree: BBQ Chicken(1)')
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

    it('Click small platter, choose fried rice and BBQ chicken, then click Empty Cart button, ok to empty the cart', () => {
        cy.visit('http://localhost:8000/menu')
        cy.wait(1000)
        cy.clickSmallPlatter()
        cy.wait(1000)
        cy.clickFriedRice()
        cy.clickBBQChicken()
        cy.clickComboAddToCart('Small Platter')

        cy.wait(1000)

        const sql = 'select * from products where name = "Small Platter"'
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
                cy.get('#orderlist > form > div > div > div:nth-child(1) > img').should('have.attr', 'src','\\images\\' + result[0].gallery)
                cy.get('#orderlist > form > div > div > div.col-md-6 > h5.pt-2').contains(result[0].name)
                cy.get('#orderlist > form > div > div > div.col-md-6 > h5.pt-2').contains(result[0].description)
                cy.get('#orderlist > form > div > div > div.col-md-6 > h5:nth-child(2) > small').contains('Side: Fried Rice(1) Entree: BBQ Chicken(1)')
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

    it('Click small platter, choose fried rice and BBQ chicken, then type "Not too spicy" for note and forgot to click Update Note button, then click Checkout button', () => {
        cy.visit('http://localhost:8000/menu')
        cy.wait(1000)
        cy.clickSmallPlatter()
        cy.wait(1000)
        cy.clickFriedRice()
        cy.clickBBQChicken()
        cy.clickComboAddToCart('Small Platter')

        cy.wait(1000)

        cy.get('#ordernote').type('Not too spicy')
        cy.get('#checkout').click()
        
        cy.wait(1000)

        cy.url('http://localhost:8000/checkout')
        cy.get('#ordernote').should('not.contain', 'Not too spicy')
    })

    it.only('Click small platter, choose fried rice and BBQ chicken, then type "Not too spicy" for note and click Update Note button, then click Checkout button', () => {
        cy.visit('http://localhost:8000/menu')
        cy.wait(1000)
        cy.clickSmallPlatter()
        cy.wait(1000)
        cy.clickFriedRice()
        cy.clickBBQChicken()
        cy.clickComboAddToCart('Small Platter')

        cy.wait(1000)

        cy.get('#ordernote').type('Not too spicy')
        cy.get('#updateNote').click()

        cy.wait(1000)

        cy.get('#checkout').click()
        
        cy.wait(1000)

        cy.url('http://localhost:8000/checkout')
        cy.get('#ordernote').contains('Not too spicy')
    })

    
})