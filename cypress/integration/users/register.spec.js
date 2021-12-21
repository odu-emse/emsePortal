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

	it('should display an error if you try to submit but fields are empty', () => {
		cy.get('button[type=submit]').click()
		cy.get('div.Toastify__toast-body').should('exist')
	})

	it('should not display an error if email you are trying to register with is not taken', () => {
		cy.get('input[name=firstName]').type('John')
		cy.get('input[name=lastName]').type('Doe')
		cy.get('input[name=middleName]').type('Smith')
		cy.get('input[name=email]')
			.type('admin@odu.edu')
			.get('div.Toastify__toast-body')
			.should('not.exist')
	})

	it('should display an error if email you are trying to register with is taken', () => {
		cy.get('input[name=email]').type('dpapp001@odu.edu')
		cy.get('div.Toastify__toast-body').should('exist')
	})

	it('should not display an error if middle name is not entered', () => {
		cy.get('input[name=firstName]').type('John')
		cy.get('input[name=lastName]').type('Doe')
		cy.get('input[name=email]').type('admin@odu.edu')
		cy.get('input[name=password]').type('password')
		cy.get('input[name=passwordConf]').type('password')
		cy.get('input[name=group]').first().check()
		cy.get('button[type=submit]').click()
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
		cy.get('input[name=firstName]').type('John')
		cy.get('input[name=lastName]').type('Doe')
		cy.get('input[name=email]').type('admin@odu.edu')
		cy.get('input[name=password]').type('password')
		cy.get('input[name=passwordConf]').type('password')
		cy.get('form input[name=group]').last().check()
		cy.get('button[type=submit]').click()
		cy.get('h1').should('contain', 'Personal information')
	})
})
