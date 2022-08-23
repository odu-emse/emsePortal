import { decode, verify } from 'jsonwebtoken'
import moment from 'moment'

describe('Load Login screen', () => {
	beforeEach(() => {
		cy.visit('/users/login')
	})

	it('should display the register form', () => {
		cy.get('form').should('exist')
	})

	it('all form inputs should have name attribute', () => {
		cy.get('form input').each(($el, index, $list) => {
			cy.wrap($el).should('have.attr', 'name')
			cy.wrap($el).should('have.attr', 'required')
		})
	})

	it('should display the register form fields labels', () => {
		cy.get('form label').should('exist')
	})

	it('should display an error if you try to submit but fields are empty', () => {
		cy.get('button[type=submit]').click()
		cy.get('div.Toastify__toast-body').should('exist')
	})
})

describe('Tests Login form', () => {
	const credentials = {
		correctEmail: 'dpapp@odu.edu',
		correctPassword: 'testing@12345',
		incorrectEmail: 'example@example.com',
		incorrectPassword: 'testing1234',
	}
	beforeEach(() => {
		cy.visit('/users/login')
	})

	it('should redirect user if token in cookie is valid', () => {
		cy.loginViaAPI(credentials.correctEmail, credentials.correctPassword)
		cy.getCookie('JWT')
			.should('exist')
			.then((cookie) => {
				const rawValue = decode(cookie.value)
				expect(moment(rawValue.exp).isAfter(new Date())).to.be.true
				expect(moment(rawValue.iat).isBefore(new Date())).to.be.true
			})
	})

	it('should not display an error with email address in it', () => {
		cy.login(credentials.incorrectEmail, credentials.incorrectPassword)
		cy.get('div.Toastify__toast-body').should(
			'not.contain',
			credentials.incorrectEmail
		)
	})

	it('should display an error if email is incorrect', () => {
		cy.login(credentials.incorrectEmail, credentials.correctPassword)
		cy.get('div.Toastify__toast-body').should('exist')
	})

	it('should display an error if password is incorrect', () => {
		cy.login(credentials.correctEmail, credentials.incorrectPassword)
		cy.get('div.Toastify__toast-body').should('exist')
	})

	it('should not display an error if correct credentials are provided', () => {
		cy.login(credentials.correctEmail, credentials.correctPassword)
		cy.url().should('include', '/dashboard')
	})

	it('sign up link should lead to register page', () => {
		cy.get('span')
			.contains('Sign up')
			.parent()
			.should('have.attr', 'href', '/users/register')
			.click()
		cy.url().should('include', '/users/register')
	})
})
