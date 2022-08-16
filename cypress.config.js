const { defineConfig } = require('cypress')

module.exports = defineConfig({
	e2e: {
		baseUrl: 'http://localhost:3000',
		setupNodeEvents(on, config) {
			on('task', {
				log(message) {
					console.log(message)

					return null
				},
				table(message) {
					console.table(message)

					return null
				},
			})
		},
	},

	projectId: '5szk9g',

	component: {
		devServer: {
			framework: 'create-react-app',
			bundler: 'webpack',
		},
	},
})
