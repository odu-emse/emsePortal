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
/*
module.exports = {
    create: (req, res) => {
        let user = new User({
            forename: req.body.forename,
            surname: req.body.surname,
            email: req.body.email,
            password: req.body.password,
            age: req.body.age,
            team: req.body.team
        });

        user.save()
            .then(result => {
                res.json({ success: true, result: result });
            })
            .catch(err => {
                res.json({ success: false, result: err });
            });
    },
    update: (req, res) => {
        User.update({_id: req.body._id}, req.body)
            .then(user => {
                if (!user) res.json({ success: false, result: "User does not exist" });

                res.json(user);
            })
            .catch(err => {
                res.json({ success: false, result: err });
            });
    },
    retrieve: (req, res) => {
        User.find()
            .then(result => {
                if (!result) res.json({ success: false, result: "No results found" });

                res.json({ success: true, result: result });
            })
            .catch(err => res.json({success: false, result: err}));
    },
    delete: (req, res) => {
        User.remove({_id: req.body._id})
            .then(result => {
                if (!result) res.json({ success: false, result: "No user was found with the ID" });
                res.json({ success: true, result: result });
            })
            .catch(err => res.json({ success: false, result: err }));
    }
}

 */