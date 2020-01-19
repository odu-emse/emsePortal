import express from 'express'
const users = express.Router()
import User from '../models/User'
import bcript from 'bcryptjs'

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


//Handling form submission
users.post('/register', (req, res) => {
    //deconstructing the body getting from the server
    const { firstName, lastName, email, password, password2 } = req.body

    //creates empty errors array to store response in
    let errors = []

    //check for completed fields
    if (!firstName || !lastName || !email || !password || !password2 ) {
        errors.push({msg: 'Please fill in all fields.' })
    }

    //check for password conf
    if (password !== password2) {
        errors.push({msg: 'Please make sure your password and password confirmation matches.' })
    }

    //check for password length
    if (password.length < 6) {
        errors.push({msg: 'Password should be at least 6 characters.' })
    }

    //adding errors to array if present
    if (errors.length > 0) {
        res.render('register', {
            title: 'Register',
            errors,
            firstName,
            lastName,
            email,
            password,
            password2
        })
    }
    else{
        User.findOne({ email: email})
            .then(user => {
                if (user){
                    //error handling for existing user trying to sign up
                    errors.push({ msg: 'This email is already in use. Please sign in, or contact the administrator.'})
                    res.render('register', {
                        title: 'Register',
                        errors,
                        firstName,
                        lastName,
                        email,
                        password,
                        password2
                    })
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
                                    req.flash('success_msg', 'Account created. Now you can log in with your credentials.')
                                    res.redirect('/users/login')
                                })
                                .catch(err => console.log(err))
                    }))
                }
            })
    }
})

users.post('/login', (req, res) => {
    res.send('pass')
})
export { users }