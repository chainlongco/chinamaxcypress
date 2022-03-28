/// <reference types="cypress" />

beforeEach('Visit user register form', () => {
    cy.visit('localhost:8000/register')
})

describe('Register form display', () => {
    it('Check title', () => {
        cy.title().should('be.equal', 'Register')
        cy.get('body > nav > div > a.navbar-brand').should('be.visible').contains('ChinaMax')
    })

    it('Register form content', () => {
        cy.get('.card-header > h3').contains('User Register')
        cy.get('label[for="name"]').contains('User Name')
        cy.get('#name').should('be.enabled')
        cy.get('label[for="email"]').contains('Email Address')
        cy.get('#email').should('be.enabled')
        cy.get('#emailHelp').contains("We'll never share your email with anyone else.")
        cy.get('label[for="password"]').contains('Password')
        cy.get('#password').should('be.enabled')
        cy.get('#register_form > div:nth-child(5) > div:nth-child(1) > a').contains("I already have an account, sign in")
        cy.get('#register_form > div:nth-child(5) > div:nth-child(1) > a').should('have.attr', 'href').and('include', 'http://localhost:8000/login')
        cy.get('#submitRegister').contains('Sign Up')
    })
})

describe('Register with error', () => {
    it('User name, email and password are required', () => {
        cy.get('#submitRegister').click()
        cy.get('.name_error').should('be.visible').contains('The name field is required.')
        cy.get('.email_error').should('be.visible').contains('The email field is required.')
        cy.get('.password_error').should('be.visible').contains('The password field is required.')
    })

    it('User name and email already been taken', () => {
        cy.get('#name').type('Admin')
        cy.get('#email').type('Admin@yahoo.com')
        cy.get('#password').type('1234')
        cy.get('#submitRegister').click()
        cy.get('.name_error').should('be.visible').contains('The name has already been taken.')
        cy.get('.email_error').should('be.visible').contains('The email has already been taken.')
    })
})

describe('Click link to sign in', () => {
    it('Click link from I already have an account, sign in', () =>{
        cy.get('#register_form > div:nth-child(5) > div:nth-child(1) > a').click()
        cy.url().should('eq', 'http://localhost:8000/login')
    })
})

describe('Sign up successfully', () => {
    it('Register successfully', () => {
        // Register new user
        cy.get('#name').type('NewUser')
        cy.get('#email').type('NewUser@yahoo.com')
        cy.get('#password').type('1234')
        cy.get('#submitRegister').click()
        cy.on('window:alert', (text) => {
            expect(text).to.contains('New User has been successfully registered. Please contact Administrator to assign this new user for access control rights like Order History, Customer Information and User Information.')
        })

        // Delete the new user:

        // 1. Log in as administrator
        cy.visit('localhost:8000/login')
        cy.get('#email').type('Admin@yahoo.com')
        cy.get('#password').type('1234')
        cy.get('#submitLogin').click()

        // 2. Go to user list
        cy.get('#navbarUser').click()
        cy.url().should('eq', 'http://localhost:8000/user/list')
        cy.get('#usersDatatable').contains('td', 'NewUser').should('be.visible')

        // 3. Find the row of user name = 'NewUser'
        /*cy.get('#usersDatatable > tbody > tr td:nth-child(1)').each(($element, index, $list) => {   
            const userName = $element.text()
            if (userName.includes('NewUser')) {
                cy.get('#usersDatatable > tbody > tr td:nth-child(1)').eq(index).then((element) => {
                    expect(element.text()).be.eq('NewUser')
                })
            }
        })*/
        cy.contains('td', 'NewUser').should('be.visible')
        
        // 4. delete this row
        cy.contains('td', 'NewUser')  // gives you the cell 
            .parent()                              // gives you the row
            .within(($tr) => {                       // filters just that row
              cy.get('td a.userdelete')                         // finds the buttons cell of that row
              .click()    
            })

        // 5. Should not find this row of user name = 'NewUser'
        cy.contains('td', 'NewUser').should('not.exist')
    })
})