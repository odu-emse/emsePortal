import express from 'express'
const signup = express.Router()

//Query record based on difficulty grater than filter
signup.get('/', (req, res) => {
  res.render('signup', {
    title: 'Sign up', 
    loggedOut: true, 
    admin: false,
    firstName: req.body.firstName,
    lastName : req.body.lastName,
    middleName: req.body.middleName,
    dob: req.body.dob,
    degree: req.body.degree,
    adviser: req.body.adviser,
    email: req.body.email,
    classesTaken : req.body.classesTaken,
    classesNeeded: req.body.classesNeeded
  })
})

export { signup }
