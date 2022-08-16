// render h1
// check card length
// check img src
// check card title
// check keyword length

describe('Load Program screen', () => {
	beforeEach(() => {
		cy.visit('/users/login')
		cy.login()
		cy.visit('/program')
	})

	it('should display the program card', () => {})

	it('should display the program card title', () => {})

	it('should display the program card image', () => {})

	it('should display the program card keywords', () => {})
})
