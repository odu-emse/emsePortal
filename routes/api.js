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

//Query record based on difficulty grater than filter
router.get('/modules', (req, res) => {
	let filters = req.query

	if(req.query.difficulty != null){
		filters = {
			difficulty: {
				$gt: req.query.difficulty
			}
		}
	}

	Module.find(filters)
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

//Query record by ID
router.get('/modules/:id', (req, res) => {
	const id = req.params.id

	Module.findById(id)
	.then(modules => {
		res.json({
			confirmation: 'success',
			data: modules
		})
	})
	.catch( err => {
		res.json({
			confirmation: 'fail',
			message: `Module ${id} not found. Please check your search term.`  
		})
	})
})

//Add user profile
router.post('/profile'), (req, res) => {
	//TODO: Complete the form in handlebars and get post from it to insert into document
	res.json({
		confirmation: 'success',
		data: req.body
	})
}

module.exports = router
