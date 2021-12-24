// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('login', (email, password) => {
	cy.get('input[name=email]').type(email)
	cy.get('input[name=password]').type(password)
	cy.get('button[type=submit]').click()
})

Cypress.Commands.add(
	'register',
	({ email = 'admin@odu.edu', password = 'password', group = 'student' }) => {
		cy.get('input[name=firstName]').type('John')
		cy.get('input[name=lastName]').type('Doe')
		cy.get('input[name=email]').type(email)
		cy.get('input[name=password]').type(password)
		cy.get('input[name=passwordConf]').type(password)
		if (group === 'student') {
			cy.get('form input[name=group]').first().check()
		}
		if (group === 'admin') {
			cy.get('form input[name=group]').last().check()
		}
		cy.get('button[type=submit]').click()
	}
)

// TODO: Add program card getter command
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
