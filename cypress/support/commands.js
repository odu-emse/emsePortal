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
// Cypress.Commands.add('login')

// Cypress.Commands.add('register')

Cypress.Commands.addAll({
	loginViaAPI(email = 'dpapp@odu.edu', password = 'testing@12345') {
		const payload = {
			// language=GraphQL
			query: `
			{
				login(input: {
					email: "${email}"
					password: "${password}"
				}){
					token
				}
			}
			`,
		}
		cy.request({
			method: 'POST',
			url: 'http://localhost:4000/graphql',
			body: payload,
		}).should((res) => {
			expect(res.status).to.eq(200)
			expect(res.body.data.login.token).to.be.a('string')
			cy.setCookie('JWT', res.body.data.login.token)
		})
	},
	login: (email = 'dpapp@odu.edu', password = 'testing@12345') => {
		cy.get('input[name=email]').type(email)
		cy.get('input[name=password]').type(password)
		cy.get('button[type=submit]').click()
	},
	register: ({
		email = 'dpapp@odu.edu',
		password = 'testing@12345',
		group = 'student',
		firstName = 'John',
		middleName = null,
		lastName = 'Doe',
	}) => {
		cy.get('input[name=firstName]').type(firstName)
		cy.get('input[name=lastName]').type(lastName)
		middleName ? cy.get('input[name=middleName]').type(middleName) : null
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
	},
})

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
