/// <reference types="cypress" />

describe('Load Register screen', () => {
	beforeEach(() => {
		cy.visit('/users/register')
	})

	it('should display the register form', () => {
		cy.get('form').should('exist')
	})

	it('all form inputs should have name attribute', () => {
		cy.get('form input').each(($el, index, $list) => {
			cy.wrap($el).should('have.attr', 'name')
		})
	})

	it('should display the register form fields labels', () => {
		cy.get('form label').should('exist')
	})
})

describe('Registration form interaction', () => {
	beforeEach(() => {
		cy.visit('/users/register')
	})
	it('should display an error if you try to submit but fields are empty', () => {
		cy.get('button[type=submit]').click()
		cy.get('input:invalid').should('have.length.gt', 1)
	})

	it('should not display an error if email you are trying to register with is not taken', () => {
		cy.get('input[name=middleName]').type('Smith')
		cy.register({
			email: 'admin@admin.com',
			password: 'testing12345',
			group: 'student',
		})
			.get('div.Toastify__toast-body')
			.should('not.exist')
	})

	it('should display an error if email you are trying to register with is taken', () => {
		cy.register({
			email: 'dpapp@odu.edu',
			password: 'testing@12345',
			group: 'student',
		})
		cy.get('div.Toastify__toast-body').should('exist')
	})

	it('should not display an error if middle name is not entered', () => {
		cy.register({
			email: 'admin@admin.com',
			password: 'testing12345',
			group: 'student',
		})
		cy.get('div.Toastify__toast-body').should('not.exist')
	})

	it('login link should lead to login page', () => {
		cy.get('span')
			.contains('Log in')
			.parent()
			.should('have.attr', 'href', '/users/login')
			.click()
		cy.url().should('include', '/users/login')
	})

	it('should disable back button on first page', () => {
		cy.get('button[type=reset]').should('have.attr', 'disabled')
	})

	it('should lead to next form if not student', () => {
		cy.register({
			email: 'admin@admin.com',
			password: 'testing@12345',
			group: 'admin',
		})
		cy.then(() => {
			cy.get('h1').should('contain', 'Personal information')
		})
	})

	it('should let students go backward from confirmation page', () => {
		cy.register({
			email: 'admin@admin.com',
			password: 'testing@12345',
			group: 'student',
		}).then(() => {
			cy.get('h1')
				.should('contain', 'Confirm account details')
				.then(() => {
					cy.get('button[type=reset]')
						.contains('Back')
						.should('not.have.attr', 'disabled')
					cy.get('button[type=reset]')
						.click()
						.then(() => {
							cy.get('h1').should('contain', 'User information')
						})
				})
		})
	})

	it('should display an error if email you are trying to register with not a valid email', () => {
		cy.register({
			email: 'dpapp001',
			password: 'testing12345',
			group: 'student',
		})
		cy.get('input:invalid').should('have.length', 1)
	})
})
