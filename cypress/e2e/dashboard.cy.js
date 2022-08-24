describe('Load Dashboard screen', () => {
	beforeEach(() => {
		cy.visit('/users/login')
		cy.login()
	})

	it('should display the dashboard screen and the tiles', () => {
		cy.get('section')
			.children('div')
			.find('h1')
			.each(($el, index, list) => {
				cy.wrap($el)
					.parent()
					.should('be.visible')
					.should(
						'have.class',
						'bg-gray-50 border border-gray-100 rounded-sm shadow-md'
					)
			})
	})
})
