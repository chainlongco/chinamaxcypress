/// <reference types="cypress" />

beforeEach('Visit Log in form', () => {
    cy.visit('localhost:8000/login')
})

describe('Default navbar', () => {
    it('Default navbar from log in form', () => {
        cy.get('body > nav > div > a.navbar-brand').should('be.visible').contains('ChinaMax')
        cy.get('#navbarMenu').should('be.visible').contains('Menu')
        cy.get('#navbarCart').should('be.visible').contains('Cart')
        cy.get('#checkoutMenu').should('be.visible').contains('Checkout')
        cy.get('#checkoutMenu > a').should('have.attr', 'href').and('include', 'javascript:void(0);')
        cy.get('.fa-shopping-cart').should('be.visible')
        cy.get('#navbarCart').contains('Cart')
        cy.get('#cartCount').should('be.visible').contains('0')
        cy.get('#customerLogin > a').should('be.visible').contains('Customer')
        cy.get('li#userLogin.dropdown').should('be.visible').contains('User')
    })
})

describe('Log in as administrator', () => {
    it('Check admin on menu', () => {
        cy.get('#email').type('Admin@yahoo.com')
        cy.get('#password').type('1234')
        cy.get('#submitLogin').click()
        cy.url().should('eq', 'http://localhost:8000/menu')
        cy.get('#navbarMenu').should('be.visible').contains('Menu')
        cy.get('#navbarCart').should('be.visible').contains('Cart')
        cy.get('#checkoutMenu').should('be.visible').contains('Checkout')
        cy.get('#checkoutMenu > a').should('have.attr', 'href').and('include', 'javascript:void(0);')
        cy.get('#navbarOrder').should('be.visible')
        cy.get('#navbarDropdownCustomer').should('be.visible')
        cy.get('#navbarUser').should('be.visible')
        cy.get('.fa-shopping-cart').should('be.visible')
        cy.get('#navbarCart').contains('Cart')
        cy.get('#cartCount').should('be.visible').contains('0')
        cy.get('#customerLogin > a').should('be.visible').contains('Customer')
        cy.get('li#userLogin.dropdown').should('be.visible').contains('Admin')
    })
})

describe('Log in as manager', () => {
    it('Check manager on menu', () => {
        cy.get('#email').type('Manager@yahoo.com')
        cy.get('#password').type('1234')
        cy.get('#submitLogin').click()
        cy.url().should('eq', 'http://localhost:8000/menu')
        cy.get('#navbarMenu').should('be.visible').contains('Menu')
        cy.get('#navbarCart').should('be.visible').contains('Cart')
        cy.get('#checkoutMenu').should('be.visible').contains('Checkout')
        cy.get('#checkoutMenu > a').should('have.attr', 'href').and('include', 'javascript:void(0);')
        cy.get('#navbarOrder').should('be.visible')
        cy.get('#navbarDropdownCustomer').should('be.visible')
        //cy.get('#navbarUser').should('be.visible')
        cy.get('.fa-shopping-cart').should('be.visible')
        cy.get('#navbarCart').contains('Cart')
        cy.get('#cartCount').should('be.visible').contains('0')
        cy.get('#customerLogin > a').should('be.visible').contains('Customer')
        cy.get('li#userLogin.dropdown').should('be.visible').contains('Manager')
    })
})

describe('Log in as employee', () => {
    it('Check employee on menu', () => {
        cy.get('#email').type('Employee@yahoo.com')
        cy.get('#password').type('1234')
        cy.get('#submitLogin').click()
        cy.url().should('eq', 'http://localhost:8000/menu')
        cy.get('#navbarMenu').should('be.visible').contains('Menu')
        cy.get('#navbarCart').should('be.visible').contains('Cart')
        cy.get('#checkoutMenu').should('be.visible').contains('Checkout')
        cy.get('#checkoutMenu > a').should('have.attr', 'href').and('include', 'javascript:void(0);')
        cy.get('#navbarOrder').should('be.visible')
        //cy.get('#navbarDropdownCustomer').should('be.visible')
        //cy.get('#navbarUser').should('be.visible')
        cy.get('.fa-shopping-cart').should('be.visible')
        cy.get('#navbarCart').contains('Cart')
        cy.get('#cartCount').should('be.visible').contains('0')
        cy.get('#customerLogin > a').should('be.visible').contains('Customer')
        cy.get('li#userLogin.dropdown').should('be.visible').contains('Employee')
    })
})

describe('Check navbar of Menu', () => {
    it('Click Menu from navbar', () => {
        cy.get('#navbarMenu').click()
        cy.url().should('eq', 'http://localhost:8000/menu')
    })
})

describe('Check navbar of Cart', () => {
    it('Click Cart from navbar', () => {
        cy.get('#navbarCart').click()
        cy.url().should('eq', 'http://localhost:8000/cart')
    })
})

describe('Check navbar of Checkout', () => {
    it('Enable Checkout navbar and click', () => {
        // Choose item to enable Checkout navbar
        cy.visit('http://localhost:8000/menu')
        cy.get('#menuItem1 > p').click()
        cy.get('#quantityPlus1 > i').click()
        cy.get('#addToCart1').click()
        cy.url().should('eq', 'http://localhost:8000/cart')

        // Click the Checkout navbar
        cy.get('#checkoutMenu > a').click()
        cy.url().should('eq', 'http://localhost:8000/checkout')
    })
})

describe('Check navbar of Order', () => {
    it('Make Order navbar visible and click', () => {
        // Make Order navbar visible
        cy.get('#email').type('Admin@yahoo.com')
        cy.get('#password').type('1234')
        cy.get('#submitLogin').click()

        // Click the Order navbar
        cy.get('#navbarOrder').click()
        cy.url().should('eq', 'http://localhost:8000/order')
    })
})

describe('Check navbar of Customer', () => {
    it('Click Customer/My Customers', () => {
        // Make Customer navbar visible
        cy.get('#email').type('Admin@yahoo.com')
        cy.get('#password').type('1234')
        cy.get('#submitLogin').click()

        // Click the Customer navbar
        cy.get('#navbarDropdownCustomer').click()

        // Click My Customers item from dropdown
        cy.get('#navbarSupportedContent > ul:nth-child(5) > li > ul > li:nth-child(1) > a').click()
        cy.url().should('eq', 'http://localhost:8000/customer/list')
    })

    it('Click Customer/Add Customer', () => {
        // Make Customer navbar visible
        cy.get('#email').type('Admin@yahoo.com')
        cy.get('#password').type('1234')
        cy.get('#submitLogin').click()

        // Click the Customer navbar
        cy.get('#navbarDropdownCustomer').click()

        // Click My Customers item from dropdown
        cy.get('#navbarSupportedContent > ul:nth-child(5) > li > ul > li:nth-child(2) > a').click()
        cy.url().should('eq', 'http://localhost:8000/customer/add')
    })
})

describe('Check navbar of User', () => {
    it('Make User navbar visible and click', () => {
        // Make User navbar visible
        cy.get('#email').type('Admin@yahoo.com')
        cy.get('#password').type('1234')
        cy.get('#submitLogin').click()

        // Click the User navbar
        cy.get('#navbarUser').click()
        cy.url().should('eq', 'http://localhost:8000/user/list')
    })
})

describe('Check navbar of Customer login/logout/regisger', () => {
    it('Click Customer/Login', () => {
        // Click Customer/Login navbar
        cy.get('#navbarDropdownCustomerNotLoginned').click()
        cy.get('#customerLogin > ul > li:nth-child(1) > a').click()
        cy.url().should('eq', 'http://localhost:8000/customerLogin')
    })

    it('Click Customer/Register', () => {
        // Click Customer/Register navbar
        cy.get('#navbarDropdownCustomerNotLoginned').click()
        cy.get('#customerLogin > ul > li:nth-child(2) > a').click()
        cy.url().should('eq', 'http://localhost:8000/customerRegister')
    })

    it('Click Customer/Login and then Logout', () => {
        // Click Customer/Login navbar
        cy.get('#navbarDropdownCustomerNotLoginned').click()
        cy.get('#customerLogin > ul > li:nth-child(1) > a').click()
        cy.url().should('eq', 'http://localhost:8000/customerLogin')
        cy.get('#email').type('ShyuJacky@yahoo.com')
        cy.get('#password').type('1234')
        cy.get('#submitLogin').click()
        cy.url().should('eq', 'http://localhost:8000/menu')

        // Click Jacky Shyu/Logout
        cy.get('#navbarDropdownCustomerLoginned').click()
        cy.get('#customerLogin > ul > li > a').click()
        cy.url().should('eq', 'http://localhost:8000/customerLogin')
    })
})

describe('Check navbar of User login/logout/register', () => {
    it('Click User/Login', () => {
        // Click User/Login navbar
        cy.get('#navbarDropdownUserNotLoginned').click()
        cy.get('#userLogin > ul > li:nth-child(1) > a').click()
        cy.url().should('eq', 'http://localhost:8000/login')
    })

    it('Click User/Register', () => {
        // Click User/Register navbar
        cy.get('#navbarDropdownUserNotLoginned').click()
        cy.get('#userLogin > ul > li:nth-child(2) > a').click()
        cy.url().should('eq', 'http://localhost:8000/register')
    })

    it('Click User/Login and then Logout', () => {
        // Click User/Login navbar
        cy.get('#navbarDropdownUserNotLoginned').click()
        cy.get('#userLogin > ul > li:nth-child(1) > a').click()
        cy.url().should('eq', 'http://localhost:8000/login')
        cy.get('#email').type('Admin@yahoo.com')
        cy.get('#password').type('1234')
        cy.get('#submitLogin').click()
        cy.url().should('eq', 'http://localhost:8000/menu')

        // Click Admin/Logout
        cy.get('#navbarDropdownUserLoginned').click()
        cy.get('#userLogin > ul > li > a').click()
        cy.url().should('eq', 'http://localhost:8000/login')
    })
})