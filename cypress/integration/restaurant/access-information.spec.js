/// <reference types="cypress" />

describe('Access rights for restaurant information', () => {
    it('Visit url and get restricted page', () => {
        cy.visit('http://localhost:8000/restaurant')
        cy.url('http://localhost:8000/restaurant')
    })
        
    it('Log in as an employee and get restricted page', () => {
        cy.LoginAsEmployee()
        cy.visit('http://localhost:8000/restaurant')
        cy.url('http://localhost:8000/restaurant')
    })

    it('Log in as a manager and access restaurant page successfully', () => {
        cy.LoginAsManager()
        cy.visit('http://localhost:8000/restaurant')
        cy.url('http://localhost:8000/restaurant')
        cy.title('Restaurant Information')
    })

    it('Log in as an Admin and access restaurant page successfully', () => {
        cy.LoginAsAdmin()
        cy.visit('http://localhost:8000/restaurant')
        cy.url('http://localhost:8000/restaurant')
        cy.title('Restaurant Information')
    })
})

describe('Access restaurant information', () => {
    it('Log in as an Admin and access restaurant page: name, year founded, taxrate, phone, email, address1, address2, city, state, zip', () => {
        cy.LoginAsAdmin()
        cy.visit('http://localhost:8000/restaurant')
        
        // labels, fields and buttons
        cy.get('#restaurant_form > div:nth-child(3) > div:nth-child(1) > label').contains('Name')
        cy.get('#restaurant_form > div:nth-child(3) > div:nth-child(2) > label').contains('Year Founded')
        cy.get('#restaurant_form > div:nth-child(3) > div:nth-child(3) > label').contains('Tax Rate')
        cy.get('#restaurant_form > div:nth-child(4) > div:nth-child(1) > label').contains('Phone')
        cy.get('#restaurant_form > div:nth-child(4) > div:nth-child(2) > label').contains('Email Address')
        cy.get('#emailHelp').contains("We'll never share your email with anyone else.")
        cy.get('#restaurant_form > div:nth-child(5) > div:nth-child(1) > label').contains('Address 1')
        cy.get('#restaurant_form > div:nth-child(5) > div:nth-child(2) > label').contains('Address 2')
        cy.get('#restaurant_form > div:nth-child(6) > div:nth-child(1) > label').contains('City')
        cy.get('#restaurant_form > div:nth-child(6) > div:nth-child(2) > label').contains('State')
        cy.get('#restaurant_form > div:nth-child(6) > div:nth-child(3) > label').contains('Zip Code')

        cy.get('#name').should('be.visible')
        cy.get('#yearfounded').should('be.visible')
        cy.get('#taxrate').should('be.visible')
        cy.get('#phone').should('be.visible')
        cy.get('#email').should('be.visible')
        cy.get('#address1').should('be.visible')
        cy.get('#address2').should('be.visible')
        cy.get('#city').should('be.visible')
        cy.get('#state').should('be.visible')
        cy.get('#zip').should('be.visible')

        cy.get('#submitRestaurant').should('be.visible')
        cy.get('#cancelRestaurant').should('be.visible')
    })
})

describe('Validate required fields', () => {
    it('Click Submit button and validate required fields', () => {
        cy.LoginAsAdmin()
        cy.visit('http://localhost:8000/restaurant')
        cy.get('#name').clear()
        cy.get('#taxrate').clear()
        cy.get('#submitRestaurant').click()
        cy.get('.name_error').contains('The name field is required.')
        cy.get('.taxrate_error').contains('The taxrate field is required.')
    })
})

describe('Validate required fields', () => {
    it('Click Submit button and validate required fields', () => {
        cy.LoginAsAdmin()
        cy.visit('http://localhost:8000/restaurant')
        cy.get('#name').clear()
        cy.get('#taxrate').clear()
        cy.get('#submitRestaurant').click()
        cy.get('.name_error').contains('The name field is required.')
        cy.get('.taxrate_error').contains('The taxrate field is required.')
    })
})

describe('Insert new restaurant information', () => {
    it('Check record, delete record and insert record', () => {
        // Check exist record
        var sql = 'select count(*) as total from restaurants'
        cy.task('queryDb', sql)
            .then((result) => {
                expect(result[0].total).to.eq(1)
                if (result[0].total > 0) {
                    // Delete exist record
                    sql = 'delete from restaurants'
                    cy.task('queryDb', sql)
                        .then((result) => {
                            expect(result.affectedRows).to.eq(1)
                            console.log(result)
                        })
                }
            })

        // Insert new restaurant information
        cy.LoginAsAdmin()
        cy.visit('http://localhost:8000/restaurant')
        cy.get('#name').type('Chilis')
        cy.get('#taxrate').type('0.0725')
        cy.get('#submitRestaurant').click()
        cy.on('window:alert', (text) => {
            expect(text).to.contains('Restaurant Information has been successfully created.')
        })
    })
})

describe('Update existing restaurant information', () => {
    it('Update existing record', () => {
        cy.LoginAsAdmin()
        cy.visit('http://localhost:8000/restaurant')
        cy.get('#name').clear()
        cy.get('#name').type('Chinamax')
        cy.get('#taxrate').clear()
        cy.get('#taxrate').type('0.0825')
        cy.get('#submitRestaurant').click()
        cy.on('window:alert', (text) => {
            expect(text).to.contains('Restaurant has been successfully updated.')
        })
    })
})

describe('Update existing restaurant using same data', () => {
    it('Update existing record', () => {
        cy.LoginAsAdmin()
        cy.visit('http://localhost:8000/restaurant')
        cy.get('#name').clear()
        cy.get('#name').type('Chinamax')
        cy.get('#taxrate').clear()
        cy.get('#taxrate').type('0.0825')
        cy.get('#submitRestaurant').click()
        cy.get('#submitRestaurant').click() // update twice to make it failed
        cy.on('window:alert', (text) => {
            expect(text).to.contains('Update failed.')
        })
    })
})

describe('Canceled and go to menu', () => {
    it('Click cancel button and go to menu', () => {
        cy.LoginAsAdmin()
        cy.visit('http://localhost:8000/restaurant')
        cy.get('#cancelRestaurant').click()
        cy.url('http://localhost:8000/menu')
    })
})