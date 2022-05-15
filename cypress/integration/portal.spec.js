describe('Load Program screen', () => {
	beforeEach(() => {
		cy.visit('/portal')
		cy.login('dpapp@odu.edu', 'testing@12345')
	})

	it('should load the page after login', () => {
		cy.wait(3000)
		cy.visit('/portal')
		cy.get('h3').should('contain.text', 'Portal')
	})
})
