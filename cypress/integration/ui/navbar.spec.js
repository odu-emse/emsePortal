describe('navbar renders differently if user is logged in', () => {
	it('navbar when logging in', () => {
		cy.visit('/users/login')
		cy.login('dpapp@odu.edu', 'testing@12345')
		cy.wait(2000)
		cy.visit('/dashboard')
		cy.get('aside').should('be.visible')
		cy.get('.menu').children().should('have.class', 'flex-col')
	})

	it('navbar when logging out', () => {
		cy.visit('/users/login')
		cy.login('dpapp@odu.edu', 'testing@12345')
		cy.wait(2000)
		cy.visit('/dashboard')
		cy.get('aside').should('be.visible')
		cy.get('.menu').children().should('have.class', 'flex-col')
		cy.clearLocalStorage()
		cy.visit('/users/login')
		cy.get('aside').should('be.visible')
		cy.get('.menu').children().should('have.class', 'text-gray-300')
	})
})
