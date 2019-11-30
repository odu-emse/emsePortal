const express = require('express')
const home = express.Router()

//Query record based on difficulty grater than filter
home.get('/', (req, res) => {
  res.render('index', {
    activeHome: true,
    title: 'Home', 
    loggedOut: false, 
    admin: false
  })
})

module.exports = home
