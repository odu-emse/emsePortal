describe('Load Dashboard screen', () => {
	beforeEach(() => {
		cy.visit('/dashboard')
		cy.login('example@exmaple.co', 'testing12345')
	})

	it('should display the dashboard screen and the tiles', () => {
		cy.get('section')
			.children('div')
			.find('h1')
			.each(($el, index, list) => {
				cy.wrap($el).siblings().should('be.visible')
			})
	})
})
