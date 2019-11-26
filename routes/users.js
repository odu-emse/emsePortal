const express = require('express')
const users = express.Router()
const User = require('../models/User');

users.get('/', (req, res) => {
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
module.exports = users