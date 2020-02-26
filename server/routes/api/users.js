import express from 'express'
const users = express.Router()
import User from '../../models/User'
import bcript from 'bcryptjs'
import passport from 'passport'
import jwt from 'jsonwebtoken'

users.get('/' , (req, res) => {
    res.redirect('/users/login')
})

users.get('/register' , (req, res) => {
    res.render('register', {
        title: 'Register'
    })
})

users.get('/login' , (req, res) => {
    res.render('login', {
        title: 'Login'
    })
})

users.get('/logout', (req, res) => {
    req.logout()
    req.flash('success_msg', 'You are logged out.')
    res.redirect('/users/login')
})

//Handling form submission
users.post('/register', (req, res) => {
    //deconstructing the body getting from the server
    const { firstName, lastName, email, password} = req.body

    //creates empty errors array to store response in
    let errors = []

    //check for completed fields
    if (!firstName || !lastName || !email || !password ) {
        errors.push({msg: 'Please fill in all fields.' })
    }

    //check for password length
    // if (password.length < 6) {
    //     errors.push({msg: 'Password should be at least 6 characters.' })
    // }

    //adding errors to array if present
    if (errors.length > 0) {
        errors.push({msg: 'An error occurred.'})
        res.status(400)
    }
    else{
        User.findOne({ email })
            .then(user => {
                if (user){
                    //error handling for existing user trying to sign up
                    errors.push({ msg: 'This email is already in use. Please sign in, or contact the administrator.'})
                    res.status(400)
                }
                else{
                    const newUser = new User({
                        firstName,
                        lastName,
                        email,
                        password
                    })

                    //password hashing
                    bcript.genSalt(10, (err, salt) =>
                        bcript.hash(newUser.password, salt, (err, hash) =>{
                            if(err)
                                throw err

                            //changed plain text password to hashed and saved in db
                            newUser.password = hash

                            //saving POST data in db
                            newUser.save()
                                .then(user => {
                                    //Gen JWT

                                    jwt.sign(
                                        {
                                            id: user.id
                                        },
                                        process.env.jwtSecret,
                                        {
                                            expiresIn: 3600
                                        },
                                        (err, token) => {
                                            if (err) throw err

                                            res.status(200).json({
                                                token,
                                                user:{
                                                    id: user.id,
                                                    firstName: user.firstName,
                                                    lastName: user.lastName,
                                                    email: user.email
                                                }
                                            })
                                        }
                                    )
                                })
                                .catch(err => console.log(err))
                    }))
                }
            })
    }
})

//Handling login POST req
users.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/modules',
        failureRedirect: '/users/login',
        failureFlash: true
    }, undefined)(req, res, next)
})
export { users }