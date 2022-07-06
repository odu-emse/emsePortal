import jwt from 'jsonwebtoken'

const terminalLog = (violations) => {
	cy.task(
		'log',
		`${violations.length} accessibility violation${
			violations.length === 1 ? '' : 's'
		} ${violations.length === 1 ? 'was' : 'were'} detected`
	)
	// pluck specific keys to keep the table readable
	const violationData = violations.map(
		({ id, impact, description, nodes }) => ({
			id,
			impact,
			description,
			nodes: nodes.length,
		})
	)

	cy.task('table', violationData)
}

let token = localStorage.getItem('JWT')

const routes = [
	'dashboard',
	'portal',
	'program',
	'assignments',
	'users/621faf87751282e60aa06d11',
]

jwt.verify(token, 'JWT', (err, decoded) => {
	if (err) {
		console.log(err)
	} else {
		console.warn(decoded)
		routes.push(`user/${decoded.id}`)
	}
})

describe('Component accessibility test', () => {
	routes.forEach((route) => {
		const componentName = route.replace('.html', '')
		const testName = `${componentName} has no detectable accessibility violations on load`

		it(testName, () => {
			cy.visit('/users/login')
			cy.login('dpapp@odu.edu', 'testing@12345')
			cy.log('Logged in')
			cy.wait(5000)
			cy.visit(route)
			cy.wait(5000)
			cy.injectAxe()

			cy.get('body').each((element, index) => {
				cy.checkA11y(
					'body',
					{
						runOnly: {
							type: 'tag',
							values: [
								'wcag2a',
								'wcag2aa',
								'best-practice',
								'section508',
							],
						},
					},
					terminalLog
				)
			})
		})
	})
})
