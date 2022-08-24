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

const routes = [
	'dashboard',
	'portal',
	'program',
	'program/61560592009b2b64008696c5',
	'assignments',
	'users/621faf87751282e60aa06d11',
]

describe('Accessibility testing pages', () => {
	routes.forEach((route) => {
		const testName = `${route} has no detectable accessibility violations`

		it(testName, () => {
			cy.loginViaAPI()
			cy.visit(route)
			cy.wait(1500)
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
