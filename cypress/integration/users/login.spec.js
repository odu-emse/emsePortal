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
	// we expect this case to fail since we haven't fixed ALMP-199
	// TODO: Fix ALMP-199 and re-test this case
	it('should not display an error with email address in it', () => {
		cy.login(credentials.incorrectEmail, credentials.incorrectPassword)
		cy.get('div.Toastify__toast-body').should(
			'not.contain',
			credentials.incorrectEmail
		)
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
