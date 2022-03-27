/// <reference types="cypress" />

beforeEach('Visit Log in form', () => {
    cy.visit('localhost:8000/login')
})

describe('Log in form display', () => {
    it('Check title', () => {
        cy.title().should('be.equal', 'ECommerce')
        cy.get('body > nav > div > a.navbar-brand').should('be.visible').contains('ChinaMax')
    })

    it('Log in form content', () => {
        cy.get('.card-header > h3').contains('User Log in')
        cy.get('label[for="email"]').contains('Email address')
        cy.get('#email').should('be.enabled')
        cy.get('#emailHelp').contains("We'll never share your email with anyone else.")
        cy.get('label[for="password"]').contains('Password')
        cy.get('#password').should('be.enabled')
        cy.get('#noUserAccount').contains("I don't have an account, create new")
        cy.get('#noUserAccount').should('have.attr', 'href').and('include', 'http://localhost:8000/register')
        cy.get('#submitLogin').contains('Sign In')
    })
})

describe('Log in with error', () => {
    it('Email and password are required', () => {
        cy.get('#submitLogin').click()
        cy.get('.email_error').should('be.visible').contains('The email field is required.')
        cy.get('.password_error').should('be.visible').contains('The password field is required.')
    })

    it('Email and password not matched!', () => {
        cy.get('#email').type('Admin@yahoo.com')
        cy.get('#password').type('12345678')
        cy.get('#submitLogin').click()
        cy.get('#loginalert > .alert-danger').should('be.visible').contains('Email and Password not matched!')
    })
})

describe('Click link to register', () => {
    it('Click link from do not have an account, create new', () =>{
        cy.get('#noUserAccount').click()
        cy.url().should('eq', 'http://localhost:8000/register')
    })
})
