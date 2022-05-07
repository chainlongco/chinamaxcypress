/// <reference types="cypress" />

beforeEach('Visit cart', () => {
    cy.RetrieveCrabRangoonData()
    cy.RetrieveRestaurantsData()

    cy.visit('http://localhost:8000/menu')
    cy.wait(1000)
    cy.clickAppetizers()
    cy.wait(1000)
    cy.clickAppetizersPlus('Crab Rangoon (6)')
    cy.clickAppetizersAddToCart('Crab Rangoon (6)')
    cy.wait(1000)
})

describe('Visit cart, add crab rangoon, and check in the cart', () => {
    it('Click appetizers, click plus button for crab rangoon, then check all information on the screen', () => {
        cy.get('#cart_count').contains('1')

        // Image
        cy.get('@crabRangoonGallery').then((crabRangoonGallery) => {
            cy.get('#orderlist > form > div > div > div:nth-child(1) > img').should('have.attr', 'src','\\images\\' + crabRangoonGallery)
        })
        // Product name and description
        cy.get('@crabRangoonName').then((crabRangoonName) => {
            cy.get('#orderlist > form > div > div > div.col-md-6 > h5.pt-2').contains(crabRangoonName)
        })
        cy.get('@crabRangoonDescription').then((crabRangoonDescription) => {
            cy.get('#orderlist > form > div > div > div.col-md-6 > h5.pt-2').contains(crabRangoonDescription)
        })
        cy.get('@crabRangoonPrice').then((crabRangoonPrice) => {
            cy.get('#orderlist > form > div > div > div.col-md-6 > h5.pt-1').contains(crabRangoonPrice)
            
            cy.get('@restaurantsTaxRate').then((restaurantsTaxRate) => {
                cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-end > h5:nth-child(1)').contains(crabRangoonPrice)
                cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-end > h5:nth-child(2)').contains(cy.chinamax.calculateTax(crabRangoonPrice, restaurantsTaxRate))
                cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-end > h4').contains(cy.chinamax.calculateTotalWithTax(crabRangoonPrice, restaurantsTaxRate))
            })
        })

        // Quantity of items
        cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-start > h5:nth-child(1)').contains('Price (1 items)')

        // Checkout button
        cy.get('#checkout').contains('Checkout').should('be.enabled')
    })
    
    it('Click appetizers, click plus button for crab rangoon, then click plus button one more time', () => {
        cy.get('@crabRangoonId').then((crabRangoonId) => {
            // 1 is serialNumber in cart
            cy.get('#quantityPlusForCart1AND' + crabRangoonId).click()
            cy.wait(1000)
            cy.get('#quantityForCart1AND' + crabRangoonId).should('have.value', 2)
        })
        
        // cart count should be 2
        cy.get('#cart_count').contains('2')

        // Quantity of items
        cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-start > h5:nth-child(1)').contains('Price (2 items)')

        // Tax and Total
        cy.get('@crabRangoonPrice').then((crabRangoonPrice) => {
            cy.get('@restaurantsTaxRate').then((restaurantsTaxRate) => {
                const totalPrice = cy.chinamax.calculateProduct(crabRangoonPrice, 2)
                cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-end > h5:nth-child(1)').contains(totalPrice)
                cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-end > h5:nth-child(2)').contains(cy.chinamax.calculateTax(totalPrice, restaurantsTaxRate))
                cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-end > h4').contains(cy.chinamax.calculateTotalWithTax(totalPrice, restaurantsTaxRate))
            })
        })
    })

    it('Click appetizers, click plus button for crab rangoon, then click plus button one time, then click minus button one time', () => {
        cy.get('@crabRangoonId').then((crabRangoonId) => {
            // 1 is serialNumber in cart
            cy.get('#quantityPlusForCart1AND' + crabRangoonId).click()
            cy.wait(1000)
            cy.get('#quantityForCart1AND' + crabRangoonId).should('have.value', 2)
        
            // cart count should be 2
            cy.get('#cart_count').contains('2')

            // 1 is serialNumber in cart
            cy.get('#quantityMinusForCart1AND' + crabRangoonId).click()
            cy.wait(1000)
            cy.get('#quantityForCart1AND' + crabRangoonId).should('have.value', 1)

            // cart count should be 1
            cy.get('#cart_count').contains('1')
        })

        // Quantity of items
        cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-start > h5:nth-child(1)').contains('Price (1 items)')

        // Tax and Total
        cy.get('@crabRangoonPrice').then((crabRangoonPrice) => {
            cy.get('@restaurantsTaxRate').then((restaurantsTaxRate) => {
                cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-end > h5:nth-child(1)').contains(crabRangoonPrice)
                cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-end > h5:nth-child(2)').contains(cy.chinamax.calculateTax(crabRangoonPrice, restaurantsTaxRate))
                cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-end > h4').contains(cy.chinamax.calculateTotalWithTax(crabRangoonPrice, restaurantsTaxRate))
            })
        })
    })

    it('Click appetizers, click plus button for crab rangoon, then click Remove button', () => {
        // cart count should be 1
        cy.get('#cart_count').contains('1')

        // Quantity of items
        cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-start > h5:nth-child(1)').contains('Price (1 items)')

        // Tax and Total
        cy.get('@crabRangoonPrice').then((crabRangoonPrice) => {
            cy.get('@restaurantsTaxRate').then((restaurantsTaxRate) => {
                cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-end > h5:nth-child(1)').contains(crabRangoonPrice)
                cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-end > h5:nth-child(2)').contains(cy.chinamax.calculateTax(crabRangoonPrice, restaurantsTaxRate))
                cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-end > h4').contains(cy.chinamax.calculateTotalWithTax(crabRangoonPrice, restaurantsTaxRate))
            })
        })

        cy.get('@crabRangoonId').then((crabRangoonId) => {
            // 1 is serialNumber in cart
            cy.get('#remove1AND' + crabRangoonId).click()
        })
        cy.wait(1000)

        // cart count should be 0
        cy.get('#cart_count').contains('0')

        // Quantity of items
        cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-start > h5:nth-child(1)').contains('Price (0 items)')
        
        cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-end > h5:nth-child(1)').contains('$0.00')
        cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-end > h5:nth-child(2)').contains('$0.00')
        cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-end > h4').contains('$0.00')
    })

    it('Click appetizers, click plus button for crab rangoon, then click Edit button -- change quantity to 3, 2, then click Update button', () => {
        // cart count should be 1
        cy.get('#cart_count').contains('1')

        // Quantity of items
        cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-start > h5:nth-child(1)').contains('Price (1 items)')

        // Click Edit button
        cy.get('@crabRangoonId').then((crabRangoonId) => {
            cy.get('#edit1AND' + crabRangoonId).click()
            cy.wait(1000)

            cy.get('.modal-header').contains('Edit Order')

            cy.get('#updateCart1AND' + crabRangoonId).should('be.enabled')

            // Change quantity to 3 to 2
            cy.get('#quantityPlusForUpdate' + crabRangoonId).click()
            cy.wait(1000)
            cy.get('#quantityForUpdate' + crabRangoonId).should('have.value', 2)

            cy.get('#quantityPlusForUpdate' + crabRangoonId).click()
            cy.wait(1000)
            cy.get('#quantityForUpdate' + crabRangoonId).should('have.value', 3)

            cy.get('#quantityMinusForUpdate' + crabRangoonId).click()
            cy.wait(1000)
            cy.get('#quantityForUpdate' + crabRangoonId).should('have.value', 2)

            // Click Update button
            cy.get('#updateCart1AND' + crabRangoonId).click()
            
            // Back to cart and check all values
            cy.get('#quantityForCart1AND' + crabRangoonId).should('have.value', 2)
            cy.get('#cart_count').contains('2')
        })
                
        // Tax and Total
        cy.get('@crabRangoonPrice').then((crabRangoonPrice) => {
            cy.get('@restaurantsTaxRate').then((restaurantsTaxRate) => {
                const totalPrice = cy.chinamax.calculateProduct(crabRangoonPrice, 2)
                cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-end > h5:nth-child(1)').contains(totalPrice)
                cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-end > h5:nth-child(2)').contains(cy.chinamax.calculateTax(totalPrice, restaurantsTaxRate))
                cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-end > h4').contains(cy.chinamax.calculateTotalWithTax(totalPrice, restaurantsTaxRate))
            })
        })

        cy.get('@crabRangoonGallery').then((crabRangoonGallery) => {
            cy.get('#orderlist > form > div > div > div:nth-child(1) > img').should('have.attr', 'src','\\images\\' + crabRangoonGallery)
        })
        cy.get('@crabRangoonName').then((crabRangoonName) => {
            cy.get('#orderlist > form > div > div > div.col-md-6 > h5.pt-2').contains(crabRangoonName)
        })
        cy.get('@crabRangoonDescription').then((crabRangoonDescription) => {
            cy.get('#orderlist > form > div > div > div.col-md-6 > h5.pt-2').contains(crabRangoonDescription)
        })
        cy.get('@crabRangoonPrice').then((crabRangoonPrice) => {
            cy.get('#orderlist > form > div > div > div.col-md-6 > h5.pt-1').contains(crabRangoonPrice)
        })    
    })

    it('Click appetizers, click plus button for crab rangoon, then click Add More Items to same item', () => {
        cy.get('.addMoreItems').click()
        cy.wait(1000)
        cy.clickAppetizers()
        cy.wait(1000)
        cy.clickAppetizersPlus('Crab Rangoon (6)')
        cy.clickAppetizersAddToCart('Crab Rangoon (6)')
        cy.wait(1000)

        // Back to cart and check all values
        cy.get('@crabRangoonId').then((crabRangoonId) => {
            cy.get('#quantityForCart1AND' + crabRangoonId).should('have.value', 2)
        })
        cy.get('#cart_count').contains('2')
        // Tax and Total
        cy.get('@crabRangoonPrice').then((crabRangoonPrice) => {
            cy.get('@restaurantsTaxRate').then((restaurantsTaxRate) => {
                const totalPrice = cy.chinamax.calculateProduct(crabRangoonPrice, 2)
                cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-end > h5:nth-child(1)').contains(totalPrice)
                cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-end > h5:nth-child(2)').contains(cy.chinamax.calculateTax(totalPrice, restaurantsTaxRate))
                cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-end > h4').contains(cy.chinamax.calculateTotalWithTax(totalPrice, restaurantsTaxRate))
            })
        })

        cy.get('@crabRangoonGallery').then((crabRangoonGallery) => {
            cy.get('#orderlist > form > div > div > div:nth-child(1) > img').should('have.attr', 'src','\\images\\' + crabRangoonGallery)
        })
        cy.get('@crabRangoonName').then((crabRangoonName) => {
            cy.get('#orderlist > form > div > div > div.col-md-6 > h5.pt-2').contains(crabRangoonName)
        })
        cy.get('@crabRangoonDescription').then((crabRangoonDescription) => {
            cy.get('#orderlist > form > div > div > div.col-md-6 > h5.pt-2').contains(crabRangoonDescription)
        })
        cy.get('@crabRangoonPrice').then((crabRangoonPrice) => {
            cy.get('#orderlist > form > div > div > div.col-md-6 > h5.pt-1').contains(crabRangoonPrice)
        })
    })

    it('Click appetizers, click plus button for crab rangoon, then click Add More Items to click plus button for fried dumpling', () => {
        cy.RetrieveFriedDumplingData()

        cy.get('.addMoreItems').click()
        cy.wait(1000)
        cy.clickAppetizers()
        cy.wait(1000)
        cy.clickAppetizersPlus('Fried Dumpling (5)')
        cy.clickAppetizersAddToCart('Fried Dumpling (5)')
        cy.wait(1000)

        // Back to cart and check all values
        cy.get('#cart_count').contains('2')

        cy.get('@crabRangoonId').then((crabRangoonId) => {
            cy.get('#quantityForCart1AND' + crabRangoonId).should('have.value', 1)
        })    
        cy.get('@crabRangoonGallery').then((crabRangoonGallery) => {
            cy.get('#orderlist > form > div > div > div:nth-child(1) > img').should('have.attr', 'src','\\images\\' + crabRangoonGallery)
        })
        cy.get('@crabRangoonName').then((crabRangoonName) => {
            cy.get('#orderlist > form > div > div > div.col-md-6 > h5.pt-2').contains(crabRangoonName)
        })
        cy.get('@crabRangoonDescription').then((crabRangoonDescription) => {
            cy.get('#orderlist > form > div > div > div.col-md-6 > h5.pt-2').contains(crabRangoonDescription)
        })
        cy.get('@crabRangoonPrice').then((crabRangoonPrice) => {
            cy.get('#orderlist > form > div > div > div.col-md-6 > h5.pt-1').contains(crabRangoonPrice)
        })
    
        cy.get('@friedDumplingId').then((friedDumplingId) => {
            cy.get('#quantityForCart2AND' + friedDumplingId).should('have.value', 1)
        })
        cy.get('@friedDumplingGallery').then((friedDumplingGallery) => {
            cy.get('#orderlist > form:nth-child(2) > div > div > div:nth-child(1) > img').should('have.attr', 'src','\\images\\' + friedDumplingGallery)
        })
        cy.get('@friedDumplingName').then((friedDumplingName) => {
            cy.get('#orderlist > form > div > div > div.col-md-6 > h5.pt-2').contains(friedDumplingName)
        })
        cy.get('@friedDumplingDescription').then((friedDumplingDescription) => {
            cy.get('#orderlist > form > div > div > div.col-md-6 > h5.pt-2').contains(friedDumplingDescription)
        })
        cy.get('@friedDumplingPrice').then((friedDumplingPrice) => {
            cy.get('#orderlist > form > div > div > div.col-md-6 > h5.pt-1').contains(friedDumplingPrice)
        })
        
        // Tax and Total
        cy.get('@crabRangoonPrice').then((crabRangoonPrice) => {
            cy.get('@friedDumplingPrice').then((friedDumplingPrice) => {
                cy.get('@restaurantsTaxRate').then((restaurantsTaxRate) => {
                    const totalPrice = cy.chinamax.calculateSum(crabRangoonPrice, friedDumplingPrice)
                    cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-end > h5:nth-child(1)').contains(totalPrice)
                    cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-end > h5:nth-child(2)').contains(cy.chinamax.calculateTax(totalPrice, restaurantsTaxRate))
                    cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-end > h4').contains(cy.chinamax.calculateTotalWithTax(totalPrice, restaurantsTaxRate))
                })
            })
        })
    })

    it('Click appetizers, click plus button for crab rangoon, then click Empty Cart button, cancel to empty the cart', () => {
        // Back to cart and check all values
        cy.get('#cart_count').contains('1')
        // Tax and Total
        cy.get('@crabRangoonPrice').then((crabRangoonPrice) => {
            cy.get('@restaurantsTaxRate').then((restaurantsTaxRate) => {
                cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-end > h5:nth-child(1)').contains(crabRangoonPrice)
                cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-end > h5:nth-child(2)').contains(cy.chinamax.calculateTax(crabRangoonPrice, restaurantsTaxRate))
                cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-end > h4').contains(cy.chinamax.calculateTotalWithTax(crabRangoonPrice, restaurantsTaxRate))
            })
        })

        cy.get('@crabRangoonGallery').then((crabRangoonGallery) => {
            cy.get('#orderlist > form > div > div > div:nth-child(1) > img').should('have.attr', 'src','\\images\\' + crabRangoonGallery)
        })
        cy.get('@crabRangoonName').then((crabRangoonName) => {
            cy.get('#orderlist > form > div > div > div.col-md-6 > h5.pt-2').contains(crabRangoonName)
        })
        cy.get('@crabRangoonDescription').then((crabRangoonDescription) => {
            cy.get('#orderlist > form > div > div > div.col-md-6 > h5.pt-2').contains(crabRangoonDescription)
        })
        cy.get('@crabRangoonPrice').then((crabRangoonPrice) => {
            cy.get('#orderlist > form > div > div > div.col-md-6 > h5.pt-1').contains(crabRangoonPrice)
        })

        // Click Empty Cart button, first cancel and then ok
        cy.get('#emptycart').click()
        cy.on('window:alert', (text) => {
            expect(text).to.contains('Are you sure to empty your cart?')
        })
        cy.on('window:confirm', () => false);
        cy.get('#cart_count').contains('1')
    })

    it('Click appetizers, click plus button for crab rangoon, then click Empty Cart button, ok to empty the cart', () => {
        // Back to cart and check all values
        cy.get('#cart_count').contains('1')
        // Tax and Total
        cy.get('@crabRangoonPrice').then((crabRangoonPrice) => {
            cy.get('@restaurantsTaxRate').then((restaurantsTaxRate) => {
                cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-end > h5:nth-child(1)').contains(crabRangoonPrice)
                cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-end > h5:nth-child(2)').contains(cy.chinamax.calculateTax(crabRangoonPrice, restaurantsTaxRate))
                cy.get('#pricedetail > div.row.px-5 > div.col-md-6.text-end > h4').contains(cy.chinamax.calculateTotalWithTax(crabRangoonPrice, restaurantsTaxRate))
            })
        })

        cy.get('@crabRangoonGallery').then((crabRangoonGallery) => {
            cy.get('#orderlist > form > div > div > div:nth-child(1) > img').should('have.attr', 'src','\\images\\' + crabRangoonGallery)
        })
        cy.get('@crabRangoonName').then((crabRangoonName) => {
            cy.get('#orderlist > form > div > div > div.col-md-6 > h5.pt-2').contains(crabRangoonName)
        })
        cy.get('@crabRangoonDescription').then((crabRangoonDescription) => {
            cy.get('#orderlist > form > div > div > div.col-md-6 > h5.pt-2').contains(crabRangoonDescription)
        })
        cy.get('@crabRangoonPrice').then((crabRangoonPrice) => {
            cy.get('#orderlist > form > div > div > div.col-md-6 > h5.pt-1').contains(crabRangoonPrice)
        })

        // Click Empty Cart button, first cancel and then ok
        cy.get('#emptycart').click()
        cy.on('window:alert', (text) => {
            expect(text).to.contains('Are you sure to empty your cart?')
        })
        cy.wait(1000)
        cy.get('#cart_count').contains('0')    
    })

    it('Click appetizers, click plus button for crab rangoon, then type "Not too spicy" for note and forgot to click Update Note button, then click Checkout button', () => {
        cy.get('#ordernote').type('Not too spicy')
        cy.get('#checkout').click()
        
        cy.wait(1000)

        cy.url('http://localhost:8000/checkout')
        cy.get('#ordernote').should('not.contain', 'Not too spicy')
    })

    it('Click appetizers, click plus button for crab rangoon, then type "Not too spicy" for note and click Update Note button, then click Checkout button', () => {
        cy.get('#ordernote').type('Not too spicy')
        cy.get('#updateNote').click()

        cy.wait(1000)

        cy.get('#checkout').click()
        
        cy.wait(1000)

        cy.url('http://localhost:8000/checkout')
        cy.get('#ordernote').contains('Not too spicy')
    })
})