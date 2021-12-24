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
		cy.get('input[name=email]').type('dpapp001@odu.edu')
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
		cy.register({ group: 'admin' })
		cy.get('h1').should('contain', 'Personal information')
	})

	it('should let students go backward from confirmation page', () => {
		cy.register({ group: 'student' })
		cy.get('button[type=reset]').click()
		cy.get('h1').should('contain', 'User information')
	})

	//TODO: We expect this to fail since this is an active bug ALMP-205
	it('should display an error if email you are trying to register with not a valid email', () => {
		cy.register({
			email: 'dpapp001',
			password: 'testing12345',
			group: 'student',
		})
		cy.get('div.Toastify__toast-body').should('exist')
	})

	// TODO: Figure out what's going on when we submit rather then click
	// The point of this case is that when we are doing our post request on form submit
	// we are putting all user data into the url and not displaying any error massages.
	// It's like we are only resetting the form and not submitting it.
	// The fact that it lets us proceed even without a proper email address is concerning
	it('should display an error if email you are trying to submit the form with not a valid email', () => {
		cy.get('input[name=firstName]').type('John')
		cy.get('input[name=lastName]').type('Doe')
		cy.get('input[name=email]').type('dpapp001')
		cy.get('input[name=password]').type('testing12345')
		cy.get('input[name=passwordConf]').type('testing12345')
		cy.get('form input[name=group]').first().check()
		cy.get('form').submit()
		cy.get('div.Toastify__toast-body').should('exist')
	})
})

//TODO: Break these cases up into separate test clusters
// describe('Test Register form', () => {
// 	beforeEach(() => {
// 		cy.visit('/users/register')
// 	})
// })
