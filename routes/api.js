// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()

const User = require('../models/User')
const Module = require('../models/Module')

router.get('/users', (req, res) => {
	User.find()
	.then(profiles => {
		res.json({
			confirmation: 'success',
			data: profiles,
		})
	})
	.catch( err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
})

router.get('/modules', (req, res) => {
	Module.find()
	.then(modules => {
		res.json({
			confirmation: 'success',
			data: modules,
		})
	})
	.catch( err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
})


module.exports = router
