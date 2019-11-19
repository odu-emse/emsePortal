const express = require('express')
const modules = express.Router()
const Module = require('../models/Module')

//Query record based on difficulty grater than filter
modules.get('/', (req, res) => {
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
modules.get('/:id', (req, res) => {
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

module.exports = modules
