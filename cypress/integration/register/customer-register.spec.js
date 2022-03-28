/// <reference types="cypress" />

beforeEach('Visit customer register form', () => {
    cy.visit('localhost:8000/customerRegister')
})

describe('Register form display', () => {
    it('Check title', () => {
        cy.title().should('be.equal', 'Customer Sign up')
        cy.get('body > nav > div > a.navbar-brand').should('be.visible').contains('ChinaMax')
    })

    it('Register form content', () => {
        cy.get('.card-header > h3').contains('Customer Register')
        cy.get('label[for="firstname"]').contains('First Name')
        cy.get('#firstname').should('be.enabled')
        cy.get('label[for="lastname"]').contains('Last Name')
        cy.get('#firstname').should('be.enabled')
        cy.get('label[for="phone"]').contains('Phone')
        cy.get('#phone').should('be.enabled')
        cy.get('label[for="email"]').contains('Email Address')
        cy.get('#email').should('be.enabled')
        cy.get('#emailHelp').contains("We'll never share your email with anyone else.")
        cy.get('label[for="password"]').contains('Password')
        cy.get('#password').should('be.enabled')
        cy.get('#submitCustomerSignup').contains('Sign Up')
    })
})

describe('Register with error', () => {
    it('Last name, first name, phone, email and password are required', () => {
        cy.get('#submitCustomerSignup').click()
        cy.get('.firstname_error').should('be.visible').contains('The firstname field is required.')
        cy.get('.lastname_error').should('be.visible').contains('The lastname field is required.')
        cy.get('.phone_error').should('be.visible').contains('The phone field is required.')
        cy.get('.email_error').should('be.visible').contains('The email field is required.')
        cy.get('.password_error').should('be.visible').contains('The password field is required.')
    })

    it('Email already been taken', () => {
        cy.get('#firstname').type('Jacky')
        cy.get('#lastname').type('Shyu')
        cy.get('#phone').type('214-680-8281')
        cy.get('#email').type('shyujacky@yahoo.com')
        cy.get('#password').type('1234')
        cy.get('#submitCustomerSignup').click()
        cy.get('.email_error').should('be.visible').contains('The email has already been taken.')
    })
})

describe('Sign up successfully', () => {
    it.only('Register successfully', () => {
        // Register new user
        cy.get('#firstname').type('New')
        cy.get('#lastname').type('Customer')
        cy.get('#phone').type('214-680-8281')
        cy.get('#email').type('NewCustomer@yahoo.com')
        cy.get('#password').type('1234')
        cy.get('#submitCustomerSignup').click()
        cy.url().should('eq', 'http://localhost:8000/customerLogin')

        // Delete the new user:

        // 1. Log in as administrator
        cy.visit('localhost:8000/login')
        cy.get('#email').type('Admin@yahoo.com')
        cy.get('#password').type('1234')
        cy.get('#submitLogin').click()

        // 2. Go to user list
        cy.get('#navbarDropdownCustomer').click()
        cy.get('#navbarSupportedContent > ul:nth-child(5) > li > ul > li:nth-child(1) > a').click()
        cy.url().should('eq', 'http://localhost:8000/customer/list')
        cy.get('#customersDatatable').contains('td', 'NewCustomer@yahoo.com').should('be.visible')

        // 3. Find the row of user name = 'NewUser'
        cy.contains('td', 'NewCustomer@yahoo.com').should('be.visible')
        
        // 4. delete this row
        cy.contains('td', 'NewCustomer@yahoo.com')    // gives you the cell 
            .parent()                   // gives you the row
            .within(($tr) => {          // filters just that row
              cy.get('td a.btn-danger') // finds the buttons cell of that row
              .click()    
            })

        // 5. Should not find this row of user name = 'NewUser'
        cy.contains('td', 'NewCustomer@yahoo.com').should('not.exist')
    })
})