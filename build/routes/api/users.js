'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.users = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _User = require('../../models/User');

var _User2 = _interopRequireDefault(_User);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var users = _express2.default.Router();


users.get('/', function (req, res) {
    res.redirect('/users/login');
});

users.get('/register', function (req, res) {
    res.render('register', {
        title: 'Register'
    });
});

users.get('/login', function (req, res) {
    res.render('login', {
        title: 'Login'
    });
});

//Logout
users.get('/logout', function (req, res) {
    req.logout();
    req.flash('success_msg', 'You are logged out.');
    res.redirect('/users/login');
});

//Handling form submission
users.post('/register', function (req, res) {
    //deconstructing the body getting from the server
    var _req$body = req.body,
        firstName = _req$body.firstName,
        lastName = _req$body.lastName,
        email = _req$body.email,
        password = _req$body.password,
        password2 = _req$body.password2;

    //creates empty errors array to store response in

    var errors = [];

    //check for completed fields
    if (!firstName || !lastName || !email || !password || !password2) {
        errors.push({ msg: 'Please fill in all fields.' });
    }

    //check for password conf
    if (password !== password2) {
        errors.push({ msg: 'Please make sure your password and password confirmation matches.' });
    }

    //check for password length
    if (password.length < 6) {
        errors.push({ msg: 'Password should be at least 6 characters.' });
    }

    //adding errors to array if present
    if (errors.length > 0) {
        res.render('register', {
            title: 'Register',
            errors: errors,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            password2: password2
        });
    } else {
        _User2.default.findOne({ email: email }).then(function (user) {
            if (user) {
                //error handling for existing user trying to sign up
                errors.push({ msg: 'This email is already in use. Please sign in, or contact the administrator.' });
                res.render('register', {
                    title: 'Register',
                    errors: errors,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password,
                    password2: password2
                });
            } else {
                var newUser = new _User2.default({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password
                });

                //password hashing
                _bcryptjs2.default.genSalt(10, function (err, salt) {
                    return _bcryptjs2.default.hash(newUser.password, salt, function (err, hash) {
                        if (err) throw err;

                        //changed plain text password to hashed and saved in db
                        newUser.password = hash;

                        //saving POST data in db
                        newUser.save().then(function (user) {
                            req.flash('success_msg', 'Account created. Now you can log in with your credentials.');
                            res.redirect('/users/login');
                        }).catch(function (err) {
                            return console.log(err);
                        });
                    });
                });
            }
        });
    }
});

//Handling login POST req
users.post('/login', function (req, res, next) {
    _passport2.default.authenticate('local', {
        successRedirect: '/modules',
        failureRedirect: '/users/login',
        failureFlash: true
    }, undefined)(req, res, next);
});
exports.users = users;
//# sourceMappingURL=users.js.map