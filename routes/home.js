const express = require('express')
const home = express.Router()

//Query record based on difficulty grater than filter
home.get('/', (req, res) => {
  res.render('index', {
    title: 'Home', 
    loggedOut: false, 
    admin: false
  })
})

module.exports = home
