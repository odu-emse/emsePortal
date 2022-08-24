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

	it('should allow empty middle name field', () => {
		cy.register({
			email: 'admin@admin.com',
			password: 'testing12345',
			group: 'student',
		})
		cy.get('div.Toastify__toast-body').should('not.exist')
	})

	it('should lead users to login page on hyperlink click', () => {
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

	it('should lead to personal information page if next button is clicked and user is not a student', () => {
		cy.register({
			email: 'admin@admin.com',
			password: 'testing@12345',
			group: 'admin',
		})
		cy.then(() => {
			cy.get('h1').should('contain', 'Personal information')
		})
	})

	it('should match confirmation page information with the credentials entered', () => {
		const credentials = {
			firstName: 'John',
			lastName: 'Doe',
			email: 'admin@admin.com',
			password: 'testing@12345',
			group: 'student',
		}
		cy.register(credentials)
		cy.get('div.my-1 > span.font-bold').each(($el, index) => {
			switch (index) {
				case 0:
					cy.wrap($el).should('contain', credentials.firstName)
					break
				case 1:
					credentials.middleName
						? cy.wrap($el).should('contain', credentials.middleName)
						: cy.wrap($el).should('be.empty')
					break
				case 2:
					cy.wrap($el).should('contain', credentials.lastName)
					break
				case 3:
					cy.wrap($el).should('contain', credentials.email)
					break
				case 4:
					cy.wrap($el).should('contain', credentials.group)
					break
				default:
					break
			}
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
